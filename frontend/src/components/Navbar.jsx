import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className='navbar'>
      <div className='nav-container'>
        <div className='nav-brand'>
          <a
            href='#'
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
          >
            <img
              src='/assets/img/profile.png'
              alt='Jean Moncayo'
              className='nav-profile-pic'
            />
            <span>Jean Moncayo</span>
          </a>
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
          <a
            href='#about'
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('about');
            }}
          >
            About
          </a>
          <a
            href='#skills'
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('skills');
            }}
          >
            Skills
          </a>
          <a
            href='#projects'
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('projects');
            }}
          >
            Projects
          </a>
          <a
            href='#contact'
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
