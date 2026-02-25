import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import Error from "../assets/Error.json";
import ShinyText from "../reactBits/ShinyText";
import { FaPlayCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchPage = () => {
  const { query } = useParams();
  const [anime, setAnime] = useState([]);
  const navigate = useNavigate();

  const fetchAnime = async () => {
    try {
      const graphqlQuery = `
        query {
          Page(page: 1, perPage: 12) {
            media(
              search: "${query}"
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
          duration: item.duration
            ? `${item.duration} min`
            : "N/A",
          type: item.format || "N/A",
          episodes: item.episodes,
        }));

      setAnime(formatted);
    } catch (err) {
      console.log("AniList Search Error:", err);
    }
  };

  useEffect(() => {
    fetchAnime();
  }, [query]);

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-6 px-10">
      <h1 className="text-3xl font-bold mb-8">
        Search Results for :{" "}
        <span className="text-red-600">{query.toUpperCase()}</span>
      </h1>

      {anime.length === 0 ? (
        <div className="text-md pl-3">
          <div>
            <Lottie
              animationData={Error}
              loop
              autoplay
              className="absolute inset-0 w-full h-140 mt-28"
            />
          </div>

          <div className="flex mt-130 justify-center">
            <ShinyText
              text="No results Found !! Try Searching Something else..."
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {anime.map((item) => (
            <div
              key={item.mal_id}
              className="bg-gray-900 hover:shadow-[0_0_15px_rgba(255,0,0,0.5)]
              rounded-lg overflow-hidden hover:scale-105 transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover"
              />

              <div className="p-3">
                <h2 className="font-bold text-md truncate pb-2">
                  {item.title}
                </h2>

                <div className="flex gap-3 flex-wrap">
                  <p className="text-gray-400 text-xs">
                    <span className="text-amber-50">Rating:</span> ⭐{" "}
                    {item.score || "N/A"}
                  </p>

                  <p className="text-gray-400 text-xs">
                    <span className="text-amber-50">Duration:</span>{" "}
                    {item.duration}
                  </p>

                  <p className="text-gray-400 text-xs">
                    <span className="text-amber-50">Type:</span>{" "}
                    {item.type}
                  </p>

                  <div className="w-full flex justify-center">
                    <button
                      onClick={() => navigate(`/anime/${item.mal_id}`)}
                      className="flex items-center gap-2 bg-red-600 
                      px-6 py-2 rounded-2xl text-sm font-medium
                      transition hover:bg-red-700
                      hover:shadow-[0_0_15px_rgba(255,0,0,0.7)]
                      hover:scale-105 cursor-pointer"
                    >
                      Watch Now
                      <FaPlayCircle className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;