import { useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';

function Home({ pageName }) {
  const { setCurrentPage, setCurrentContent } = useNavigation();

  useEffect(() => {
    setCurrentPage(pageName);
    setCurrentContent({
      section: 'Home',
      content:
        "Introduction and overview of Jean Moncayo's portfolio",
    });
  }, [pageName, setCurrentPage, setCurrentContent]);

  return (
    <div className='home'>
      <h1 className='welcome-title'>Welcome to My Portfolio</h1>
      <p>Full Stack Developer</p>
    </div>
  );
}

export default Home;
