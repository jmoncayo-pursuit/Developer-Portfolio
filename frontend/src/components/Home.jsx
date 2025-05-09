import { useEffect, useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import TypedText from './TypedText';
import Experience from './Experience';
import Education from './Education'; // Import the new Education component

function Home({ pageName }) {
  const { setCurrentPage, setCurrentContent } = useNavigation();
  const [showContactForm, setShowContactForm] = useState(false);
  const [currentProject, setCurrentProject] = useState(0);

  const projects = [
    {
      title: 'Vector RAG AI Travel Recommender',
      description:
        'AI-powered travel recommendation system using RAG (Retrieval Augmented Generation) for personalized destination suggestions.',
      stack: [
        'SQL',
        'GenAI',
        'Node.js',
        'Vector DB',
        'FastAPI',
        'React',
      ],
      links: {
        github:
          'https://github.com/jmoncayo-pursuit/rag-travel-recommendation-system',
        // demo: 'https://vector-rag-travel.netlify.app/',
      },
    },
    {
      title: 'AI Podcaster Generator',
      description:
        'Modern podcast generator that converts scripts to audio using the Speechify API. Features a React + MUI frontend, TypeScript/Express backend, multi-voice conversation builder, and accessible design.',
      stack: [
        'React 19',
        'TypeScript',
        'Vite',
        'Material UI (MUI v7)',
        'Emotion',
        'Node.js',
        'Express',
        'Speechify API',
      ],
      links: {
        github: 'https://github.com/jmoncayo-pursuit/ai-podcaster',
        demo: 'https://ai-podcaster-speechify.netlify.app/',
      },
    },
    {
      title: 'AI Assisted Developer Profile',
      description:
        "Interactive portfolio with AI chatbot integration using Google's Gemini for dynamic visitor interaction.",
      stack: ['React', 'Gemini API', 'Bootstrap', 'Express'],
      links: {
        github:
          'https://github.com/jmoncayo-pursuit/Developer-Portfolio',
        demo: 'https://developer-portfolio-jean.netlify.app/',
      },
    },
    {
      title: 'Mentorship Volunteer Platform',
      description:
        'Platform connecting aspiring developers with experienced mentors featuring real-time chat.',
      stack: ['React', 'PostgreSQL', 'Express', 'Socket.IO'],
      links: {
        github: 'https://github.com/eivor9/mvp-frontend',
        demo: 'https://mentorvolunteerplatform.netlify.app/',
        upwork:
          'https://www.upwork.com/freelancers/~0149174452cbcbbed9?p=1900772157442326528',
      },
    },
    {
      title: 'AI Assisted Backgammon Game',
      description:
        'Classic backgammon with AI opponent and move suggestions powered by machine learning.',
      stack: [
        'React',
        'Typescript',
        'Node.js',
        'WebGL',
        'Anthropic API',
      ],
      links: {
        github: 'https://github.com/jmoncayo-pursuit/ai-backgammon',
        demo: 'https://ai-backgammon.netlify.app/',
      },
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

  useEffect(() => {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => {
      section.classList.add('section-transition');
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

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
        data-aos='fade-up'
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
          <div id='typed-text-container'>
            <h1 className='display-3 fw-bold mb-4 text-white'>
              <TypedText text='Jean Moncayo' speed={150} />
            </h1>
            <p className='lead mb-5 text-white-50'>
              <TypedText text='Full Stack Developer' speed={100} />
            </p>
          </div>

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
                  href='#resume' // Add the href to go to the resume section
                  className='btn btn-outline-light rounded-pill px-4 py-2'
                >
                  Experience
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
        <section
          id='about'
          className='about'
          data-aos='fade-up'
          data-aos-delay='100'
        >
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

        <section
          id='skills'
          className='skills'
          data-aos='fade-up'
          data-aos-delay='200'
        >
          <div className='container'>
            <div className='section-title'>
              <h2>Skills</h2>
            </div>
            <div className='skills-content'>
              <div className='skill-bubbles'>
                <div className='skill-bubble major'>
                  JavaScript/React
                </div>
                <div className='skill-bubble'>Node.js</div>
                <div className='skill-bubble large'>Express</div>
                <div className='skill-bubble medium'>PostgreSQL</div>
                <div className='skill-bubble major'>HTML/CSS</div>
                <div className='skill-bubble large'>Git/GitHub</div>
                <div className='skill-bubble'>RESTful APIs</div>
                <div className='skill-bubble medium'>TypeScript</div>
                <div className='skill-bubble'>Bootstrap</div>
                <div className='skill-bubble large'>SQL</div>
              </div>
            </div>
          </div>
        </section>

        <section
          id='resume'
          className='resume'
          data-aos='fade-up'
          data-aos-delay='300'
        >
          <div className='container'>
            <div className='section-title'>
              <h2>Experience & Education</h2>
            </div>
            <div className='resume-content'>
              <div className='resume-section'>
                <h3>Professional Experience</h3>
                <Experience />
              </div>
              <Education /> {/* Now using the Education component */}
            </div>
          </div>
        </section>

        <section
          id='projects'
          className='projects py-5'
          data-aos='fade-up'
          data-aos-delay='400'
        >
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

                  <div className='project-links d-flex flex-wrap justify-content-center gap-2'>
                    <a
                      href={
                        projects[currentProject].links?.github || '#'
                      }
                      className='btn btn-outline-light btn-sm btn-responsive'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <i className='bi bi-github me-1 me-sm-2'></i>
                      <span className='btn-text'>GitHub</span>
                    </a>
                    {projects[currentProject].links?.demo && (
                      <a
                        href={projects[currentProject].links.demo}
                        className='btn btn-outline-light btn-sm btn-responsive'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <i className='bi bi-box-arrow-up-right me-1 me-sm-2'></i>
                        <span className='btn-text'>Live Demo</span>
                      </a>
                    )}
                    {projects[currentProject].links?.upwork && (
                      <a
                        href={projects[currentProject].links.upwork}
                        className='btn btn-outline-light btn-sm btn-responsive'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <i className='bi bi-briefcase me-1 me-sm-2'></i>
                        <span className='btn-text'>Upwork</span>
                      </a>
                    )}
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

        <section
          id='contact'
          className='contact'
          data-aos='fade-up'
          data-aos-delay='500'
        >
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
