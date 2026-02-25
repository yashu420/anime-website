import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SliderButton from "../pages/UI/Buttons";

const TopPicksForYouSection = () => {
  const navigate = useNavigate();
  const [animeList, setAnimeList] = useState([]);
  const [index, setIndex] = useState(0);

  const cardsPerView = 7;
  const maxIndex = animeList.length - cardsPerView;

  // 🔥 Fisher-Yates Shuffle
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    const fetchTopPicks = async () => {
      try {
        const query = `
          query {
            Page(page: 1, perPage: 25) {
              media(
                sort: TRENDING_DESC
                type: ANIME
              ) {
                idMal
                title { english romaji }
                coverImage { extraLarge }
                averageScore
                episodes
                duration
              }
            }
          }
        `;

        const response = await axios.post(
          "https://graphql.anilist.co",
          { query }
        );

        const formatted = response.data.data.Page.media
          .filter((item) => item.idMal)
          .map((item) => ({
            malId: item.idMal,
            title: item.title.english || item.title.romaji,
            coverImage: item.coverImage.extraLarge,
            score: item.averageScore,
            episodes: item.episodes,
            duration: item.duration,
          }));

        // 🔥 Shuffle here
        const shuffled = shuffleArray(formatted);

        setAnimeList(shuffled);
      } catch (error) {
        console.error("Top Picks Fetch Error:", error);
      }
    };

    fetchTopPicks();
  }, []);

  const nextSlide = () => {
    if (index < maxIndex) {
      setIndex((prev) => prev + 3);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex((prev) => prev - 3);
    }
  };

  if (!animeList.length) {
    return (
      <div className="px-10 py-14 text-white">
        Loading Top Picks...
      </div>
    );
  }

  return (
    <div className="px-10 py-14 pt-0">
      <h2 className="text-3xl font-bold mb-5 text-red-600">
        🎯 Top Picks For You
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
              style={{ width: "calc(100% / 7 - 12px)" }}
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

              <div className="p-2">
                <h3 className="text-xs font-semibold line-clamp-1">
                  {animeItem.title}
                </h3>
                <p className="text-[10px] text-gray-400 mt-1">
                  ⭐ {animeItem.score || "N/A"} •{" "}
                  {animeItem.episodes || "?"} eps
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TopPicksForYouSection;