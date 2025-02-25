function About() {
  return (
    <section id='about' className='bg-dark py-5'>
      <div className='container text-center'>
        <h2 className='display-4 mb-4'>About Me</h2>
        <p className='lead text-light-emphasis mb-5'>
          I am a Full Stack Developer passionate about creating
          efficient and user-friendly applications. My expertise
          includes React, Node.js, and modern web technologies.
        </p>
        <div className='mt-5'>
          <h3 className='h4 mb-4'>Skills</h3>
          <ul className='list-unstyled row row-cols-1 row-cols-md-3 g-4'>
            <li className='col'>
              <div className='p-3 bg-opacity-10 bg-light rounded'>
                JavaScript/TypeScript
              </div>
            </li>
            <li className='col'>
              <div className='p-3 bg-opacity-10 bg-light rounded'>
                React
              </div>
            </li>
            <li className='col'>
              <div className='p-3 bg-opacity-10 bg-light rounded'>
                Node.js
              </div>
            </li>
            <li className='col'>
              <div className='p-3 bg-opacity-10 bg-light rounded'>
                Express
              </div>
            </li>
            <li className='col'>
              <div className='p-3 bg-opacity-10 bg-light rounded'>
                PostgreSQL
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;
