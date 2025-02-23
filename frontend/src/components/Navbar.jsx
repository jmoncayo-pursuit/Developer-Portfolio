import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='navbar'>
      <div className='nav-container'>
        <div className='nav-brand'>
          <Link to='/'>Jean Moncayo's Developer Portfolio</Link>
        </div>

        <button
          className={`hamburger ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label='menu'
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to='/' onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to='/about' onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link to='/projects' onClick={() => setIsOpen(false)}>
            Projects
          </Link>
          <Link to='/contact' onClick={() => setIsOpen(false)}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
