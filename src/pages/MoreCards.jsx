import React, { useState, useEffect } from "react";
import animeData from "../assets/Cards.json";
import SliderButton from "./UI/Buttons";

const MoreCards = () => {
  const cardsPerView = 6;
  const [index, setIndex] = useState(0);
  const [shuffledData, setShuffledData] = useState([]);

  useEffect(() => {
    const shuffled = [...animeData].sort(() => Math.random() - 0.5);
    setShuffledData(shuffled);
  }, []);

  const nextSlide = () => {
    if (index < shuffledData.length - cardsPerView) {
      setIndex(index + cardsPerView);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - cardsPerView);
    }
  };

  const visibleCards = shuffledData.slice(index, index + cardsPerView);

  return (
    <div className="relative">
      <h1 className="text-3xl font-bold mb-8 mt-8">
        Top Picks For You
      </h1>

      <div className="relative px-10">


        {index > 0 && (
          <SliderButton
            direction="left"
            onClick={prevSlide}
            className="left-0"
          />
        )}

        <div className="grid grid-cols-6 gap-6">
          {visibleCards.map((item) => (
            <div
              key={item.mal_id}
              className="rounded-xl overflow-hidden bg-gray-900 
              group cursor-pointer hover:scale-105 
              transition duration-300"
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

        {index < shuffledData.length - cardsPerView && (
          <SliderButton
            direction="right"
            onClick={nextSlide}
            className="right-0"
          />
        )}

      </div>
    </div>
  );
};

export default MoreCards;