import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SliderButton from "../pages/UI/Buttons";

const TopRatedSection = ({ animeList }) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const cardsPerView = 7; // 🔥 Increased
  const maxIndex = animeList.length - cardsPerView;

  const nextSlide = () => {
    if (index < maxIndex) {
      setIndex(index + 3);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 3);
    }
  };

  return (
    <div className="px-10 py-14 pb-4">
      <h2 className="text-3xl font-bold mb-5 text-red-600">
        ⭐ Top Rated Anime
      </h2>

      <div className="relative overflow-hidden">

        {index > 0 && (
          <SliderButton direction="left" onClick={prevSlide} />
        )}

        {index < maxIndex && (
          <SliderButton direction="right" onClick={nextSlide} />
        )}

        <div
          className="flex gap-3 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${index * (100 / cardsPerView)}%)`,
          }}
        >
          {animeList.map((animeItem, i) => (
            <div
              key={animeItem.malId}
              onClick={() => navigate(`/anime/${animeItem.malId}`)}
              className="relative bg-gray-900 rounded-xl overflow-hidden
              cursor-pointer hover:scale-105 transition duration-200
              hover:shadow-[0_0_20px_rgba(255,0,0,0.6)]
              flex-shrink-0 mt-5 mb-5"
              style={{ width: "calc(100% / 7 - 12px)" }} // 🔥 Smaller width
            >
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full z-10">
                #{i + 1}
              </div>

              <div className="aspect-[2/3] overflow-hidden">
                <img
                  src={animeItem.coverImage}
                  alt={animeItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-2   ">
                <h3 className="text-xs font-semibold line-clamp-1">
                  {animeItem.title}
                </h3>
                <p className="text-[10px] text-gray-400 mt-1">
                  ⭐ {animeItem.score || "N/A"} • {animeItem.episodes || "?"} eps
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopRatedSection;