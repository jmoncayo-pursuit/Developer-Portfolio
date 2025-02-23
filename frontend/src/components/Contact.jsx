function Contact() {
  return (
    <div className='contact'>
      <h2>Contact Me</h2>
      <div className='contact-info'>
        <p>Email: {import.meta.env.VITE_EMAIL}</p>
        <p>
          LinkedIn:{' '}
          <a
            href={import.meta.env.VITE_LINKEDIN_URL}
            target='_blank'
            rel='noopener noreferrer'
          >
            My Profile
          </a>
        </p>
        <p>
          GitHub:{' '}
          <a
            href={import.meta.env.VITE_GITHUB_URL}
            target='_blank'
            rel='noopener noreferrer'
          >
            {import.meta.env.VITE_GITHUB_USERNAME}
          </a>
        </p>
      </div>
    </div>
  );
}

export default Contact;
