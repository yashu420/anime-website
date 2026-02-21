import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ShinyText from "../reactBits/ShinyText";
import MoreCards from "./MoreCards";
import LatestAnime from "./LatestAnime";

const AnimeDetails = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        const data = await res.json();
        setAnime(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAnime();
  }, [id]);

  const ganraeList = anime?.genres;

  if (!anime)
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-16 pb-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">
        <span className="text-red-600">{anime.title.split(":")[0]}</span>

        {anime.title.includes(":") && (
          <>
            <span className="text-red-600"> :</span>
            <span className="text-white">{anime.title.split(":")[1]}</span>
          </>
        )}
      </h1>

      <div className="flex flex-col md:flex-row gap-10 mb-4">
        <div className="flex-shrink-0">
          <img
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            className="w-72 rounded-xl shadow-[0_0_20px_rgba(255,0,0,0.5)]"
          />
        </div>

        <div className="flex-1">
          <p className="text-gray-300 leading-relaxed mb-6">
            {anime.synopsis?.split(/(\[|Written by)/i)[0].trim() ||
              "No description available."}{" "}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <p>
              <span className="text-red-500">Rating:</span> ⭐{" "}
              {anime.score || "N/A"}
            </p>

            <p>
              <span className="text-red-500">Episodes:</span>{" "}
              {anime.episodes || "N/A"}
            </p>

            <p>
              <span className="text-red-500">Status:</span>{" "}
              {anime.status || "N/A"}
            </p>

            <p>
              <span className="text-red-500">Type:</span> {anime.type || "N/A"}
            </p>

            <p>
              <span className="text-red-500">Duration:</span>{" "}
              {anime.duration || "N/A"}
            </p>

            <p>
              <span className="text-red-500">Year:</span> {anime.year || "N/A"}
            </p>

            <p>
              <span className="text-red-500">Popularity:</span>{" "}
              {anime.popularity || "N/A"}
            </p>

            <p className="text-red-500">
              Genre :
              {ganraeList?.map((item, index) => (
                <span key={item.mal_id} className="text-white ml-2">
                  {item.name}
                  {index !== ganraeList.length - 1 && ","}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-center">
          {" "}
          <ShinyText
            text=" Watch Trailer Now"
            speed={3}
            delay={0}
            color="#ff0000"
            shineColor="#ffffff "
            spread={150}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
            className="text-4xl font-bold mb-8 "
          />
        </div>

        {anime.trailer?.embed_url ? (
          <iframe
            src={`${anime.trailer.embed_url}?autoplay=1&mute=1&rel=0`}
            width="100%"
            height="500"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="rounded-xl shadow-[0_0_25px_rgba(255,0,0,0.5)]"
          />
        ) : (
          <p className="text-gray-400">No trailer available.</p>
        )}
      </div>
      <MoreCards />
      <LatestAnime />
    </div>
  );
};

export default AnimeDetails;
