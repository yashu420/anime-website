import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram,} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";


const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 pt-12 pb-6  border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Anime<span className="text-red-600">Hub</span>
          </h1>
          <p className="text-sm ">
            Stream the best anime shows and explore your favorite characters.
          </p>
        </div>

        <div className="pl-30">
          <h2 className="text-white font-semibold mb-4 flex text-xl ">
            Quick Links
          </h2>
          <ul className="space-y-2 grid grid-cols-2">
            <li>
              <Link to="/about" className="hover:text-red-500 transition ">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-red-500 transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/privacypolicy" className="hover:text-red-600">
                Privacy Policy
              </Link>
            </li>
            <li>
             <Link to="/terms" className="hover:text-red-600 transition">
  Terms 
</Link>
            </li>
          </ul>
        </div>

        <div className="pl-30">
          <h2 className="text-white font-semibold mb-4 text-xl">Follow Us</h2>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-red-500 transition">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-red-500 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-red-500 transition">
             <FaSquareXTwitter />

             </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-800 pt-6">
        © {new Date().getFullYear()} AnimeHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
