import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TopRatedSection from "./TopRatedSection";
import AnimeOfTheYearSection from "./AnimeOfTheYearSection";
import TopPicksForYouSection from "./TopPicksForYouSection";

const TopRated = () => {
  const [animeList, setAnimeList] = useState([]);
  const [heroList, setHeroList] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
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
    const fetchTopRatedAnime = async () => {
      try {
        const query = `
          query {
            Page(page: 1, perPage: 25) {
              media(sort: SCORE_DESC, type: ANIME) {
                idMal
                title { english romaji }
                bannerImage
                coverImage { extraLarge }
                averageScore
                episodes
                duration
                description(asHtml: false)
              }
            }
          }
        `;

        const response = await axios.post("https://graphql.anilist.co", {
          query,
        });

        const formatted = response.data.data.Page.media
          .filter((item) => item.idMal)
          .map((item) => ({
            malId: item.idMal,
            title: item.title.english || item.title.romaji,
            bannerImage: item.bannerImage,
            coverImage: item.coverImage.extraLarge,
            score: item.averageScore,
            episodes: item.episodes,
            duration: item.duration,
            description:
              item.description?.replace(/<[^>]+>/g, "").replace(/~!|!~/g, "") ||
              "",
          }));

        // Grid stays sorted
        const sorted = [...formatted].sort(
          (a, b) => (b.score || 0) - (a.score || 0),
        );

        setAnimeList(sorted);

        // Hero shuffled (only first 6 for performance)
        const shuffled = shuffleArray(sorted).slice(0, 6);
        setHeroList(shuffled);
      } catch (error) {
        console.error("AniList Fetch Error:", error);
      }
    };

    fetchTopRatedAnime();
  }, []);

  // 🔥 Auto slider
  useEffect(() => {
    if (!heroList.length) return;

    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroList]);

  if (!animeList.length || !heroList.length) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Loading Top Rated Anime...
      </div>
    );
  }

  const currentAnime = heroList[currentSlideIndex];

  return (
    <div className="bg-black text-white h-540 pt-17">
      {/* 🔥 HERO SECTION (SHUFFLED) */}
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
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

            <div className="relative z-20 h-full flex flex-col justify-center px-16 max-w-2xl space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold font-['Orbitron']">{anime.title}</h1>

              <p className="text-gray-300 line-clamp-5 mt-4">
                {anime.description}
              </p>

              <p className="text-sm text-gray-400">
                ⭐ {anime.score || "N/A"} • {anime.episodes || "?"} eps •{" "}
                {anime.duration || "?"} min
              </p>

              <button
                onClick={() => navigate(`/anime/${anime.malId}`)}
                className="bg-red-600 px-6 py-3 rounded-xl 
          hover:bg-red-700 hover:shadow-[0_0_20px_rgba(255,0,0,0.7)] 
          transition w-fit cursor-pointer"
              >
                Watch Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <TopRatedSection animeList={animeList} />
      <AnimeOfTheYearSection animeList={animeList} />
      <TopPicksForYouSection/>
    </div>
  );
};

export default TopRated;
