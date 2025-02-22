import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <Router>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;
