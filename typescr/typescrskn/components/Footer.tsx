import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-6">

        <div className="flex space-x-6">
          <Link to="/about" className="hover:underline">サービスについて知る</Link>
          <Link to="/terms" className="hover:underline">利用規約</Link>
          <Link to="/creator-guidelines" className="hover:underline">クリエイターガイドライン</Link>
          <Link to="/client-guidelines" className="hover:underline">クライアントガイドライン</Link>
          <Link to="/contact" className="hover:underline">コンタクト</Link>
        </div>

        <div>
          <select className="bg-black text-white border border-white p-1">
            <option>日本語</option>
            <option>English</option>
          </select>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
