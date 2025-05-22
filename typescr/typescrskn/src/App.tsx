import React from 'react';
import { UserProvider } from "./context/UserContext";
import { LanguageProvider } from './context/LanguageContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Drawings from './pages/Drawings';
import AuthPage from './pages/Auth';
import FavoritesPage from './pages/Favorites';

function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <div className="min-h-screen flex flex-col">
          <BrowserRouter>
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/drawings" element={<Drawings />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
        </div>
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;
