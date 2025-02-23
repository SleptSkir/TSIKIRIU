import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer';
import Home from './peegi/Home';
import About from './peegi/About';
import Blog from './peegi/Blog';

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