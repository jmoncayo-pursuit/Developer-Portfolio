import { BrowserRouter } from 'react-router-dom';
import { NavigationProvider } from './context/NavigationContext';
import Home from './components/Home';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import { ScrollToTop } from './main.jsx';

function App() {
  return (
    <BrowserRouter>
      <NavigationProvider>
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
