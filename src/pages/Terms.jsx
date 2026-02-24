import React from "react";

const Terms = () => {
  return (
    <div className="min-h-screen mb-0 bg-black text-white pt-20 px-4 flex justify-center">
      
      <div className="max-w-3xl w-full pt-3">
        
        <h1 className="text-3xl font-bold mb-8 text-red-600 text-center underline">
          Terms & Conditions
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-white">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-300">
            By accessing and using AnimeHub, you accept and agree to be bound 
            by the terms and conditions of this agreement.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-white">
            2. Use of Content
          </h2>
          <p className="text-gray-300">
            All anime data displayed on this website is fetched from 
            third-party APIs such as Jikan. We do not own or host any 
            copyrighted content.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-white">
            3. User Accounts
          </h2>
          <p className="text-gray-300">
            If you create an account, you are responsible for maintaining 
            the confidentiality of your login information.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-white">
            4. Limitation of Liability
          </h2>
          <p className="text-gray-300">
            AnimeHub shall not be liable for any direct or indirect damages 
            arising from the use of this website.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2 text-white">
            5. Changes to Terms
          </h2>
          <p className="text-gray-300">
            We reserve the right to modify these terms at any time. Continued 
            use of the website means you accept any updates.
          </p>
        </section>

      

      </div>
    </div>
  );
};

export default Terms;