import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase-client";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
 
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
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setError("Please fill all fields");
    return;
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // ✅ success
    setError("");
    navigate("/");

  } catch (err) {
    setError("Something went wrong");
  }
};

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      <div className="relative w-full max-w-md  p-8 rounded-2xl border border-red-600/60 mt-9 shadow-[0_0_30px_rgba(255,0,0,0.5)] 
  ">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Login to <span className="text-red-600">AnimeHub</span>
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black border border-gray-600 p-3 rounded-lg outline-none focus:border-red-600 transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-black border border-gray-600 p-3 rounded-lg outline-none focus:border-red-600 transition"
          />

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 transition p-3 rounded-lg font-semibold  cursor-pointer"
          >
            Login
          </button>
        </form>
              <div className="pt-2">
          <div className="flex items-center">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            <span className="mx-4 text-gray-400">OR</span>
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
          </div>
        </div>



        <div className="pt-2">
          <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white p-3 rounded-xl cursor-pointer transition-all duration-200 group"
            >
              <FcGoogle size={22} />
              <span className="text-sm font-medium tracking-wide">
                Continue with Google
              </span>
            </button>
        </div>
        <p className="text-sm text-gray-400 pt-2 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-500 hover:underline">
            Sign Up
          </Link>
        </p>
        
      </div>
    </div>
  );
};

export default Login;
