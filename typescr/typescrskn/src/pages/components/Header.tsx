import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">

        <h1 className="text-xl font-bold text-black">猫スペース</h1>

        <nav className="space-x-6">
          <Link to="/drawings" className="text-black hover:text-gray-600">図面</Link>
          <Link to="/fees" className="text-black hover:text-gray-600">手数料</Link>
          <Link to="/artists" className="text-black hover:text-gray-600">アーティスト</Link>
        </nav>


        <button className="text-black hover:text-gray-600">
          🔍
        </button>
      </div>
    </header>
  );
}

export default Header;
