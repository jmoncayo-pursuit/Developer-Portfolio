function Projects() {
  return (
    <div className='projects'>
      <h2>My Projects</h2>
      <div className='projects-grid'>
        <div className='project-card'>
          <h3>Mentorship Volunteer Platform (MVP)</h3>
          <p>
            A mentorship app connecting aspiring web developers with
            experienced mentors. Features integrated chat and task
            assignments to support learning and growth.
          </p>
          <div className='project-details'>
            <h4>Key Achievements:</h4>
            <ul>
              <li>
                Delivered Agile-driven features with Trello task
                coordination
              </li>
              <li>
                Engineered real-time chat using Socket.IO/Node.js
              </li>
              <li>Implemented secure JWT/bcrypt authentication</li>
              <li>
                Optimized PostgreSQL for efficient data management
              </li>
            </ul>
            <h4>Tech Stack:</h4>
            <div className='tech-stack'>
              <span>React</span>
              <span>PostgreSQL</span>
              <span>Express</span>
              <span>Node.js</span>
            </div>
          </div>
          <div className='project-links'>
            <a
              href='https://github.com/eivor9/mvp-frontend'
              target='_blank'
              rel='noopener noreferrer'
            >
              GitHub
            </a>
            <a
              href='https://mentorvolunteerplatform.netlify.app/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
