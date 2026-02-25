import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const Navbar = () => {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Popular", path: "/popular" },
    { name: "Top Rated", path: "/top" },
    { name: "Ongoing", path: "/ongoing" },
    { name: "Genres", path: "/genres" },
  ];

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      toast.error("Please type something to search");
      return;
    }

    navigate(`/search/${trimmedInput}`);
    setInput("");
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-black/70 backdrop-blur-md z-50">
      <div className="flex items-center justify-between px-6 md:px-10 py-4">

        <Link to="/">
          <h1 className="text-2xl font-bold text-white">
            Anime<span className="text-red-600">Hub</span>
          </h1>
        </Link>

       
        <div className="hidden md:flex gap-8 text-white font-medium pl-70">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                isActive
                  ? "text-red-600 font-bold"
                  : "hover:text-red-500 transition"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        
        <div className="hidden md:flex items-center gap-4">

          <form onSubmit={handleSearch} className="relative">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search Anime..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="bg-black border border-gray-600 text-white px-4 py-1 rounded-lg outline-none focus:border-red-500 transition"
              />
              <button type="submit">
                <FaSearch className="text-white text-xl hover:text-red-500" />
              </button>
            </div>
          </form>

          <Link
            to="/login"
            className="bg-red-600 hover:bg-red-700 transition text-white px-5 py-1 rounded-lg"
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

        <div className="md:hidden text-white text-2xl cursor-pointer">
          {isOpen ? (
            <FaTimes onClick={() => setIsOpen(false)} />
          ) : (
            <FaBars onClick={() => setIsOpen(true)} />
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg px-6 py-6 space-y-6 text-white transition-all duration-300">

          {/* Mobile Links */}
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-red-600 font-bold"
                    : "hover:text-red-500 transition"
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch}>
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                placeholder="Search Anime..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="flex-1 bg-black border border-gray-600 text-white px-4 py-2 rounded-lg outline-none focus:border-red-500"
              />
              <button type="submit">
                <FaSearch className="text-white text-xl hover:text-red-500" />
              </button>
            </div>
          </form>

          {/* Mobile Auth */}
          <div className="flex flex-col gap-3 mt-4">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-center"
            >
              Login
            </Link>

            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-center"
            >
              Sign Up
            </Link>
          </div>

        </div>
      )}
    </nav>
  );
};

export default Navbar;