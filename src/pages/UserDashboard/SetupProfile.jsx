
import React, { useState } from "react";
import Stepper, { Step } from "../../reactBits/stepper";
import { supabase } from "../../supabase-client";
import { useNavigate } from "react-router-dom";
import ProfilePictureStep from "./ProfilePictureStep";

function SetupProfile() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [avatar, setAvatar] = useState(null);

  // 🔥 GENRE STATE
  const [genres, setGenres] = useState([]);
  const [genreError, setGenreError] = useState("");

  const navigate = useNavigate();

  const GENRES = [
    "Action ⚔️",
    "Romance ❤️",
    "Horror 👻",
    "Comedy 😂",
    "Fantasy 🌌",
    "Slice of Life 🌸",
    "Thriller 🔪",
    "Isekai 🌍",
  ];

  const toggleGenre = (genre) => {
    if (genres.includes(genre)) {
      setGenres(genres.filter((g) => g !== genre));
      if (genreError) setGenreError("");
    } else {
      if (genres.length >= 3) {
        setGenreError("You can only choose up to 3 genres ⚠️");
        return;
      }
      setGenres([...genres, genre]);
      if (genreError) setGenreError("");
    }
  };

  const welcomeMessages = [
    "The saga begins... are you ready? ⚡",
    "Thousands of anime. One hub. Let's go 🔥",
    "Every legend has an origin story. This is yours. 🎬",
    "You're not just a viewer. You're the main character. 👁️",
    "In this world, only the strongest survive. Welcome. 🖤",
    "By the ancient scrolls of anime... you have been summoned. 📜",
    "Dive into the anime universe 🌸",
    "A new legend enters the world of anime ⚔️",
  ];

  const randomMessage =
    welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

  const handleFinish = async () => {
    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) return;

    if (!name.trim()) {
      setError("Name is required ⚠️");
      triggerShake();
      return;
    }

    if (genres.length === 0) {
      setGenreError("Pick at least one genre ⚠️");
      return;
    }

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      name: name,
      genres: genres, // 🔥 save genres
      is_complete: true,
    });

    if (error) {
      console.error(error);
      alert("Something went wrong");
      return;
    }

    navigate("/dashboard");
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  return (
    <Stepper
      initialStep={1}
      onStepChange={(step) => console.log(step)}
      onFinalStepCompleted={handleFinish}
    >
      {/* STEP 1 */}
      <Step>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-500 to-red-500 text-transparent bg-clip-text pb-2">
          Welcome to{" "}
          <span className="text-purple-500 ">Anime</span>{" "}
          <span className="text-red-500 ">Hub</span>
        </h2>
        <p className="text-gray-400 mt-2">{randomMessage}</p>
      </Step>

      {/* STEP 2 */}
      <Step
        validate={() => {
          if (!avatar) {
            setError("Please choose a profile picture ⚠️");
            triggerShake();
            return false;
          }
          if (!name.trim()) {
            setError("Name is required ⚠️");
            triggerShake();
            return false;
          }
          return true;
        }}
      >
        <h1 className="text-4xl font-semibold mb-4 bg-gradient-to-r from-purple-400 via-fuchsia-500 to-red-500 text-transparent bg-clip-text pb-2">
          Forge Your Identity
        </h1>

        <div className={shake && error === "Please choose a profile picture ⚠️" ? "animate-shake" : ""}>
          <ProfilePictureStep onNext={(data) => {
            setAvatar(data);
            if (error === "Please choose a profile picture ⚠️") setError("");
          }} />
        </div>

        <h1 className="text-sm text-gray-400 mt-2 mb-4">
          tap to choose avatar
        </h1>

        <h2 className="text-2xl text-purple-400 mb-4">
          Enter Your Name
        </h2>

        <input
          className={`w-100 p-3 rounded-lg bg-[#020617] border 
          ${error === "Name is required ⚠️" ? "border-red-500" : "border-purple-500"} 
          ${shake && error === "Name is required ⚠️" ? "animate-shake" : ""}
          text-white focus:ring-2 focus:ring-purple-500 outline-none`}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error === "Name is required ⚠️") setError("");
          }}
          placeholder="Enter your anime name..."
        />

        {error && <p className="text-red-400 mt-2">{error}</p>}
      </Step>

      {/* STEP 3 - GENRES */}
      <Step
        validate={() => {
          if (genres.length === 0) {
            setGenreError("Pick at least one genre ⚠️");
            return false;
          }
          return true;
        }}
      >
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text pb-1">
          Choose Your Genre 🎬
        </h2>

        <p className="text-gray-400 mb-4">
          Your vibe defines your journey
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {GENRES.map((genre, i) => (
            <div
              key={i}
              onClick={() => toggleGenre(genre)}
              className={`px-4 py-2 rounded-xl cursor-pointer text-sm text-center transition border 
              ${
                genres.includes(genre)
                  ? "bg-purple-600 border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.7)] scale-105"
                  : "bg-[#16161f] border-[#2a2a3a] hover:bg-purple-500/20"
              }`}
            >
              {genre}
            </div>
          ))}
        </div>

        {genreError && <p className="text-red-400 mt-3">{genreError}</p>}
      </Step>

      {/* STEP 4 */}
      <Step>
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text pb-1">
          You're Ready
        </h2>
        <p className="text-gray-400">
          Let the journey begin!
        </p>
      </Step>
    </Stepper>
  );
}

export default SetupProfile;

