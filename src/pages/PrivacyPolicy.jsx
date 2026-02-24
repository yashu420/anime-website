import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="h-120  bg-black text-white  flex justify-center items-center px-4">
      
      <div className="max-w-3xl text-center">
        
        <h1 className="text-5xl font-bold mb-6 text-red-600  ">
          Privacy Policy
        </h1>

        <p className="mb-4 text-gray-300 mt-9">
          We respect your privacy. This website does not collect personal
          information without your consent.
        </p>

        <p className="mb-4 text-gray-300">
          We use third-party APIs like Jikan to fetch anime data. We do not
          store your personal data.
        </p>

        <p className="text-gray-400">
          If you have any concerns, contact us at  <span className="text-red-700 cursor-pointer hover:underline ">support@animehub.com</span>
        </p>

      </div>
    </div>
  );
};

export default PrivacyPolicy;