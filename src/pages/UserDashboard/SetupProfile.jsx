import React, { useState , useRef } from "react";
import Stepper, { Step } from "../../reactBits/stepper";
import { supabase } from "../../supabase-client";
import { useNavigate } from "react-router-dom";
import ProfilePictureStep from "./ProfilePictureStep";

function SetupProfile() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

   const welcomeMessages = [
    "The saga begins... are you ready? ⚡",
    "Thousands of anime. One hub. Let's go 🔥",
    "Every legend has an origin story. This is yours. 🎬",
    "You're not just a viewer. You're the main character. 👁️",
    "In this world, only the strongest survive. Welcome. 🖤",
"By the ancient scrolls of anime... you have been summoned. 📜",

    "Dive into the anime universe 🌸",
    "A new legend enters the world of anime ⚔️"




  ];
  const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
  const handleFinish = async () => {
    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) return;

    // ✅ Prevent empty name
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      name: name,
      is_complete: true,
    });

    // ✅ Handle error
    if (error) {
      console.error(error);
      alert("Something went wrong");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <Stepper
      initialStep={1}
      onStepChange={(step) => console.log(step)}
      onFinalStepCompleted={handleFinish}
    >

      <Step>
        <h2 className="text-4xl font-bold text-white">
          Welcome to{" "}
          <span className="text-purple-500 ">
            Anime
          </span>{" "}
          <span className="text-red-500 drop-shadow-[0_0_2px_#ef4444]">
            Hub
          </span>{" "}
          👋
        </h2>
         <p className="text-gray-400 mt-2">{randomMessage}</p>

      </Step>

      <Step>
        <h2 className="text-2xl text-purple-400">
          Choose Your Aura 🎴
        </h2>
        <p className="text-gray-400">
          Your vibe defines your journey
        </p>
      </Step>

      <Step>
         <ProfilePictureStep onNext={(data) => console.log("avatar:", data)} />
        <h2 className="text-2xl text-purple-400 mb-4">
          Your Name ✍️
        </h2>

        <input
          className="w-full p-3 rounded-lg bg-[#020617] border border-purple-500 text-white focus:ring-2 focus:ring-purple-500 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your anime name..."
        />
      </Step>

      <Step>
        <h2 className="text-2xl text-purple-400">
          You're Ready 🚀
        </h2>
        <p className="text-gray-400">
          Let the journey begin!
        </p>
      </Step>

    </Stepper>
  );
}

export default SetupProfile;