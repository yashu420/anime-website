import React from "react";
import tanjiro from "../assets/tanjiro.mp4";
import Cards from "./Cards";
import Reveal from "./Reveal";
import Lottie from "lottie-react";
import Light from "../assets/Light.json";
import Rocket from "../assets/Startup.json";
import download from "../assets/Download.json";
import { FaPlayCircle } from "react-icons/fa";
import FeaturedCollections from "./FeaturedCollections";
import PopularChar from "./PopularChar"

const Index = () => {
  return (
    <div className="w-full overflow-hidden h-500 bg-black/90">
      {/* 🔥 HERO SECTION */}
      <div className="relative w-full h-220">
        {/* Background Video */}
        <video
          src={tanjiro}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center  ">
          {/* Content */}
          <div className="text-center px-6 md:px-22  max-w-5xl pb-9">
            <div className="  ">
              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold  font-['Orbitron']">
                Watch <span className="text-red-600">Anime</span>
              </h1>

              <p className="text-white mt-4 text-base sm:text-lg md:text-xl ">
                Stream the best anime shows
              </p>

              {/* Features */}
              <div className="flex flex-wrap justify-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <Lottie animationData={Light} loop autoplay className="w-6" />
                  <span className="text-white text-sm md:text-base">
                    HD Streaming
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Lottie
                    animationData={Rocket}
                    loop
                    autoplay
                    className="w-6"
                  />
                  <span className="text-white text-sm md:text-base">
                    Trending Anime
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Lottie
                    animationData={download}
                    loop
                    autoplay
                    className="w-6"
                  />
                  <span className="text-white text-sm md:text-base">
                    Unlimited Downloads
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <button
                  className="text-white bg-red-600 hover:bg-red-700 
                transition duration-300 cursor-pointer 
                rounded-2xl py-2 px-6 flex items-center
                hover:shadow-[0_0_20px_rgba(255,0,0,0.8)]"
                
                >
                  Watch Now
                  <span className="ml-2 text-xl">
                    <FaPlayCircle />
                  </span>
                </button>

                <button
                  className="text-white bg-red-600 hover:bg-red-700 
                transition duration-300 cursor-pointer 
                rounded-2xl py-2 px-7
                hover:shadow-[0_0_20px_rgba(255,0,0,0.8)]"
                >
                  Explore Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 CONTENT SECTION */}
      <div className="relative w-full pt-16 h-70">
        <Reveal>
          <Cards />
          <FeaturedCollections/>
          
        </Reveal>
      </div>
    </div>
  );
};

export default Index;
