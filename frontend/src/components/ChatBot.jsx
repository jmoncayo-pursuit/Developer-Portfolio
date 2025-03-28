import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { marked } from 'marked';
import './ChatBot.css';

function ChatBot() {
  const { currentPage, currentContent } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [suggestions] = useState([
    "What are Jean's main skills?",
    "Tell me about Jean's projects",
    "What's Jean's work experience?",
    'How can I contact Jean?',
  ]);
  const [modelVersion, setModelVersion] = useState(
    'gemini-2.0-flash'
  ); // Updating from 1.5 to 2.0

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Configure marked once when component mounts
    marked.setOptions({
      breaks: true,
      gfm: true,
    });

    const renderer = new marked.Renderer();

    // Updated link renderer to handle both internal and external links
    renderer.link = (href, title, text) => {
      if (href.startsWith('#')) {
        // Internal link
        return `<span class="chat-link internal-link" data-section="${href.substring(
          1
        )}">${text}</span>`;
      } else if (href.startsWith('mailto:')) {
        // Email link
        return `<a href="${href}" class="chat-link">${text}</a>`;
      } else {
        // External link
        return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="chat-link">${text}</a>`;
      }
    };

    marked.use({ renderer });
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          type: 'bot',
          text: "👋 Hi! I'm an AI assistant who can tell you all about Jean's portfolio. Here are some things you can ask about:",
          showSuggestions: true,
        },
      ]);
    }
  }, [isOpen]);

  const parseMarkdown = (text) => {
    if (!text) return '';
    try {
      // No need for markdown parsing anymore, just return the HTML as is
      return text;
    } catch (error) {
      console.error('Parsing error:', error);
      return text;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const generateResponse = async (query) => {
    try {
      console.log('API URL:', import.meta.env.VITE_API_URL); // Add this for debugging

      // Fix API path based on environment
      let apiPath = '';

      // For local development, use /api/chat
      if (import.meta.env.VITE_API_URL.includes('localhost')) {
        apiPath = `${import.meta.env.VITE_API_URL}/api/chat`;
      }
      // For production, use /chat directly
      else {
        apiPath = `${import.meta.env.VITE_API_URL}/chat`;
      }

      console.log('Making request to:', apiPath); // Debug log

      const response = await fetch(apiPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: query,
          history: messages.map((msg) => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.text,
          })),
          model: modelVersion,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      return {
        text: data.response,
        showSuggestions: false,
      };
    } catch (error) {
      console.error('Error:', error);
      return {
        text: `I'm sorry, I encountered an error: ${error.message}. Please try again later.`,
        showSuggestions: true,
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await generateResponse(input);
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          ...response,
        },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: "I'm sorry, I encountered an error. Please try again.",
          showSuggestions: true,
        },
      ]);
    }

    setInput('');
    setIsLoading(false);
  };

  return (
    <div
      className={`position-fixed bottom-0 start-0 mb-4 ms-4 ${
        isOpen ? 'open' : ''
      }`}
      style={{ zIndex: 1050 }} // Higher z-index to be above footer
    >
      {isOpen && (
        <div className='bg-dark rounded border border-secondary shadow p-3 position-relative'>
          <button
            className='btn-close position-absolute top-0 end-0 m-3 text-white opacity-75'
            onClick={() => setIsOpen(false)}
            aria-label='Close chat'
            style={{ filter: 'brightness(2)' }}
          />
          <div className='d-flex align-items-center gap-2 border-bottom border-secondary pb-2 mb-3'>
            <i
              className='bi bi-stars fs-5'
              style={{ color: '#646cff' }}
            ></i>
            <h3 className='h6 mb-0'>Portfolio AI Assistant</h3>
          </div>

          <div
            className='overflow-auto mb-3'
            style={{ maxHeight: 'calc(66vh - 180px)' }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`d-flex ${
                  msg.type === 'user'
                    ? 'justify-content-end'
                    : 'justify-content-start'
                }`}
              >
                <div
                  className={`p-3 rounded-4 my-2 ${
                    msg.type === 'user'
                      ? 'bg-opacity-25 bg-light ms-auto'
                      : 'bg-dark border border-secondary'
                  }`}
                  style={{ maxWidth: '85%' }}
                >
                  <div
                    className='message-content'
                    dangerouslySetInnerHTML={{
                      __html: parseMarkdown(msg.text),
                    }}
                  />
                  {msg.showSuggestions && (
                    <div className='suggestion-chips'>
                      {suggestions.map((suggestion, i) => (
                        <button
                          key={i}
                          className='suggestion-chip'
                          onClick={() =>
                            handleSuggestionClick(suggestion)
                          }
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className='loading-dots'>
                <div className='dot'></div>
                <div className='dot'></div>
                <div className='dot'></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className='mt-auto'>
            <input
              type='text'
              className='form-control bg-dark text-light mb-2'
              style={{ display: 'block', width: '100%' }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                isLoading ? 'Please wait...' : 'Ask a question...'
              }
              disabled={isLoading}
            />
            <div className='d-flex justify-content-center'>
              <button
                type='submit'
                className='btn rounded-pill w-75'
                style={{ backgroundColor: '#646cff', color: 'white' }}
                disabled={isLoading}
              >
                {isLoading ? 'Thinking...' : 'Send'}
              </button>
            </div>
          </form>
        </div>
      )}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className='btn btn-primary rounded-pill shadow-sm px-4 py-2 ms-4 theme-btn'
        >
          Ask me anything!
        </button>
      )}
    </div>
  );
}

export default ChatBot;
