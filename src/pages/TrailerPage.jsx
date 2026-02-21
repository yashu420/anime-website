import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const TrailerPage = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      const res = await fetch(
        `https://api.jikan.moe/v4/anime/${id}`
      );
      const data = await res.json();
      setAnime(data.data);
    };

    fetchAnime();
  }, [id]);

  if (!anime) return <div className="text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-10">
      <h1 className="text-2xl mb-6">{anime.title} Trailer</h1>

      {anime.trailer?.embed_url ? (
        <iframe
          src={anime.trailer.embed_url}
          width="100%"
          height="550"
          allowFullScreen
          className="rounded-xl"
          
        />
      ) : (
        <p>No trailer available</p>
      )}
    </div>
  );
};

export default TrailerPage;