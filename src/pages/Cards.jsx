import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import animeData from "../assets/Cards.json";

const Cards = () => {
  const [index, setIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(6);

  // 🔥 Responsive cards count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(2);
      } else if (window.innerWidth < 768) {
        setCardsPerView(3);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(4);
      } else if (window.innerWidth < 1280) {
        setCardsPerView(5);
      } else {
        setCardsPerView(6);
      }

      setIndex(0); // reset on resize
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (index < animeData.length - cardsPerView) {
      setIndex(index + cardsPerView);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - cardsPerView);
    }
  };

  const visibleCards = animeData.slice(index, index + cardsPerView);

  return (
    <div className="px-4 md:px-8 relative bottom-30 md:bottom-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white text-xl md:text-3xl font-bold pt-6">
          Trending Anime
        </h1>
        <button className="text-white text-sm md:text-base hover:text-red-500 transition">
          See All →
        </button>
      </div>

      <div className="relative">
        {index > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 p-2 md:p-3 rounded-full hover:bg-red-600 transition"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
        )}

        {/* Responsive Grid */}
        <div
          className=" 
            grid 
            grid-cols-2 
            sm:grid-cols-3 
            md:grid-cols-4 
            lg:grid-cols-5 
            xl:grid-cols-6 
            gap-4 md:gap-6
          "
        >
          {visibleCards.map((item) => (
            <div
              key={item.mal_id}
              className="rounded-xl overflow-hidden bg-black/20 group cursor-pointer hover:scale-105 transition duration-300 hover:shadow-[0_0_10px_rgba(255,0,0,0.8)]"
            >
              <div className="h-[180px] sm:h-[200px] md:h-[220px] overflow-hidden">
                <img
                  src={item.images.jpg.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3">
                <h3 className="text-gray-100 font-semibold text-sm mb-1 line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-xs mb-1">
                  ⭐ {item.score} • {item.type}
                </p>

                <p className="text-gray-400 text-xs line-clamp-1">
                  {item.genres.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>

        {index < animeData.length - cardsPerView && (
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 p-2 md:p-3 rounded-full hover:bg-red-600 transition"
          >
            <ChevronRight className="text-white" size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Cards;
