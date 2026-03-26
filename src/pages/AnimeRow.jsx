import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnimeRowSkeleton from "../pages/components/loaders/AnimeRowSkeleton";

const AnimeRow = ({ title, apiUrl, showScore = true }) => {
  const [animeList, setAnimeList] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const cardsPerView = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        await new Promise((res) => setTimeout(res, 1000));

        const res = await fetch(apiUrl);

        // handle rate limit
        if (res.status === 429) {
          console.warn("Rate limited... retrying");
          setTimeout(fetchData, 1500);
          return;
        }

        if (!res.ok) {
          console.log("API Error:", res.status);
          setLoading(false);
          return;
        }

        const data = await res.json();

        if (!data || !Array.isArray(data.data)) {
          console.log("Invalid API response:", data);
          setLoading(false);
          return;
        }

        const limited = data.data.slice(0, 20);
        const shuffled = [...limited].sort(() => Math.random() - 0.5);

        setAnimeList(shuffled);
        setLoading(false);

      } catch (err) {
        console.log("Fetch failed:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  const nextSlide = () => {
    if (index < animeList.length - cardsPerView) {
      setIndex(index + cardsPerView);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - cardsPerView);
    }
  };

  const visibleCards = animeList.slice(index, index + cardsPerView);

  // ✅ Only addition (no CSS touched)
  if (loading) return <AnimeRowSkeleton />;

  return (
    <div className="mt-8 relative">
      
      <div className="flex justify-between items-center mb-8 px-10 pl-0">
        <h1 className="text-white text-3xl font-bold">
          {title}
        </h1>
      </div>

      <div className="relative px-10">

        {index > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 
            z-50 bg-black/70 p-3 rounded-full 
            hover:bg-red-600 transition duration-300"
          >
            <ChevronLeft className="text-white" size={28} />
          </button>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {visibleCards.map((anime) => (
            <div
              key={anime.mal_id}
              onClick={() => navigate(`/anime/${anime.mal_id}`)}
              className="bg-gray-900 rounded-xl overflow-hidden 
              shadow-lg hover:scale-105 transition duration-300 
              group"
            >
              <div className="relative h-[240px] overflow-hidden">
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="w-full h-full object-cover 
                  group-hover:opacity-80 transition"
                />

                {showScore && (
                  <div className="absolute top-2 left-2 
                  bg-red-600 text-white text-xs 
                  font-bold px-2 py-1 rounded">
                    ⭐ {anime.score || "N/A"}
                  </div>
                )}
              </div>

              <div className="px-3 py-3">
                <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">
                  {anime.title}
                </h3>

                <p className="text-gray-400 text-xs line-clamp-1">
                  {anime.type} • {anime.episodes || "?"} eps
                </p>
              </div>
            </div>
          ))}
        </div>

        {index < animeList.length - cardsPerView && (
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 
            z-50 bg-black/70 p-3 rounded-full 
            hover:bg-red-600 transition duration-300 cursor-pointer"
          >
            <ChevronRight className="text-white" size={28} />
          </button>
        )}
      </div>
    </div>
  );
};

export default AnimeRow;