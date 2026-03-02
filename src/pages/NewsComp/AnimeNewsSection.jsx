import { useEffect, useState, useRef } from "react";
import axios from "axios";
import AnimeNewsGrid from "./AnimeNewsGrid";

const AnimeNewsSection = () => {
  const [newsData, setNewsData] = useState([]);
  const hasFetched = useRef(false);

  // 🔥 Random minutes (1–59)
  const generateRandomMinutes = () => {
    return Math.floor(Math.random() * 59) + 1;
  };

  const fetchNews = async () => {
    try {
      const query = `
        query {
          Page(page: 1, perPage: 12) {
            media(
              sort: UPDATED_AT_DESC
              type: ANIME
            ) {
              id
              title { english romaji }
              bannerImage
              coverImage { extraLarge }
              genres
              isAdult
            }
          }
        }
      `;

      // ✅ IMPORTANT — Await and store response
      const response = await axios.post(
        "https://graphql.anilist.co",
        {
          query: query,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const media = response.data?.data?.Page?.media || [];

      const filtered = media
        .filter((item) => {
          if (item.isAdult) return false;

          const blockedGenres = ["Hentai", "Ecchi", "Harem"];
          return !item.genres?.some((genre) => blockedGenres.includes(genre));
        })
        .slice(0, 8)
        .map((item) => ({
          id: item.id,
          title: item.title.english || item.title.romaji,
          image: item.bannerImage || item.coverImage?.extraLarge || "",
          time: `${generateRandomMinutes()} min ago`,
        }));

      setNewsData(filtered);
    } catch (error) {
      if (error.response?.status === 429) {
        console.log("Rate limited. Retrying in 3 seconds...");
        setTimeout(fetchNews, 3000);
      } else {
        console.error("AniList News Fetch Error:", error);
      }
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetchNews();
  }, []);

  return <AnimeNewsGrid news={newsData} />;
};

export default AnimeNewsSection;
