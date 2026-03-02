import React, { useEffect, useState } from "react";
import axios from "axios";

const AnimeNewsGrid = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fisherYatesShuffle = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[randomIndex]] = [
          shuffled[randomIndex],
          shuffled[i],
        ];
      }
      return shuffled;
    };

    const fetchAnimeNews = async () => {
      try {
        // ✅ Call backend instead of GNews directly
        const response = await axios.get("/api/gnews");

        const formattedNews =
          response.data.articles?.map((article) => ({
            id: article.url,
            title: article.title,
            image:
              article.image ||
              "https://via.placeholder.com/800x500?text=Anime+News",
            description:
              article.description || "No description available.",
            time: new Date(article.publishedAt).toLocaleDateString(),
            url: article.url,
          })) || [];

        const shuffled = fisherYatesShuffle(formattedNews);

        localStorage.setItem("animeNews", JSON.stringify(shuffled));
        localStorage.setItem("animeNewsTime", Date.now());

        setNews(shuffled.slice(0, 7));
      } catch (error) {
        console.error("News Fetch Error:", error);
      }
    };

    const cachedNews = localStorage.getItem("animeNews");
    const cachedTime = localStorage.getItem("animeNewsTime");

    const ONE_HOUR = 1000 * 60 * 60;

    if (cachedNews && cachedTime && Date.now() - cachedTime < ONE_HOUR) {
      const parsed = JSON.parse(cachedNews);
      setNews(parsed.slice(0, 7));
    } else {
      fetchAnimeNews();
    }
  }, []);

  if (news.length < 7) {
    return (
      <div className="bg-black text-white text-center py-20">
        Loading Anime News...
      </div>
    );
  }

  return (
    <div className="bg-black/90 px-6 md:px-12 py-16 text-white pt-6 pb-0">
      <h2 className="text-3xl font-bold mb-10">Latest Anime Updates</h2>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[180px]">
        {news.slice(0, 7).map((item, index) => (
          <div
            key={item.id}
            onClick={() => window.open(item.url, "_blank")}
            className="relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer md:col-span-3"
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

            <p className="absolute top-4 left-4 text-sm text-gray-300 z-10">
              📰 {item.time}
            </p>

            <div className="absolute bottom-5 left-5 right-5 z-10">
              <h3 className="text-base md:text-lg font-semibold leading-snug text-gray-300">
                {item.title}
              </h3>
            </div>

            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300" />
          </div>
        ))}

        <div className="md:col-span-6 mt-14">
          <button
            onClick={() =>
              window.open("https://www.animenewsnetwork.com/", "_blank")
            }
            className="w-full bg-white text-black py-3 rounded-xl 
            text-lg font-semibold 
            hover:bg-red-700 hover:text-white 
            transition duration-300 cursor-pointer"
          >
            View All News
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimeNewsGrid;