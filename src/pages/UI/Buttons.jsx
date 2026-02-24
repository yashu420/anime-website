import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SliderButton = ({ direction = "left", onClick }) => {
  const isLeft = direction === "left";

  return (
    <button
      onClick={onClick}
      className={`absolute ${
        isLeft ? "left-[-2px]" : "right-[-0px]"
      } top-1/2 -translate-y-1/2 z-20 
      bg-black/70 p-3 rounded-full 
      hover:bg-red-600 transition duration-300`}
    >
      {isLeft ? (
        <ChevronLeft size={28} className="text-white" />
      ) : (
        <ChevronRight size={28} className="text-white" />
      )}
    </button>
  );
};

export default SliderButton;