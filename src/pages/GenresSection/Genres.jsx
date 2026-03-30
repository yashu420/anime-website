import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlayCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Error from "../../assets/Error.json";
import ShinyText from "../../reactBits/ShinyText";
import SearchPageSkeleton from "../components/loaders/SearchPageSkeleton";

const GENRES = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy",
  "Horror", "Mecha", "Psychological", "Romance", "Sci-Fi",
  "Slice of Life", "Sports", "Supernatural", "Thriller"
];

const Genres = () => {
  const [selectedGenre, setSelectedGenre] = useState("Action");
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAnimeByGenre = async (genre) => {
    setLoading(true);
    try {
      const graphqlQuery = `
        query {
          Page(page: 1, perPage: 24) {
            media(
              genre: "${genre}"
              type: ANIME
              sort: POPULARITY_DESC
            ) {
              idMal
              title {
                english
                romaji
              }
              coverImage {
                extraLarge
              }
              averageScore
              duration
              format
              episodes
            }
          }
        }
      `;

      const response = await axios.post(
        "https://graphql.anilist.co",
        { query: graphqlQuery }
      );

      const formatted = response.data.data.Page.media
        .filter((item) => item.idMal)
        .map((item) => ({
          mal_id: item.idMal,
          title: item.title.english || item.title.romaji,
          image: item.coverImage.extraLarge,
          score: item.averageScore,
          duration: item.duration ? `${item.duration} min` : "N/A",
          type: item.format || "N/A",
          episodes: item.episodes,
        }));

      setAnimeList(formatted);
    } catch (err) {
      console.log("AniList Genre Search Error:", err);
      setAnimeList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeByGenre(selectedGenre);
  }, [selectedGenre]);

  return (
    <div className="bg-gradient-to-br from-[#020617] via-[#0B1120] to-[#020617] text-white pt-24 pb-6 w-full overflow-x-hidden">
      
      {/* Header & Genre Selection */}
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500 px-6 md:px-10">
        Discover Genres
      </h1>

      <div className="w-full overflow-hidden mb-6 py-6 relative group flex">
        {/* Infinite Marquee logic over 4 identical copies to ensure no gaps */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-4 pr-4 w-max animate-marquee group-hover:[animation-play-state:paused]">
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-6 py-2.5 rounded-full whitespace-nowrap font-medium transition-all duration-300 transform hover:scale-105 backdrop-blur-md border ${
                  selectedGenre === genre
                    ? "bg-red-600 border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.5)] text-white"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 text-gray-300"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="px-6 md:px-10">
        {loading ? (
          <SearchPageSkeleton />
        ) : animeList.length === 0 ? (
        <div className="text-md pl-3">
          <div className="flex justify-center h-96 relative">
            <Lottie
              animationData={Error}
              loop
              autoplay
              className="absolute inset-0 w-full h-full"
            />
          </div>

          <div className="flex mt-10 justify-center">
            <ShinyText
              text="No results Found !! Try another genre..."
              speed={3}
              delay={0}
              color="#ffffff"
              shineColor="#ff0000"
              spread={150}
              direction="left"
              className="text-xl font-semibold"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {animeList.map((item) => (
            <div
              key={item.mal_id}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(139,92,246,0.25)] flex flex-col h-full"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-3 flex flex-col flex-grow">
                <h2 className="font-bold text-sm md:text-md truncate mb-2">
                  {item.title}
                </h2>

                <div className="flex gap-2 flex-wrap mb-4 flex-grow content-start">
                  <p className="text-gray-400 text-xs shrink-0">
                    <span className="text-amber-50">Rating:</span> ⭐{" "}
                    {item.score || "N/A"}
                  </p>
                  <p className="text-gray-400 text-xs shrink-0">
                    <span className="text-amber-50">Ep:</span> {item.episodes || "N/A"}
                  </p>
                  <p className="text-gray-400 text-xs w-full truncate">
                    <span className="text-amber-50">Format:</span> {item.type}
                  </p>
                </div>

                <div className="w-full flex justify-center mt-auto">
                  <button
                    onClick={() => navigate(`/anime/${item.mal_id}`)}
                    className="flex items-center gap-2 bg-red-600 w-full justify-center py-2 rounded-xl text-xs md:text-sm font-medium transition hover:bg-red-700 hover:shadow-[0_0_15px_rgba(255,0,0,0.7)] hover:scale-105 cursor-pointer"
                  >
                    Watch Now
                    <FaPlayCircle className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default Genres;