import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import successAnimation from "../assets/Success.json";
import Lottie from "lottie-react";
import ShinyText from "../reactBits/ShinyText";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    console.log("Signup Data:", { name, email, password });

    setError("");
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4  ">
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <Lottie
            animationData={successAnimation}
            loop={false}
            autoplay={true}
            className="absolute inset-0 w-full h-full "
          />

          <div className="relative p-[3px] rounded-3xl border-3 backdrop-blur-sm border-red-700 shadow-[0_0_25px_rgba(255,0,0,0.8)]">
            <div className="  bg-black/40   rounded-3xl px-8 py-10 text-center w-[350px] md:w-[450px] ">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                🎉 SignUp <span className="text-red-600">Completed</span>
              </h1>

              <p className=" mb-4  font-bold text-md">
                <ShinyText
                  text="Your account has been created successfully."
                  speed={3}
                  delay={0}
                  color="#ffffff"
                  shineColor="#ff0000 "
                  spread={150}
                  direction="left"
                  yoyo={false}
                  pauseOnHover={false}
                  disabled={false}
                  className="text-md"
                />
              </p>

              <button
                onClick={handleClosePopup}
                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition duration-300 hover:shadow-[0_0_25px_rgba(255,0,0,0.8)] hover:cursor-pointer"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-black/70 backdrop-blur-md p-8 rounded-2xl   border border-red-600/60 shadow-[0_0_30px_rgba(255,0,0,0.5)]">
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
            className="bg-black border border-gray-600 p-3 rounded-lg outline-none focus:border-red-600 transition"
          />

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

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-black border border-gray-600 p-3 rounded-lg outline-none focus:border-red-700  transition"
          />

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 transition p-3 rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(255,0,0,0.8)] cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
