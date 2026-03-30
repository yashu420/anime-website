import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SliderButton from "../UI/Buttons";

// Helper hook for responsive cards
function useCardsPerView() {
  const [cardsPerView, setCardsPerView] = useState(7);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setCardsPerView(7);
      else if (window.innerWidth >= 1024) setCardsPerView(5);
      else if (window.innerWidth >= 768) setCardsPerView(4);
      else if (window.innerWidth >= 640) setCardsPerView(3);
      else setCardsPerView(2); // Mobile view
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return cardsPerView;
}

// 💀 Loading Skeleton
const LoadingSkeleton = () => {
  const cardsPerView = useCardsPerView();

  return (
    <div className="bg-[#020617] min-h-screen pt-17 pb-10">
      {/* Hero Skeleton */}
      <div className="relative h-[90vh] w-full bg-[#070b14] animate-pulse overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent" />
        <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-16 max-w-2xl space-y-4">
          <div className="h-16 bg-white/10 rounded-lg w-3/4 mb-4"></div>
          <div className="h-4 bg-white/5 rounded w-full mb-2"></div>
          <div className="h-4 bg-white/5 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-white/5 rounded w-4/6 mb-6"></div>
          <div className="flex gap-3 mt-4">
            <div className="h-8 w-20 bg-white/10 rounded-lg"></div>
            <div className="h-8 w-20 bg-white/10 rounded-lg"></div>
            <div className="h-8 w-20 bg-white/10 rounded-lg"></div>
          </div>
          <div className="h-12 w-40 bg-white/10 rounded-xl mt-6"></div>
        </div>
      </div>

      {/* Rows Skeletons */}
      <div className="mt-4 space-y-8 px-6 md:px-10 relative z-20">
        {[1, 2, 3].map((row) => (
          <div key={row}>
            <div className="h-8 bg-white/10 rounded-md w-48 mb-6 animate-pulse"></div>
            <div className="flex gap-3 overflow-hidden">
              {Array.from({ length: cardsPerView }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white/5 rounded-xl animate-pulse flex-shrink-0 aspect-[2/3] border border-white/5"
                  style={{ width: `calc(100% / ${cardsPerView} - 12px)` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Internal Component for sliding horizontal lists mimicking TopRatedSection
const HorizontalSlider = ({ title, animeList, icon }) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const cardsPerView = useCardsPerView();

  const maxIndex = Math.max(0, animeList.length - cardsPerView);

  // Auto-correct index if resizing window shrinks maxIndex
  useEffect(() => {
    if (index > maxIndex) setIndex(Math.max(0, maxIndex));
  }, [maxIndex, index]);

  const nextSlide = () => {
    if (index < maxIndex) setIndex(Math.min(maxIndex, index + 3));
  };

  const prevSlide = () => {
    if (index > 0) setIndex(Math.max(0, index - 3));
  };

  if (!animeList || animeList.length === 0) return null;

  return (
    <div className="px-6 md:px-10 pt-6 pb-2">
      <h2 className="text-2xl md:text-3xl font-bold mb-5 text-red-600 flex items-center gap-3 drop-shadow-md w-fit">
        <span className="text-white drop-shadow-none">{icon}</span> {title}
      </h2>

      <div className="relative overflow-hidden group/slider">
        {index > 0 && <SliderButton direction="left" onClick={prevSlide} />}
        {index < maxIndex && <SliderButton direction="right" onClick={nextSlide} />}

        <div
          className="flex gap-3 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * (100 / cardsPerView)}%)` }}
        >
          {animeList.map((animeItem, i) => (
            <div
              key={animeItem.malId}
              onClick={() => navigate(`/anime/${animeItem.malId}`)}
              className="relative bg-[#020617] rounded-xl overflow-hidden    hover:-translate-y-2 transition duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] flex-shrink-0 mt-5 mb-5 border border-purple-500/20 hover:border-purple-400/60"
              style={{ width: `calc(100% / ${cardsPerView} - 12px)` }}
            >
              <div className="absolute  top-2 left-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 rounded-full z-10 shadow-lg border border-white/10">
                #{i + 1}
              </div>

              <div className="aspect-[2/3] overflow-hidden relative">
                <img
                  src={animeItem.coverImage}
                  alt={animeItem.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent opacity-90" />
              </div>

              <div className="absolute bottom-0 w-full p-2 md:p-3 z-20">
                <h3 className="text-[11px] md:text-sm font-bold line-clamp-1 text-white group-hover:text-purple-300 transition-colors">
                  {animeItem.title}
                </h3>
                <p className="text-[9px] md:text-[10px] text-purple-100/70 mt-1 font-medium tracking-wide">
                  <span className="text-yellow-400">★</span> {animeItem.score || "N/A"} • {animeItem.episodes || "?"} eps
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Popular = () => {
  const [lists, setLists] = useState({ popular: [], trending: [], favourites: [] });
  const [heroList, setHeroList] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔥 Professional Shuffle (Fisher-Yates)
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    const fetchAllPopularData = async (retryCount = 0) => {
      try {
        const query = `
          query {
            popular: Page(page: 1, perPage: 25) {
              media(sort: POPULARITY_DESC, type: ANIME) {
                idMal
                title { english romaji }
                bannerImage
                coverImage { extraLarge }
                averageScore
                episodes
                duration
                description(asHtml: false)
                format
              }
            }
            trending: Page(page: 1, perPage: 25) {
              media(sort: TRENDING_DESC, type: ANIME) {
                idMal
                title { english romaji }
                bannerImage
                coverImage { extraLarge }
                averageScore
                episodes
                duration
                description(asHtml: false)
                format
              }
            }
            favourites: Page(page: 1, perPage: 25) {
              media(sort: FAVOURITES_DESC, type: ANIME) {
                idMal
                title { english romaji }
                bannerImage
                coverImage { extraLarge }
                averageScore
                episodes
                duration
                description(asHtml: false)
                format
              }
            }
          }
        `;

        const response = await axios.post("https://graphql.anilist.co", { query });

        const formatData = (mediaList) => mediaList
          .filter((item) => item.idMal)
          .map((item) => ({
            malId: item.idMal,
            title: item.title.english || item.title.romaji,
            bannerImage: item.bannerImage,
            coverImage: item.coverImage.extraLarge,
            score: item.averageScore,
            episodes: item.episodes,
            duration: item.duration,
            description: item.description?.replace(/<[^>]+>/g, "").replace(/~!|!~/g, "") || "",
            format: item.format,
          }));

        const popularList = formatData(response.data.data.popular.media);
        const trendingList = formatData(response.data.data.trending.media);
        const favouritesList = formatData(response.data.data.favourites.media);

        setLists({
          popular: popularList,
          trending: trendingList,
          favourites: favouritesList
        });

        const shuffled = shuffleArray(popularList).slice(0, 6);
        setHeroList(shuffled);
      } catch (error) {
        console.error("AniList Fetch Error:", error);
        if (retryCount < 3) {
          setTimeout(() => fetchAllPopularData(retryCount + 1), 2000 * (retryCount + 1));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllPopularData();
  }, []);

  // 🔥 Auto slider
  useEffect(() => {
    if (!heroList.length) return;

    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroList]);

  // Use Beautiful Skeleton instead of blank spinner
  if (loading || !lists.popular.length || !heroList.length) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="bg-[#020617] text-white min-h-screen pt-17 pb-10">
      
      {/* 💜 HERO SECTION (SHUFFLED) */}
      <div className="relative h-[90vh] overflow-hidden">
        {heroList.map((anime, index) => (
          <div
            key={anime.malId}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              index === currentSlideIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{
              backgroundImage: `url(${anime.bannerImage || anime.coverImage})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent" />

            <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-16 max-w-2xl space-y-4">
              <h1 className="text-5xl md:text-6xl font-extrabold font-['Orbitron'] text-purple-50 drop-shadow-md">
                {anime.title}
              </h1>

              <p className="text-purple-50/70 line-clamp-5 mt-4 text-sm md:text-base leading-relaxed">
                {anime.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-[11px] md:text-sm font-semibold mt-4   ">
                <span className="flex items-center gap-1 bg-purple-900/60 px-2 md:px-3 py-1.5 rounded-lg backdrop-blur-md border border-purple-500/30 text-purple-300">
                  <span className="text-yellow-400">★</span> {anime.score || "N/A"}
                </span> 
                <span className="bg-fuchsia-900/40 px-2 md:px-3 py-1.5 rounded-lg backdrop-blur-md border border-fuchsia-500/30 text-fuchsia-200">
                  {anime.episodes || "?"} eps
                </span>
                <span className="bg-red-900/40 px-2 md:px-3 py-1.5 rounded-lg backdrop-blur-md border border-red-500/30 text-red-200">
                  {anime.duration || "?"} min
                </span>
              </div>

<div className="mt-2 ">
  <button
  onClick={() => navigate(`/anime/${anime.malId}`)}
  className="bg-red-700 px-4 py-3 rounded-xl 
          hover:bg-red-700 hover:shadow-[0_0_10px_rgba(255,0,0,0.7)] 
          transition w-fit cursor-pointer font-semibold"
>
  Watch Now
</button>
</div>
            
            </div>
          </div>
        ))}
      </div>

      {/* 🌊 HORIZONTAL SLIDING CONTENT SECTIONS */}
      <div className="mt-2 space-y-2 relative z-20">
        <HorizontalSlider 
          title="All-Time Popular" 
          animeList={lists.popular} 
          icon="🔥" 
        />
        <HorizontalSlider 
          title="Trending Now" 
          animeList={lists.trending} 
          icon="📈" 
        />
        <HorizontalSlider 
          title="Most Favorited" 
          animeList={lists.favourites} 
          icon="💖" 
        />
      </div>

    </div>
  );
};

export default Popular;
