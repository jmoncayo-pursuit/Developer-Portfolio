import { BrowserRouter as Router } from 'react-router-dom';
import { NavigationProvider } from './context/NavigationContext';
import { PageWrapper } from './components/PageWrapper';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import { ScrollToTop } from './main.jsx';

function App() {
  return (
    <NavigationProvider>
      <Router>
        <ScrollToTop />
        <header id='header' className='fixed-top'>
          <Navbar />
        </header>

        <Home />
        <ChatBot />

        <button
          className='scroll-to-top'
          onClick={() =>
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
          aria-label='Scroll to top'
        >
          <i className='bi bi-arrow-up'></i>
        </button>

        <footer id='footer'>
          <div className='container'>
            <div className='copyright'>
              &copy; {new Date().getFullYear()}{' '}
              <strong>Jean Moncayo</strong>
            </div>
          </div>
        </footer>
      </Router>
    </NavigationProvider>
  );
}

export default App;
