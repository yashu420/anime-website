import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
const Navbar = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Popular", path: "/popular" },
    { name: "Top Rated", path: "/top" },
     { name: "Ongoing", path: "/Ongoing" },
    { name: "Genres", path: "/Genres" },
    
  ];

  const handleSearch = (e) => {
  e.preventDefault();

  const trimmedInput = input.trim();
 if (!trimmedInput) {
    toast.error("Please type something to search ");
    return;
  }


  navigate(`/search/${trimmedInput}`);
  setInput("");
};

  return (
    <nav className="fixed top-0 w-full bg-black/70 backdrop-blur-md z-50">
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        <Link to="/">
          <h1 className="text-2xl font-bold text-white">
            Anime<span className="text-red-600">Hub</span>
          </h1>
        </Link>

        <div className="hidden md:flex gap-8 text-white font-medium pl-86">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                isActive
                  ? "text-red-600 font-bold text-md"
                  : "hover:text-red-500 transition text-md"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search your Anime"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-black border border-gray-600 text-white px-4 py-1 rounded-lg outline-none focus:border-red-500 transition hover:shadow-[0_0_10px_rgba(255,0,0,1.6)]"
              />
              <button type="submit">
                <FaSearch className="text-white text-xl hover:text-red-700 hover:cursor-pointer" />
              </button>
            </div>
          </form>

          <div className="flex gap-4">
            <Link
              to="/login"
              className="bg-red-600 hover:bg-red-700 transition text-white px-6 py-1 rounded-lg"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-1 rounded-lg"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
