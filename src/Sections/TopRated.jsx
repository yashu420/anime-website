import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TopRated = () => {
  const [animeList, setAnimeList] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const navigate = useNavigate();

  // Shuffle function
  const shuffleAnime = (animeArray) => {
    return [...animeArray].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const fetchTopRatedAnime = async () => {
      try {
        const query = `
          query {
            Page(page: 1, perPage: 24) {
              media(sort: SCORE_DESC, type: ANIME) {
                idMal
                title {
                  english
                  romaji
                }
                bannerImage
                coverImage {
                  extraLarge
                }
                averageScore
                episodes
                duration
                description(asHtml: false)
              }
            }
          }
        `;

const response = await axios.post(
  "https://graphql.anilist.co",
  { query }
);
        const formattedAnimeList =
          response.data.data.Page.media
            .filter((animeItem) => animeItem.idMal)
            .map((animeItem) => ({
              malId: animeItem.idMal,
              title:
                animeItem.title.english ||
                animeItem.title.romaji,
              bannerImage: animeItem.bannerImage,
              coverImage:
                animeItem.coverImage.extraLarge,
              score: animeItem.averageScore,
              episodes: animeItem.episodes,
              duration: animeItem.duration,
              description: animeItem.description
                ?.replace(/<[^>]+>/g, "")
                .replace(/~!|!~/g, ""),
            }));

        setAnimeList(shuffleAnime(formattedAnimeList));
      } catch (error) {
        console.error("AniList Fetch Error:", error);
      }
    };

    fetchTopRatedAnime();
  }, []);

  // Auto slide logic
  useEffect(() => {
    if (!animeList.length) return;

    const sliderInterval = setInterval(() => {
      setCurrentSlideIndex((previousIndex) =>
        (previousIndex + 1) % animeList.length
      );
    }, 5000);

    return () => clearInterval(sliderInterval);
  }, [animeList]);

  if (!animeList.length) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Loading Top Rated Anime...
      </div>
    );
  }

  const currentAnime = animeList[currentSlideIndex];

  return (
    <div className="bg-black text-white min-h-screen pt-17">

      {/* 🔥 HERO SLIDER */}
      <div
        className="relative h-[90vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${currentAnime.bannerImage || currentAnime.coverImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-center px-16 max-w-2xl space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold">
            {currentAnime.title}
          </h1>

          <p className="text-gray-300 line-clamp-5 mt-4">
            {currentAnime.description}
          </p>

          <p className="text-sm text-gray-400">
            ⭐ {currentAnime.score || "N/A"} •{" "}
            {currentAnime.episodes || "?"} eps •{" "}
            {currentAnime.duration || "?"} min
          </p>

          <button
            onClick={() =>
              navigate(`/anime/${currentAnime.malId}`)
            }
            className="bg-red-600 px-6 py-3 rounded-xl 
            hover:bg-red-700 hover:shadow-[0_0_20px_rgba(255,0,0,0.7)] 
            transition w-fit"
          >
            Watch Now
          </button>
        </div>
      </div>

      {/* 🔥 GRID SECTION */}
      <div className="px-10 py-14">
        <h2 className="text-3xl font-bold mb-10 text-red-600">
          ⭐ Top Rated Anime
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {animeList.map((animeItem, index) => (
            <div
              key={animeItem.malId}
              onClick={() =>
                navigate(`/anime/${animeItem.malId}`)
              }
              className="relative bg-gray-900 rounded-xl overflow-hidden 
              cursor-pointer hover:scale-105 transition duration-200 
              hover:shadow-[0_0_20px_rgba(255,0,0,0.6)]"
            >
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full z-10">
                #{index + 1}
              </div>

              <div className="aspect-[2/3] overflow-hidden">
                <img
                  src={animeItem.coverImage}
                  alt={animeItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3">
                <h3 className="text-sm font-semibold line-clamp-1">
                  {animeItem.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  ⭐ {animeItem.score || "N/A"} •{" "}
                  {animeItem.episodes || "?"} eps •{" "}
                  {animeItem.duration || "?"} min
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopRated;