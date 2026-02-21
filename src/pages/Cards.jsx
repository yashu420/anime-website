import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import animeData from "../assets/Cards.json";

const Cards = () => {
  const cardsPerView = 6;
  const [index, setIndex] = useState(0);

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
    <div className="px-8 relative">
      <div className="flex justify-between items-center mb-6 ">
        <h1 className="text-white text-3xl font-bold pt-6">Trending Anime</h1>
        <button className="text-white hover:text-red-500 transition">
          See All →
        </button>
      </div>

      <div className="relative">
        {index > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 p-3 rounded-full hover:bg-red-600 transition"
          >
            <ChevronLeft className="text-white" size={28} />
          </button>
        )}
        <div className="grid grid-cols-6 gap-6">
          {visibleCards.map((item) => (
            <div
              key={item.mal_id}
              className="rounded-xl overflow-hidden bg-black group cursor-pointer hover:scale-105 transition duration-300"
            >
              <div className="h-[220px] overflow-hidden">
                <img
                  src={item.images.jpg.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3">
                <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-xs mb-1">
                  ⭐ {item.score} • {item.type}
                </p>

                <p className="text-gray-500 text-xs line-clamp-1">
                  {item.genres.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>

        {index < animeData.length - cardsPerView && (
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 p-3 rounded-full hover:bg-red-600 transition"
          >
            <ChevronRight className="text-white" size={28} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Cards;
