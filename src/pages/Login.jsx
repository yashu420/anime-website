import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    if (email === "admin@gmail.com" && password === "123456") {
      navigate("/");
    } else {
      setError("Invalid credentials");
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
            className="bg-red-600 hover:bg-red-700 transition p-3 rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(255,0,0,0.8)] cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-6 text-center">
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
