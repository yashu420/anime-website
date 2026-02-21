import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ShinyText from "../reactBits/ShinyText";
import Lottie from "lottie-react";
import Astronout from "../assets/Astronout.json";
const AnimeAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "What is AnimeHub?",
      answer:
        "AnimeHub is a streaming and discovery platform where you can explore trending, popular and top-rated anime.",
    },
    {
      question: "Is AnimeHub free to use?",
      answer:
        "Yes! You can browse anime, search titles and explore characters without any subscription.",
    },
    {
      question: "Can I create my own watchlist?",
      answer:
        "Yes, after signing up you can create and manage your personal anime watchlist.",
    },
    {
      question: "Does it include latest episodes?",
      answer:
        "We update trending and latest anime regularly so you never miss new releases.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative text-white px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center mb-4">
          <ShinyText
            text="Frequently Asked Questions"
            speed={3}
            delay={0}
            color="#ffffff"
            shineColor="#ff0000"
            direction="left"
            className="text-3xl md:text-4xl font-bold"
          />
          <div className="">
            {" "}
            <Lottie
              animationData={Astronout}
              loop
              autoplay
              className="h-10 md:h-22 -ml-4 "
            />
          </div>
        </div>

        {faqData.map((item, index) => (
          <div
            key={index}
            className="mb-4 border border-gray-700 rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.8)]"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left transition duration-300 bg-gray-900/40 backdrop-blur-2xl  "
            >
              <span className="font-semibold text-lg">{item.question}</span>

              <ChevronDown
                className={`transition-transform duration-300 cursor-pointer ${
                  openIndex === index ? "rotate-180 text-red-500" : ""
                }`}
              />
            </button>

            <div
              className={`px-6 overflow-hidden transition-all duration-500  ${
                openIndex === index
                  ? "max-h-40 py-4 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-300 ">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeAccordion;
