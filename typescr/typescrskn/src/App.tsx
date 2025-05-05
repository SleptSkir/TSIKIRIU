import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;