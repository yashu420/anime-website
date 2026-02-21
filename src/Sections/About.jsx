import React from "react";
import Particles from "../reactBits/Particles";
import AnimeAccordion from "./Acordian";


const About = () => {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      <section className="relative z-10    px-6 flex items-center text-white pt-30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Anime <span className="text-red-700"> Hub</span>
          </h2>

          <p className="text-gray-200 max-w-3xl mx-auto text-lg leading-relaxed mb-16">
            Stream the world’s best anime anytime, anywhere. Discover trending
            series, top-rated masterpieces, and endless adventures —{" "}
            <span className="text-purple-400">all in one place.</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-[#0f172a]/80 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:scale-105 transition">
              <h3 className="text-xl font-semibold mb-3 text-purple-400">
                Unlimited Streaming
              </h3>
              <p className="text-gray-300">
                Enjoy thousands of animes and episodes with no limits.
              </p>
            </div>

            <div className="bg-[#0f172a]/80 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:scale-105 transition">
              <h3 className="text-xl font-semibold mb-3 text-purple-400">
                Latest & Trending
              </h3>
              <p className="text-gray-300">
                Stay updated with newest releases and exclusive content.
              </p>
            </div>

            <div className="bg-[#0f172a]/80 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:scale-105 transition">
              <h3 className="text-xl font-semibold mb-3 text-purple-400">
                Watch Anywhere
              </h3>
              <p className="text-gray-300">
                Stream on mobile, tablet, laptop, or TV.
              </p>
            </div>
          </div>
          
          <AnimeAccordion />
        </div>
      </section>
    </div>
  );
};

export default About;
