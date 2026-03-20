import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase-client";
import SuccessPopup from "./components/SuccessPopup";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  // ✅ EMAIL SIGNUP
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      setError("");
      setShowPopup(true);
    } catch (err) {
      setError("Something went wrong");
    }
  };

  // ✅ GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173", // change if needed
      },
    });

    if (error) {
      setError(error.message);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4 pt-10">
      {showPopup && <SuccessPopup onClose={handleClosePopup} />}

      <div
        className="w-full max-w-md bg-black/70 backdrop-blur-md p-8 rounded-2xl border
       border-red-600/60 shadow-[0_0_30px_rgba(255,0,0,0.5)] h-135 "
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create <span className="text-red-600">Account</span>
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-black border border-gray-600 p-3 rounded-lg"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black border border-gray-600 p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-black border border-gray-600 p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-black border border-gray-600 p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-red-600 p-3 rounded-lg cursor-pointer hover:bg-red-700 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="pt-2">
          <div className="flex items-center">
            <div className="grow h-px bg-linear-to-r from-transparent via-gray-400 to-transparent"></div>
            <span className="mx-4 text-gray-400">OR</span>
            <div className="grow h-px bg-linear-to-r from-transparent via-gray-400 to-transparent"></div>
          </div>
        </div>

        <div className="pt-3 ">
          <div className="">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white p-3 rounded-xl cursor-pointer transition-all duration-200 group"
            >
              <FcGoogle size={22} />
              <span className="text-sm font-medium tracking-wide">
                Signup with Google
              </span>
            </button>
            <p className="text-sm text-gray-400 mt-2 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-red-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
