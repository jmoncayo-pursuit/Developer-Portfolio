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

  const generateResponse = (query) => {
    query = query.toLowerCase();

    if (
      query.includes('hello') ||
      query.includes('hi') ||
      query.includes('hey')
    ) {
      return {
        text: "Hello! I can help you learn about Jean's work and experience. What would you like to know?",
        showSuggestions: false,
      };
    }

    if (query.includes('project')) {
      return {
        text: `Jean's key project is the Mentorship Volunteer Platform (MVP):

• Connects aspiring developers with experienced mentors
• Built with React, Node.js, Express, and PostgreSQL
• Features real-time chat using Socket.IO
• Implements secure JWT authentication
• Deployed on AWS with CI/CD pipeline

Jean has several other projects that showcase different aspects of web development.`,
        showSuggestions: false,
      };
    }

    if (query.includes('experience') || query.includes('work')) {
      return {
        text: `Jean's professional experience includes:

• Full Stack Developer Fellow at Pursuit (2023-Present)
  - Develops complex web applications
  - Collaborates in Agile teams
  - Mentors junior developers

• Has completed numerous freelance projects
• Graduated from intensive 12-month software engineering fellowship
• Actively contributes to open-source projects`,
        showSuggestions: false,
      };
    }

    if (query.includes('contact') || query.includes('touch')) {
      return {
        text: `You can reach Jean through:

• Email: Jean.Moncayo@gmail.com
• LinkedIn: Professional profile available for networking
• GitHub: View Jean's code contributions and projects

Jean is open to discussing new opportunities and collaborations!`,
        showSuggestions: false,
      };
    }

    // Default response
    return {
      text: "I can tell you about Jean's background, technical skills, projects, or provide contact information. What would you like to know?",
      showSuggestions: false,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = generateResponse(input.toLowerCase());
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
          <div className='chatbot-header'>
            <i className='bi bi-stars'></i>
            <h3>Portfolio AI Assistant</h3>
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
