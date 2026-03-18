import React from "react";

const AnimeNewsGrid = ({ news }) => {
  if (!news || news.length < 7) {
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

        <div className="md:col-span-3 md:row-span-2 h-70">
          <NewsCard news={news[0]} />
        </div>

        <div className="md:col-span-3 md:row-span-2 h-70">
          <NewsCard news={news[1]} />
        </div>

        <div className="md:col-span-2 -mt-26 pb-3">
          <NewsCard news={news[2]} />
        </div>

        <div className="md:col-span-2 -mt-26 pb-3">
          <NewsCard news={news[3]} />
        </div>

        <div className="md:col-span-2 -mt-26 pb-3">
          <NewsCard news={news[4]} />
        </div>

        <div className="md:col-span-3 -mt-5 h-60">
          <NewsCard news={news[5]} />
        </div>

        <div className="md:col-span-3 -mt-5 h-60">
          <NewsCard news={news[6]} />
        </div>

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

const NewsCard = ({ news }) => {
  return (
    <div
      onClick={() => window.open(news.url, "_blank")}
      className="relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer"
      style={{
        backgroundImage: `url(${news.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

      <p className="absolute top-4 left-4 text-sm text-gray-300 z-10">
        📰 {news.time}
      </p>

      <div className="absolute bottom-5 left-5 right-5 z-10">
        <h3 className="text-base md:text-lg font-semibold leading-snug text-gray-300">
          {news.title}
        </h3>
      </div>

      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300" />
    </div>
  );
};

export default AnimeNewsGrid;