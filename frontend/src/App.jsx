import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter } from 'react-router-dom';
import { NavigationProvider } from './context/NavigationContext';
import Home from './components/Home';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import { ScrollToTop } from './main.jsx';

function App() {
  useEffect(() => {
    // Enhanced AOS initialization
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false, // Changed to false to allow animations when scrolling back up
      mirror: true, // Animations will trigger each time element comes into view
      offset: 50, // Offset (in px) from the original trigger point
      delay: 100, // Default delay on all animations
    });

    // Refresh AOS when window is resized
    window.addEventListener('resize', () => {
      AOS.refresh();
    });

    return () => {
      window.removeEventListener('resize', () => {
        AOS.refresh();
      });
    };
  }, []);

  return (
    <BrowserRouter>
      <NavigationProvider>
        <ScrollToTop />
        <header id='header' className='fixed-top'>
          <Navbar />
        </header>

        <div className='app'>
          <main className='main-content'>
            <Home />
            <ChatBot />
          </main>
        </div>

        <button
          className='scroll-to-top'
          onClick={() =>
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
          aria-label='Scroll to top'
        >
          <i className='bi bi-arrow-up'></i>
        </button>

        <footer id='footer' className='position-relative bg-dark'>
          <div className='container'>
            <div className='copyright'>
              &copy; {new Date().getFullYear()}{' '}
              <strong>Jean Moncayo</strong>
            </div>
          </div>
        </footer>
      </NavigationProvider>
    </BrowserRouter>
  );
}

export default App;
