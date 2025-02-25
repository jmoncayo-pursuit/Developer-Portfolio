function Contact() {
  return (
    <section id='contact' className='bg-dark py-5'>
      <div className='container'>
        <div className='text-center mb-5'>
          <h2 className='display-4 mb-4'>Contact Me</h2>
          <p className='lead text-light-emphasis'>
            Let's get in touch!
          </p>
        </div>

        <div className='row justify-content-center'>
          <div className='col-lg-8'>
            <div className='card bg-dark bg-opacity-25 border-0 shadow-sm'>
              <div className='card-body p-4 p-md-5'>
                <div className='text-center mb-4'>
                  <div className='d-inline-flex align-items-center gap-2 mb-3'>
                    <i className='bi bi-envelope-fill text-primary fs-4'></i>
                    <h4 className='mb-0'>Email</h4>
                  </div>
                  <div>
                    <a
                      href={`mailto:${import.meta.env.VITE_EMAIL}`}
                      className='text-decoration-none text-primary fw-medium fs-5 hover-underline'
                    >
                      {import.meta.env.VITE_EMAIL}
                    </a>
                  </div>
                </div>

                <div className='d-flex justify-content-center gap-4'>
                  <a
                    href={import.meta.env.VITE_LINKEDIN_URL}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-decoration-none text-light-emphasis d-flex align-items-center gap-2 hover-primary'
                  >
                    <i className='bi bi-linkedin fs-4'></i>
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={import.meta.env.VITE_GITHUB_URL}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-decoration-none text-light-emphasis d-flex align-items-center gap-2 hover-primary'
                  >
                    <i className='bi bi-github fs-4'></i>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
