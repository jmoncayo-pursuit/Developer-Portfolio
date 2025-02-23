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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/generate-response`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userQuery: input,
            currentPage,
            pageContent: currentContent,
          }),
        }
      );

      const data = await response.json();
      setMessages([
        ...messages,
        { type: 'user', text: input },
        { type: 'bot', text: data.response },
      ]);
      setInput('');
    } catch (error) {
      console.error('Error:', error);
      setMessages([
        ...messages,
        { type: 'user', text: input },
        {
          type: 'bot',
          text: "I'm sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`chatbot ${isOpen ? 'open' : ''}`}>
      {isOpen && (
        <div className='chatbot-container'>
          <span
            className='close-button'
            onClick={() => setIsOpen(false)}
            aria-label='Close chat'
            role='button'
            tabIndex={0}
          >
            ×
          </span>
          <div className='messages'>
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                {msg.type === 'user' ? (
                  <span className='user-message'>
                    You: {msg.text}
                  </span>
                ) : (
                  <div
                    className='bot-message'
                    onClick={handleLinkClick}
                    dangerouslySetInnerHTML={{
                      __html: `AI: ${parseMarkdown(msg.text)}`,
                    }}
                  />
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
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                isLoading ? 'Please wait...' : 'Ask a question...'
              }
              disabled={isLoading}
            />
            <button type='submit' disabled={isLoading}>
              {isLoading ? 'Thinking...' : 'Send'}
            </button>
          </form>
        </div>
      )}
      {!isOpen && (
        <button
          className='chatbot-toggle'
          onClick={() => setIsOpen(true)}
        >
          Ask me anything!
        </button>
      )}
    </div>
  );
}

export default ChatBot;
