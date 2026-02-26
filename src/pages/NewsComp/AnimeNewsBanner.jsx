import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AnimeNewsBanner = () => {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔥 Generate random minutes (1–59)
  const generateRandomMinutes = () => {
    return Math.floor(Math.random() * 59) + 1;
  };

  // 🔥 Professional Shuffle (Fisher–Yates)
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[randomIndex]] = [
        newArray[randomIndex],
        newArray[i],
      ];
    }
    return newArray;
  };

  // 🔥 Fetch from AniList
  useEffect(() => {
    const fetchAnimeNews = async () => {
      try {
        const query = `
          query {
            Page(page: 1, perPage: 15) {
              media(sort: TRENDING_DESC, type: ANIME) {
                id
                title { english romaji }
                bannerImage
                coverImage { extraLarge }
                description(asHtml: false)
              }
            }
          }
        `;

        const response = await axios.post("/anilist", { query });

        const formatted =
          response.data.data.Page.media.map((item) => ({
            id: item.id,
            title: item.title.english || item.title.romaji,
            image: item.bannerImage || item.coverImage.extraLarge,
            description:
              item.description
                ?.replace(/<[^>]+>/g, "")
                .replace(/~!|!~/g, "")
                .slice(0, 250) + "...",
            randomMinutes: generateRandomMinutes(),
          })) || [];

        // 🔥 Shuffle banners
        const shuffledNews = shuffleArray(formatted).slice(0, 6);
        setNewsList(shuffledNews);
      } catch (error) {
        console.error("AniList News Fetch Error:", error);
      }
    };

    fetchAnimeNews();
  }, []);

  // 🔥 Auto slider
  useEffect(() => {
    if (!newsList.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((previousIndex) => (previousIndex + 1) % newsList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [newsList]);

  if (!newsList.length) {
    return (
      <div className="min-h-[60vh] bg-black text-white flex justify-center items-center">
        Loading Anime News...
      </div>
    );
  }

  return (
    <div className="relative h-[105vh] overflow-hidden bg-black">
      {newsList.map((news, index) => (
        <div
          key={news.id}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ backgroundImage: `url(${news.image})` }}
        >
          {/* 🔥 Black Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

          {/* 🔥 Content */}
          <div className="relative z-20 h-full flex flex-col justify-center px-16 max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              {news.title}
            </h1>

            <p className="text-gray-300 line-clamp-6 text-lg">
              {news.description}
            </p>

            <p className="text-sm text-gray-400">
              🕒 {news.randomMinutes} min ago
            </p>

            <button
              onClick={() =>
                window.open(`https://anilist.co/anime/${news.id}`, "_blank")
              }
              className="bg-red-600 px-9 py-3 rounded-xl 
              hover:bg-red-700 hover:shadow-[0_0_20px_rgba(255,0,0,0.7)]
              transition w-fit cursor-pointer text-white"
            >
              Read More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimeNewsBanner;
