import { useEffect, useState } from 'react';
import { useNavigation } from '../context/NavigationContext';

function Home({ pageName }) {
  const { setCurrentPage, setCurrentContent } = useNavigation();
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    setCurrentPage(pageName);
    setCurrentContent({
      section: 'Home',
      content:
        "Introduction and overview of Jean Moncayo's portfolio",
    });

    // Add smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document
          .querySelector(this.getAttribute('href'))
          .scrollIntoView({
            behavior: 'smooth',
          });
      });
    });
  }, [pageName, setCurrentPage, setCurrentContent]);

  return (
    <>
      <section id='hero' className='d-flex align-items-center'>
        <div className='hero-container'>
          <img
            src='/assets/img/profile.png'
            alt='Jean Moncayo'
            className='profile-img'
          />
          <h1>Jean Moncayo</h1>
          <h2>Full Stack Developer</h2>
          <nav className='nav-menu'>
            <ul>
              <li>
                <a href='#about'>About</a>
              </li>
              <li>
                <a href='#skills'>Skills</a>
              </li>
              <li>
                <a href='#projects'>Projects</a>
              </li>
              <li>
                <a href='#contact'>Contact</a>
              </li>
            </ul>
          </nav>
          <div className='social-links'>
            <a
              href={import.meta.env.VITE_LINKEDIN_URL}
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='bi bi-linkedin'></i>
            </a>
            <a
              href={import.meta.env.VITE_GITHUB_URL}
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='bi bi-github'></i>
            </a>
          </div>
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

        <section id='projects' className='projects'>
          <div className='container'>
            <div className='section-title'>
              <h2>Projects</h2>
            </div>
            <div className='projects-grid'>
              <div className='project-card'>
                <h3>Mentorship Volunteer Platform (MVP)</h3>
                <p>
                  A mentorship app connecting aspiring web developers
                  with experienced mentors.
                </p>
                <div className='project-details'>
                  <h4>Key Achievements:</h4>
                  <ul>
                    <li>
                      Delivered Agile-driven features with Trello task
                      coordination
                    </li>
                    <li>
                      Engineered real-time chat using
                      Socket.IO/Node.js
                    </li>
                    <li>
                      Implemented secure JWT/bcrypt authentication
                    </li>
                    <li>
                      Optimized PostgreSQL for efficient data
                      management
                    </li>
                  </ul>
                  <div className='tech-stack'>
                    <span>React</span>
                    <span>PostgreSQL</span>
                    <span>Express</span>
                    <span>Node.js</span>
                  </div>
                </div>
                <div className='project-links'>
                  <a
                    href='https://github.com/yourusername/mvp-frontend'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i className='bi bi-github'></i> GitHub
                  </a>
                  <a
                    href='https://your-demo-link.com'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i className='bi bi-box-arrow-up-right'></i> Live
                    Demo
                  </a>
                </div>
              </div>
              {/* Add more project cards as needed */}
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
