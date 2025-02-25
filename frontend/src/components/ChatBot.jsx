import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { marked } from 'marked';
import { useNavigate } from 'react-router-dom';

function ChatBot() {
  const navigate = useNavigate();
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
    'How can I get in touch with Jean?',
  ]);

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

    renderer.link = (href, _title, text) => {
      return `<span class="chat-link" data-href="${href}">${text}</span>`;
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
      return text.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<span class="chat-link" data-href="$2">$1</span>'
      );
    } catch (error) {
      console.error('Parsing error:', error);
      return text;
    }
  };

  const handleLinkClick = (e) => {
    const target = e.target;
    if (target.classList.contains('chat-link')) {
      e.preventDefault();
      const href = target.getAttribute('data-href');
      if (href && typeof href === 'string') {
        setIsOpen(false);
        navigate(href);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const generateResponse = async (query) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/chat`,
        {
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
          }),
        }
      );

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
        text: "I'm sorry, I encountered an error. Please try again.",
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
    <div className={`chatbot ${isOpen ? 'open' : ''}`}>
      {isOpen && (
        <div className='chatbot-container shadow'>
          <span
            className='close-button btn-close'
            onClick={() => setIsOpen(false)}
            aria-label='Close chat'
          />
          <div className='chatbot-header bg-dark'>
            <i className='bi bi-stars text-primary'></i>
            <h3 className='h6 mb-0'>Portfolio AI Assistant</h3>
          </div>
          <div className='messages'>
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                {msg.type === 'user' ? (
                  <div className='user-message'>
                    <span>{msg.text}</span>
                  </div>
                ) : (
                  <div className='bot-message'>
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
                )}
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
              className='form-control bg-dark text-light'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                isLoading ? 'Please wait...' : 'Ask a question...'
              }
              disabled={isLoading}
            />
            <button
              type='submit'
              className='btn btn-primary w-90'
              disabled={isLoading}
            >
              {isLoading ? 'Thinking...' : 'Send'}
            </button>
          </form>
        </div>
      )}
      {!isOpen && (
        <button
          className='chatbot-toggle btn btn-primary'
          onClick={() => setIsOpen(true)}
        >
          Ask me anything!
        </button>
      )}
    </div>
  );
}

export default ChatBot;
