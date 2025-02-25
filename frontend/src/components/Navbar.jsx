import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark bg-opacity-95 fixed-top shadow-sm'>
      <div className='container'>
        <Link
          to='/'
          className='navbar-brand d-flex align-items-center gap-3'
        >
          <img
            src='/assets/img/profile.png'
            alt='Jean Moncayo'
            className='rounded-circle'
            style={{
              width: '32px',
              height: '32px',
              objectFit: 'cover',
            }}
          />
          <span>Jean Moncayo's Portfolio</span>
        </Link>

        <button
          className='navbar-toggler border-0'
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          aria-controls='navbarNav'
          aria-expanded={isOpen}
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div
          className={`collapse navbar-collapse ${
            isOpen ? 'show' : ''
          }`}
          id='navbarNav'
        >
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <Link
                to='/'
                className='nav-link px-3'
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/about'
                className='nav-link px-3'
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/projects'
                className='nav-link px-3'
                onClick={() => setIsOpen(false)}
              >
                Projects
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/contact'
                className='nav-link px-3'
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
