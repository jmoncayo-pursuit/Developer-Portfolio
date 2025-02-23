import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { NavigationProvider } from './context/NavigationContext';
import { PageWrapper } from './components/PageWrapper';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <NavigationProvider>
      <Router>
        <div className='app'>
          <Navbar />
          <div className='main-content'>
            <Routes>
              <Route
                path='/'
                element={
                  <PageWrapper pageName='home'>
                    <Home />
                  </PageWrapper>
                }
              />
              <Route
                path='/about'
                element={
                  <PageWrapper pageName='about'>
                    <About />
                  </PageWrapper>
                }
              />
              <Route
                path='/projects'
                element={
                  <PageWrapper pageName='projects'>
                    <Projects />
                  </PageWrapper>
                }
              />
              <Route
                path='/contact'
                element={
                  <PageWrapper pageName='contact'>
                    <Contact />
                  </PageWrapper>
                }
              />
            </Routes>
          </div>
          <ChatBot />
        </div>
      </Router>
    </NavigationProvider>
  );
}

export default App;
