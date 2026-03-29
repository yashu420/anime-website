import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import { supabase } from "../supabase-client";

const Navbar = () => {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Popular", path: "/popular" },
    { name: "Top Rated", path: "/top" },
    { name: "News", path: "/News" },
    { name: "Genres", path: "/genres" },
  ];

  // 🔥 AUTH STATE LISTENER
  useEffect(() => {
    // get current session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });

    // listen for login/logout
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // 🔍 SEARCH
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

  // 🔓 LOGOUT
const handleLogout = async () => {
  await supabase.auth.signOut();
  toast.success("You have been logged out!");
};

  return (
    <nav className="fixed top-0 w-full bg-black/70 backdrop-blur-md z-50">
      <div className="flex items-center justify-between px-6 md:px-10 py-4">

        {/* LOGO */}
        <Link to="/">
          <h1 className="text-2xl font-bold text-white">
            Anime<span className="text-red-600">Hub</span>
          </h1>
        </Link>

        {/* DESKTOP NAV */}
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

        {/* DESKTOP RIGHT */}
        <div className="hidden md:flex items-center gap-4">

          {/* SEARCH */}
          <form onSubmit={handleSearch} className="relative">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search Anime..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-black border border-gray-600 text-white px-4 py-1 rounded-lg outline-none focus:border-red-500 transition"
              />
              <button type="submit">
                <FaSearch className="text-white text-xl hover:text-red-500" />
              </button>
            </div>
          </form>

          {/* 🔥 AUTH UI */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-300 hidden lg:block">
                {user.user_metadata?.full_name || user.email}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-lg transition text-emerald-50 cursor-pointer"
              >
                Logout
              </button> 
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-1 rounded-lg transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU ICON */}
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

          {/* LINKS */}
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

          {/* SEARCH */}
          <form onSubmit={handleSearch}>
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                placeholder="Search Anime..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-black border border-gray-600 text-white px-4 py-2 rounded-lg outline-none focus:border-red-500"
              />
              <button type="submit">
                <FaSearch className="text-white text-xl hover:text-red-500" />
              </button>
            </div>
          </form>

          {/* 🔥 MOBILE AUTH */}
          <div className="flex flex-col gap-3 mt-4">
            {user ? (
              <button
                onClick={async () => {
                  await handleLogout();
                  setIsOpen(false);
                }}
                className="bg-red-600 text-white py-2 rounded-lg text-center"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="bg-red-600 text-white py-2 rounded-lg text-center"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="bg-red-600 text-white py-2 rounded-lg text-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

        </div>
      )}
    </nav>
  );
};

export default Navbar;