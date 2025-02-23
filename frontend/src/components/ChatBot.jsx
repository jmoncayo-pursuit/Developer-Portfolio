import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '../context/NavigationContext';

function ChatBot() {
  const { currentPage, currentContent } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    }
  };

  return (
    <div className={`chatbot ${isOpen ? 'open' : ''}`}>
      {isOpen && (
        <div className='chatbot-container'>
          <button
            className='close-button'
            onClick={() => setIsOpen(false)}
            aria-label='Close chat'
          >
            ×
          </button>
          <div className='messages'>
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                {msg.type === 'user' ? (
                  <span className='user-message'>
                    You: {msg.text}
                  </span>
                ) : (
                  <span className='bot-message'>
                    AI Assistant: {msg.text}
                  </span>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Ask a question...'
            />
            <button type='submit'>Send</button>
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
