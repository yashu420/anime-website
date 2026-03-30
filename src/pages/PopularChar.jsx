import React, { useEffect, useState } from "react";
import SliderButton from "../pages/UI/Buttons";

const PopularChar = () => {
  const [characters, setCharacters] = useState([]);
  const [index, setIndex] = useState(0);
  const cardsPerView = 6;

  useEffect(() => {
    const fetchPopularChars = async (retryCount = 0) => {
      try {
        const res = await fetch("https://api.jikan.moe/v4/top/characters");
        if (res.status === 429) {
          if (retryCount < 5) {
            console.warn(`Rate limited for popular chars... retrying`);
            setTimeout(() => fetchPopularChars(retryCount + 1), 1500 * (retryCount + 1));
          }
          return;
        }
        const data = await res.json();
        setCharacters(data.data);
      } catch (err) {
        console.log("Popular Characters fetch failed:", err);
      }
    };
    fetchPopularChars();
  }, []);

  const nextSlide = () => {
    if (index < characters.length - cardsPerView) {
      setIndex(index + cardsPerView);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - cardsPerView);
    }
  };

  const visibleCards = characters.slice(index, index + cardsPerView);

  return (
    <div className="px-10  relative">
  
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-white text-3xl font-bold">Popular Characters</h1>
        <button className="text-white hover:text-red-500 transition">
          See All →
        </button>
      </div>

  
      <div className="relative">
        {index > 0 && <SliderButton direction="left" onClick={prevSlide} />}

        <div className="grid grid-cols-6 gap-6">
          {visibleCards.map((char) => (
            <div
              key={char.mal_id}
              className="bg-black rounded-xl overflow-hidden shadow-lg 
              hover:scale-105 transition duration-300 cursor-pointer group"
            >
              <div className="relative h-[240px] overflow-hidden">
                <img
                  src={char.images.jpg.image_url}
                  alt={char.name}
                  className="w-full h-full object-cover 
                  group-hover:opacity-80 transition"
                />

                <div
                  className="absolute top-2 left-2 
                bg-red-600 text-white text-xs 
                font-bold px-2 py-1 rounded"
                >
                  ❤️ {char.favorites}
                </div>
              </div>

              <div className="p-3">
                <h3
                  className="text-white font-semibold text-sm 
                mb-1 line-clamp-1"
                >
                  {char.name}
                </h3>

                
              </div>
            </div>
          ))}
        </div>

        {index < characters.length - cardsPerView && (
          <SliderButton direction="right" onClick={nextSlide} />
        )}
      </div>
    </div>
  );
};

export default PopularChar;
