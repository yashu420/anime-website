import React from "react";
import Aurora from "../reactBits/Aurora";

const Contact = () => {
  return (
    <section className="relative min-h-screen bg-black text-white flex items-center px-6 py-20 overflow-hidden ">
      <div className="absolute inset-0 pointer-events-none ">
        <Aurora
          colorStops={["#01f48b", "#fb00ff", "#5227FF"]}
          blend={0.5}
          amplitude={1.0}
          speed={1}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get in <span className="text-purple-400">Touch</span>
            </h2>

            <p className="text-gray-200 text-lg leading-relaxed mb-8">
              Have a question, feedback, or business inquiry? We’d love to hear
              from you. Reach out and our team will get back to you as soon as
              possible.
            </p>

            <div className="space-y-4 text-gray-300">
              <p>📧 arushsharmaoffical@gmail.com</p>
              <p>📍 India</p>
              <p>⏰ 24/7 Support</p>
            </div>
          </div>

          <div className="bg-[#0f172a]/10 backdrop-blur-2xl border border-white/10 p-8 rounded-2xl shadow-xl hover:shadow-purple-500/20 transition">
            <form className="space-y-6">
              <div>
                <label className="block mb-1 text-gray-200">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg
        bg-black/50 border border-white/10
        text-white placeholder-gray-400
        outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-200">Email</label>
                <input
                  type="email"
                  placeholder="Enter your Email here"
                  className="w-full px-4 py-3 rounded-lg
        bg-black/50 border border-white/10
        text-white placeholder-gray-400
        outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-200">Message</label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 rounded-lg
        bg-black/50 border border-white/10
        text-white placeholder-gray-400
        outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition font-semibold
       text-white cursor-pointer hover:shadow-[0_0_20px_rgba(128,0,255,0.6)]
"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
