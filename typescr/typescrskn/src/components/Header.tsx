import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n';
import { useUser } from '../context/UserContext';

function Header() {
  const { language } = useLanguage();
  const t = translations[language];
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const userDisplay = user ? (
  <span className="mr-4 text-sm text-gray-500">
    {user.nickname} ({user.role})
  </span>
) : null;


  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-xl font-bold text-black">猫スペース</h1>
        <nav className="space-x-6">
          <Link to="/">{t.home}</Link>
          <Link to="/drawings">{t.drawings}</Link>
          <Link to="/fees">{t.fees}</Link>
          <Link to="/artists">{t.artists}</Link>
          <Link to="/favorites">{t.favorites ?? "Favorites"}</Link>
        </nav>
        <div className="flex items-center space-x-4">
          {userDisplay}
          {!user ? (
            <Link
              to="/auth"
              className="px-4 py-1 border rounded text-black hover:bg-gray-100"
            >
              Login / Register
            </Link>
          ) : (
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="px-4 py-1 border rounded text-black hover:bg-gray-100"
            >
              Logout
            </button>
          )}
          <button className="ml-2 text-black hover:text-gray-600" title="Search">🔍</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
