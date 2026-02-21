import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PopularChar = () => {
  const [characters, setCharacters] = useState([]);
  const [index, setIndex] = useState(0);
  const cardsPerView = 6;

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/characters")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.data);
      })
      .catch((err) => console.log(err));
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
    <div className="px-10 mt-10 relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-white text-3xl font-bold">Popular Characters</h1>
        <button className="text-white hover:text-red-500 transition">
          See All →
        </button>
      </div>

      <div className="relative">
        {index > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 bg-black/70 p-3 rounded-full hover:bg-red-600 transition"
          >
            <ChevronLeft className="text-white" size={28} />
          </button>
        )}

        <div className="grid grid-cols-6 gap-6">
          {visibleCards.map((char) => (
            <div
              key={char.mal_id}
              className="bg-black rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300 cursor-pointer group"
            >
              <div className="relative h-[240px] overflow-hidden">
                <img
                  src={char.images.jpg.image_url}
                  alt={char.name}
                  className="w-full h-full object-cover group-hover:opacity-80 transition"
                />

                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  ❤️ {char.favorites}
                </div>
              </div>

              <div className="">
                <div className="ml-7 mt-2">
                  <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">
                    {char.name}
                  </h3>
                </div>

                {char.anime && char.anime.length > 0
                  ? char.anime[0].name
                  : "No Anime"}
              </div>
            </div>
          ))}
        </div>

        {index < characters.length - cardsPerView && (
          <button
            onClick={nextSlide}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 bg-black/70 p-3 
            rounded-full hover:bg-red-600 transition"
          >
            <ChevronRight className="text-white" size={28} />
          </button>
        )}
      </div>
    </div>
  );
};

export default PopularChar;
