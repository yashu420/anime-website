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
        shadow-[0_0_40px_rgba(255,0,0,0.5)] text-center w-[520px]"
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
        <h2 className="text-3xl font-bold mb-2">
          Verify Your <span className="text-red-500">Account</span>
        </h2>

        {/* 📩 Message */}
        <p className="text-sm text-gray-400  leading-relaxed">
          We’ve sent a verification link to your email.  
          Please check your inbox to activate your account.
        </p>

        {/* ✅ Button */}
       
      </motion.div>
    </div>
  );
};

export default SuccessPopup;