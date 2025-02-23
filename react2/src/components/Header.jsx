import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-lime-300 text-indigo-900">
      <div className="container">
        <Link to="/">家</Link>
        <Link to="/about">　アボート</Link>
        <Link to="/blog">　ブロック</Link>
      </div>
    </header>
  );
}

export default Header;