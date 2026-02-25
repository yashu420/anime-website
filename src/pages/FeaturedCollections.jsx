import React from "react";
import { useNavigate } from "react-router-dom";

const FeaturedCollections = () => {
  const navigate = useNavigate();

  const collections = [
    {
      title: "The Best Mystical Anime",
      route: "/collection/mystical",
      images: [
        "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
        "https://cdn.myanimelist.net/images/anime/4/19644.jpg",
        "https://cdn.myanimelist.net/images/anime/3/40451.jpg",
      ],
    },
    {
      title: "Top 20 Romance Anime",
      route: "/collection/romance",
      images: [
        "https://cdn.myanimelist.net/images/anime/1015/138006.jpg",
        "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
        "https://cdn.myanimelist.net/images/anime/1122/96435.jpg",
      ],
    },
    {
      title: "The Best Classic Animes",
      route: "/collection/classic",
      images: [
        "https://cdn.myanimelist.net/images/anime/5/17407.jpg",
        "https://cdn.myanimelist.net/images/anime/10/75815.jpg",
        "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
      ],
    },
    {
      title: "Top Action Anime",
      route: "/collection/action",
      images: [
        "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
        "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
        "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
      ],
    },
  ];

  return (
    <div className="w-full px-4 md:px-10 -mt-40">
      <h2 className="text-white text-2xl md:text-3xl font-bold mb-8">
        Featured Collections
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {collections.map((collection, index) => (
          <div
            key={index}
            onClick={() => navigate(collection.route)}
            className="group relative bg-black/20 backdrop-blur-md
            rounded-2xl h-[260px] md:h-[250px]
            p-6 cursor-pointer overflow-hidden
            transition duration-500
            "
          >
         
            <div className="absolute inset-0 rounded-2xl 
              opacity-0 group-hover:opacity-100
              transition duration-500
              bg-gradient-to-br from-gray-900 via-transparent to-transparent pointer-events-none" />

           
            <h3 className="text-gray-100 text-center text-lg md:text-xl font-semibold leading-snug transition duration-300 group-hover:-translate-y-1">
              {collection.title}
            </h3>

           
            <div className="absolute bottom-[-20px] left-0 w-full flex justify-center items-end">
              {collection.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="anime"
                  className={`absolute w-28 md:w-32 rounded-xl shadow-xl
                  transition duration-500 ease-out
                  group-hover:-translate-y-4
                  ${
                    i === 0
                      ? "rotate-[-15deg] -translate-x-16"
                      : i === 1
                      ? "z-10"
                      : "rotate-[15deg] translate-x-16"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCollections;