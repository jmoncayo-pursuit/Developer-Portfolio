function Projects() {
  return (
    <section id='projects' className='py-5'>
      <div className='container'>
        <h2 className='text-center display-4 mb-5'>Projects</h2>

        <div className='row g-4'>
          <div className='col-md-6'>
            <div className='card bg-dark border-secondary h-100'>
              <div className='card-body'>
                <h3 className='card-title h4 text-primary mb-3'>
                  Mentorship Platform
                </h3>
                <p className='card-text text-light-emphasis'>
                  A comprehensive platform connecting developers with
                  mentors
                </p>
                <div className='d-flex flex-wrap gap-2 mb-3'>
                  <span className='badge bg-secondary'>React</span>
                  <span className='badge bg-secondary'>Node.js</span>
                  <span className='badge bg-secondary'>
                    PostgreSQL
                  </span>
                </div>
                <div className='d-flex gap-2 mt-auto'>
                  <a
                    href='#'
                    className='btn btn-outline-primary btn-sm'
                  >
                    <i className='bi bi-github me-2'></i>Code
                  </a>
                  <a href='#' className='btn btn-primary btn-sm'>
                    <i className='bi bi-box-arrow-up-right me-2'></i>
                    Live
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* ...other projects... */}
        </div>
      </div>
    </section>
  );
}

export default Projects;
