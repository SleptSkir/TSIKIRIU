import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-indigo-900 text-white">
      <div className="container">
        <Link to="/">家</Link>
        <Link to="/about" >　アボート</Link>
        <Link to="/blog">　ブロック</Link>
      </div>
    </footer>
  );
}

export default Footer;