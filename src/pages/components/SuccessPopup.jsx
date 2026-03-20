import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "./animation/animation.json";
const SuccessPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-[9999] ">
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-black border border-red-600/70 text-white p-8 rounded-2xl 
        shadow-[0_0_40px_rgba(255,0,0,0.5)] text-center w-[420px]"
      >
        
        {/* 🔴 Icon */}
        <div className="flex justify-center mb-4">
          <div className="">
            <span className="text-2xl">  <div className="w-50">
      <Lottie animationData={animationData} 
      />
    </div></span>
          </div>
        </div>

        {/* 🔥 Title */}
        <h2 className="text-2xl font-bold mb-2">
          Verify Your <span className="text-red-500">Account</span>
        </h2>

        {/* 📩 Message */}
        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
          We’ve sent a verification link to your email.  
          Please check your inbox to activate your account.
        </p>

        {/* ✅ Button */}
        <button
          onClick={onClose}
          className="w-full bg-red-600 hover:bg-red-700 
          py-2.5 rounded-lg transition duration-200 
          font-medium shadow-[0_0_15px_rgba(255,0,0,0.6)] cursor-pointer"
        >
          Continue to Login →
        </button>

        {/* ✨ Extra hint */}
        <p className="text-xs text-gray-500 mt-4">
          Didn’t get the  email? Check spam folder.
        </p>

      </motion.div>
    </div>
  );
};

export default SuccessPopup;