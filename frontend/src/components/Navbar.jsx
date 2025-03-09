import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (e) => {
    setIsOpen(false);
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-opacity-95 fixed-top shadow-sm">
      <div className="container">
        <a href="#" className="navbar-brand d-flex align-items-center gap-3">
          <img
            src="/assets/img/profile.png"
            alt="Jean Moncayo"
            className="rounded-circle"
            style={{ width: "32px", height: "32px", objectFit: "cover" }}
          />
          <span>Jean Moncayo's Portfolio</span>
        </a>

        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a
                href="#hero"
                className="nav-link px-3"
                onClick={handleNavClick}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#about"
                className="nav-link px-3"
                onClick={handleNavClick}
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#resume"
                className="nav-link px-3"
                onClick={handleNavClick}
              >
                Experience
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#projects"
                className="nav-link px-3"
                onClick={handleNavClick}
              >
                Projects
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#contact"
                className="nav-link px-3"
                onClick={handleNavClick}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
