import { useState, useEffect } from 'react';

function TypedText({ text, speed = 100, className = '' }) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('typed-text-container');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setDisplayText('');
      setIsTyping(true);
      return;
    }

    if (!isTyping) return;

    if (displayText === text) {
      setIsTyping(false);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(text.slice(0, displayText.length + 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, text, speed, isTyping, isVisible]);

  return (
    <span className={`typed-text ${className}`}>
      {displayText}
      {isTyping && <span className='cursor'>|</span>}
    </span>
  );
}

export default TypedText;
