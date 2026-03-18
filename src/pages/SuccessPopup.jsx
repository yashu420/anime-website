import React from "react";
import Lottie from "lottie-react";
import successAnimation from "../assets/Success.json";
import ShinyText from "../reactBits/ShinyText";

const SuccessPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center">
      
      {/* 🎬 Background animation */}
      <Lottie
        animationData={successAnimation}
        loop={false}
        autoplay={true}
        className="absolute inset-0 w-full h-full opacity-30"
      />

      {/* 🔥 Glow Border */}
     <div className="relative p-[2px] rounded-3xl bg-gradient-to-r from-red-600 via-pink-500 to-red-600 shadow-[0_0_40px_rgba(255,0,0,0.6)]">
        
        {/* Card */}
        <div className="bg-black/80 backdrop-blur-xl rounded-3xl px-10 py-10 text-center w-[350px] md:w-[420px] border border-red-600/40 ">
          
          {/* 🎉 Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-wide font-serif pr-6">
            🎉Account <span className="text-red-500 pl-9">Created</span>
          </h1>

          {/* ✨ Message */}
          <p className="mb-6 text-sm md:text-base font-semibold  ">
            <ShinyText
              text="You're now part of AnimeHub. Let the journey begin 🔥"
              speed={3}
              color="#ffffff"
              shineColor="#ff0000"
              spread={120}
              direction="left"
            />
          </p>

          {/* 🚀 Button */}
          <button
            onClick={onClose}
            className="relative bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition duration-300 
            shadow-[0_0_20px_rgba(255,0,0,0.8)] hover:shadow-[0_0_35px_rgba(255,0,0,1)] cursor-pointer font-['Orbitron']  "
          >
            🚀 Go to Login
          </button>

        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;