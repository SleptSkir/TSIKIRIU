import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n';

function Header() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-xl font-bold text-black">猫スペース</h1>
        <nav className="space-x-6">
          <Link to="/">{t.home}</Link>
          <Link to="/drawings">{t.drawings}</Link>
          <Link to="/fees">{t.fees}</Link>
          <Link to="/artists">{t.artists}</Link>
        </nav>
        <button className="text-black hover:text-gray-600">🔍</button>
      </div>
    </header>
  );
}

export default Header;
