function Projects() {
  return (
    <div className='projects'>
      <h2>My Projects</h2>
      <div className='projects-grid'>
        <div className='project-card'>
          <h3>Project 1</h3>
          <p>Description of project 1</p>
          <div className='project-links'>
            <a
              href='https://github.com/yourusername/project1'
              target='_blank'
              rel='noopener noreferrer'
            >
              GitHub
            </a>
            <a
              href='https://project1-demo.com'
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
