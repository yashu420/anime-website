import React from "react";
import bgImg from "../assets/bg.jpg";
import tanjiro from "../assets/tanjiro.mp4";
import Cards from "./Cards";
import Reveal from "./Reveal";
import PopularChar from "./PopularChar";
import Lottie from "lottie-react";
import Light from "../assets/Light.json";
import Rocket from "../assets/Startup.json";
import download from "../assets/Download.json";
import { FaPlayCircle } from "react-icons/fa";
const Index = () => {
  return (
    <div>
     
      <div className="relative ">
        <video
          src={tanjiro}
          autoPlay
          loop
          muted
          playsInline
          className="w-400 h-180 object-cover"
        ></video>

        <div
          className="absolute inset-0 bg-black/50 h-190  w-190 flex   
    "
        >
          <div className="  p-20 pt-60 pl-30 ">
            <h1 className="text-white text-7xl font-bold  justify-center flex">
              Watch <span className="text-red-600 pl-4">Anime</span>
            </h1>
            <div className="pt-3 mx-20 mb-2 m-4 text-xl  justify-center flex mt-0">
              <p className="text-white ">Streams the best anime shows</p>
            </div>
            <div className="flex gap-6 ml-8 ">
              <div className="flex items-center gap-2 mb-4 mt-4 justify-center ">
                <Lottie
                  animationData={Light}
                  loop
                  autoplay
                  className="w-6 mt-1 "
                />
                <h1 className="text-white">
                  {" "}
                  <span className="pl-3">HD</span> Streaming
                </h1>
              </div>

              <div className="flex items-center gap-2  justify-center ">
                <Lottie
                  animationData={Rocket}
                  loop
                  autoplay
                  className="w-6 mt-1"
                />
                <h1 className="text-white">Trending Anime</h1>
              </div>

              <div className="flex items-center gap-2">
                <Lottie
                  animationData={download}
                  loop
                  autoplay
                  className="w-6 mt-1"
                />
                <h1 className="text-white">Unlimited Downloads</h1>
              </div>
            </div>

            <div className="pt-3 mx-18 flex gap-4  justify-center  ">
              <button
                className="text-white bg-red-600 hover:bg-red-700 
  transition duration-300 cursor-pointer 
  rounded-2xl py-2 px-6 flex items-center
  hover:shadow-[0_0_20px_rgba(255,0,0,0.8)]"
              >
                Watch Now
                <div className="pt-0.5 pl-2 text-xl">
                  <FaPlayCircle />
                </div>
              </button>

              <div className=" justify-center flex">
                <div className="div"></div>
                <button
                  className="text-white bg-red-600 hover:bg-red-700 
  transition duration-300 cursor-pointer 
  rounded-2xl py-2 px-7 flex items-center
  hover:shadow-[0_0_20px_rgba(255,0,0,0.8)]"
                >
                   Explore Now{" "}
                </button> 
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="relative w-full h-320   bg-cover bg-center "
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <Reveal>
          <Cards />
          <PopularChar />
        </Reveal>
      </div>{" "}
      
    </div>
  );
};

export default Index;
