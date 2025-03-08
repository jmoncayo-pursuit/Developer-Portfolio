import { useEffect, useState } from 'react';
import { useNavigation } from '../context/NavigationContext';

function Home({ pageName }) {
  const { setCurrentPage, setCurrentContent } = useNavigation();
  const [showContactForm, setShowContactForm] = useState(false);
  const [currentProject, setCurrentProject] = useState(0);

  const projects = [
    {
      title: 'Vector RAG AI Travel Recommender',
      description:
        'AI-powered travel recommendation system using RAG (Retrieval Augmented Generation) for personalized destination suggestions.',
      stack: ['SQL', 'GenAI','Node.js' , 'Vector DB', 'FastAPI', 'React'],
    },
    {
      title: 'AI Podcaster Generator',
      description:
        'Generate podcast-style content with AI voices and dynamic conversations using cutting-edge language models.',
      stack: [
        'Node.js',
        'ElevenLabs API',
        'Gemini API',
        'Express',
        'React',
      ],
    },
    {
      title: 'AI Assisted Developer Profile',
      description:
        "Interactive portfolio with AI chatbot integration using Google's Gemini for dynamic visitor interaction.",
      stack: ['React', 'Gemini API', 'Bootstrap', 'Express'],
    },
    {
      title: 'Mentorship Volunteer Platform',
      description:
        'Platform connecting aspiring developers with experienced mentors featuring real-time chat.',
      stack: ['React', 'PostgreSQL', 'Express', 'Socket.IO'],
    },
    {
      title: 'AI Assisted Backgammon Game',
      description:
        'Classic backgammon with AI opponent and move suggestions powered by machine learning.',
      stack: ['React', 'Typescript', 'Node.js', 'WebGL', 
        'Anthropic api'
      ],
    },
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject(
      (prev) => (prev - 1 + projects.length) % projects.length
    );
  };

  useEffect(() => {
    setCurrentPage(pageName);
    setCurrentContent({
      section: 'Home',
      content:
        "Introduction and overview of Jean Moncayo's portfolio",
    });

    // Remove old event listeners to prevent duplicates
    const cleanup = () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener('click', handleSmoothScroll);
      });
    };

    // Add smooth scroll behavior for anchor links
    const handleSmoothScroll = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget
        .getAttribute('href')
        .substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', handleSmoothScroll);
    });

    return cleanup;
  }, [pageName, setCurrentPage, setCurrentContent]);

  return (
    <>
      <section
        id='hero'
        className='min-vh-100 d-flex align-items-center position-relative bg-dark overflow-hidden'
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url("/assets/img/hero-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className='container text-center'>
          <img
            src='/assets/img/profile.png'
            alt='Jean Moncayo'
            className='rounded-circle border border-4 border-opacity-25 mb-4'
            style={{
              width: '150px',
              height: '150px',
              objectFit: 'cover',
            }}
          />
          <h1 className='display-3 fw-bold mb-4 text-white'>
            Jean Moncayo
          </h1>
          <p className='lead mb-5 text-white-50'>
            Full Stack Developer
          </p>

          <nav className='mt-5'>
            <ul className='list-unstyled d-flex justify-content-center gap-4 flex-wrap'>
              <li>
                <a
                  href='#about'
                  className='btn btn-outline-light rounded-pill px-4 py-2'
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href='#projects'
                  className='btn btn-outline-light rounded-pill px-4 py-2'
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href='#contact'
                  className='btn btn-outline-light rounded-pill px-4 py-2'
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <main id='main'>
        <section id='about' className='about'>
          <div className='container'>
            <div className='section-title'>
              <h2>About</h2>
              <p>
                Full Stack Developer with a passion for creating
                efficient and scalable web applications.
              </p>
            </div>
          </div>
        </section>

        <section id='skills' className='skills'>
          <div className='container'>
            <div className='section-title'>
              <h2>Skills</h2>
            </div>
            <div className='skills-content'>
              <div className='row'>
                <div className='col-lg-6'>
                  <div className='progress'>
                    <span className='skill'>
                      JavaScript/React <i className='val'>90%</i>
                    </span>
                    <div className='progress-bar-wrap'>
                      <div
                        className='progress-bar'
                        role='progressbar'
                        style={{ width: '90%' }}
                      ></div>
                    </div>
                  </div>
                  <div className='progress'>
                    <span className='skill'>
                      Node.js/Express <i className='val'>85%</i>
                    </span>
                    <div className='progress-bar-wrap'>
                      <div
                        className='progress-bar'
                        role='progressbar'
                        style={{ width: '85%' }}
                      ></div>
                    </div>
                  </div>
                  <div className='progress'>
                    <span className='skill'>
                      PostgreSQL <i className='val'>80%</i>
                    </span>
                    <div className='progress-bar-wrap'>
                      <div
                        className='progress-bar'
                        role='progressbar'
                        style={{ width: '80%' }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='progress'>
                    <span className='skill'>
                      HTML/CSS <i className='val'>95%</i>
                    </span>
                    <div className='progress-bar-wrap'>
                      <div
                        className='progress-bar'
                        role='progressbar'
                        style={{ width: '95%' }}
                      ></div>
                    </div>
                  </div>
                  <div className='progress'>
                    <span className='skill'>
                      Git/GitHub <i className='val'>85%</i>
                    </span>
                    <div className='progress-bar-wrap'>
                      <div
                        className='progress-bar'
                        role='progressbar'
                        style={{ width: '85%' }}
                      ></div>
                    </div>
                  </div>
                  <div className='progress'>
                    <span className='skill'>
                      RESTful APIs <i className='val'>90%</i>
                    </span>
                    <div className='progress-bar-wrap'>
                      <div
                        className='progress-bar'
                        role='progressbar'
                        style={{ width: '90%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id='resume' className='resume'>
          <div className='container'>
            <div className='section-title'>
              <h2>Experience & Education</h2>
            </div>
            <div className='resume-content'>
              <div className='resume-section'>
                <h3>Professional Experience</h3>
                <div className='resume-item'>
                  <h4>Full Stack Web Developer Fellow</h4>
                  <h5>2023 - Present</h5>
                  <p>
                    <em>Pursuit, New York, NY</em>
                  </p>
                  <ul>
                    <li>
                      Developing full-stack applications using modern
                      JavaScript frameworks
                    </li>
                    <li>
                      Building RESTful APIs with Node.js and Express
                    </li>
                    <li>
                      Implementing responsive design principles and
                      user authentication
                    </li>
                  </ul>
                </div>
                {/* Add more experience items */}
              </div>

              <div className='resume-section'>
                <h3>Education</h3>
                <div className='resume-item'>
                  <h4>Full Stack Web Development</h4>
                  <h5>2023 - 2024</h5>
                  <p>
                    <em>Pursuit, New York, NY</em>
                  </p>
                  <ul>
                    <li>
                      Intensive 12-month software engineering
                      fellowship
                    </li>
                    <li>Front-end: React, JavaScript, HTML5, CSS3</li>
                    <li>Back-end: Node.js, Express, PostgreSQL</li>
                  </ul>
                </div>
                {/* Add more education items */}
              </div>
            </div>
          </div>
        </section>

        <section id='projects' className='projects py-5'>
          <div className='container'>
            <div className='section-title text-center mb-5'>
              <h2>Projects</h2>
            </div>
            <div className='position-relative'>
              <div className='carousel-container'>
                <div className='project-card text-center p-4 bg-dark text-white rounded-3 shadow'>
                  <h3 className='mb-3'>
                    {projects[currentProject].title}
                  </h3>
                  <p className='mb-4'>
                    {projects[currentProject].description}
                  </p>
                  <div className='tech-stack d-flex flex-wrap justify-content-center gap-2 mb-4'>
                    {projects[currentProject].stack.map(
                      (tech, index) => (
                        <span key={index} className='tech-bubble'>
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                  <div className='project-links d-flex justify-content-center gap-3'>
                    <a href='#' className='btn btn-outline-light'>
                      <i className='bi bi-github me-2'></i>GitHub
                    </a>
                    <a href='#' className='btn btn-outline-light'>
                      <i className='bi bi-box-arrow-up-right me-2'></i>
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>

              <button
                onClick={prevProject}
                className='carousel-control prev'
                aria-label='Previous project'
              >
                <i className='bi bi-chevron-left'></i>
              </button>
              <button
                onClick={nextProject}
                className='carousel-control next'
                aria-label='Next project'
              >
                <i className='bi bi-chevron-right'></i>
              </button>
            </div>
          </div>
        </section>

        <section id='contact' className='contact'>
          <div className='container'>
            <div className='section-title'>
              <h2>Contact</h2>
            </div>
            <div className='row justify-center'>
              <div className='col-lg-8'>
                <div className='info'>
                  <div className='email-container'>
                    <div className='email-header'>
                      <i className='bi bi-envelope'></i>
                      <h4>Email:</h4>
                    </div>
                    <a
                      href='mailto:Jean.Moncayo@gmail.com'
                      className='email-link'
                    >
                      Jean.Moncayo@gmail.com
                    </a>
                  </div>

                  <div className='social-links'>
                    <a
                      href={import.meta.env.VITE_LINKEDIN_URL}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='social-link'
                    >
                      <i className='bi bi-linkedin'></i>
                      <span>LinkedIn Profile</span>
                    </a>
                    <a
                      href={import.meta.env.VITE_GITHUB_URL}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='social-link'
                    >
                      <i className='bi bi-github'></i>
                      <span>GitHub Profile</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
