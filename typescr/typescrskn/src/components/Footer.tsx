import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n';

function Footer() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-6">
        <div className="flex space-x-6">
          <Link to="/about" className="hover:underline">{t.services}</Link>
          <Link to="/terms" className="hover:underline">{t.terms}</Link>
          <Link to="/creator-guidelines" className="hover:underline">{t.creatorGuidelines}</Link>
          <Link to="/client-guidelines" className="hover:underline">{t.clientGuidelines}</Link>
          <Link to="/contact" className="hover:underline">{t.contact}</Link>
        </div>
        <div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'ja' | 'en')}
            className="bg-black text-white border border-white p-1"
          >
            <option value="ja">日本語</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </footer>
  );
}

export default Footer;