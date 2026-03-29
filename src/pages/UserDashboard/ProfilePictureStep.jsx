import { useState, useRef, useEffect } from "react";

const AVATARS = ["🌸","⚔️","🌊","⚡","🦊","🌙","🔥","❄️"];

export default function AvatarPicker() {
  const [image, setImage] = useState(null);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(null); // "upload" | "avatar"

  const fileRef = useRef(null);
  const wrapperRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImage(URL.createObjectURL(file));
    setSelected(null);
    setOpen(false);
    setMode(null);
  };

  // 🔥 Close on outside click + ESC
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setMode(null);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMode(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div className="flex items-center justify-center  bg-[#0a0a10]">
      <div
        ref={wrapperRef}
        className="flex flex-col items-center gap-4 relative"
      >

        {/* 🔵 Main Avatar */}
        <div
          onClick={() => {
            setOpen((prev) => !prev);
            setMode(null);
          }}
          className={`w-20 h-20 rounded-full cursor-pointer 
          border-2 ${image || selected ? "border-purple-500" : "border-gray-600"} 
          flex items-center justify-center overflow-hidden relative 
          hover:scale-105 transition duration-200`}
        >
          {image ? (
            <img src={image} className="w-full h-full object-cover" />
          ) : selected ? (
            <span className="text-3xl">{selected}</span>
          ) : (
            <span className="text-2xl text-gray-500">👤</span>
          )}

          <div className="absolute bottom-0 right-0 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-[10px]">
            📷
          </div>
        </div>

        {/* 🎛️ Dropdown Panel */}
        {open && (
          <div className="absolute top-24 w-44 bg-[#111118] border border-[#22223a] rounded-xl p-3 shadow-2xl animate-fadeIn">

            {/* Step 1 */}
            {!mode && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMode("upload");
                    fileRef.current?.click();
                  }}
                  className="text-sm bg-[#16161f] hover:bg-purple-500/20 p-2 rounded-lg transition"
                >
                  📷 Upload Image
                </button>

                <button
                  onClick={() => setMode("avatar")}
                  className="text-sm bg-[#16161f] hover:bg-purple-500/20 p-2 rounded-lg transition"
                >
                  🎭 Choose Avatar
                </button>
              </div>
            )}

            {/* Step 2 */}
            {mode === "avatar" && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {AVATARS.map((a, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setSelected(a);
                      setImage(null);
                      setOpen(false);
                      setMode(null);
                    }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center 
                    cursor-pointer text-sm transition 
                    ${
                      selected === a
                        ? "bg-purple-600 scale-110"
                        : "bg-[#16161f] hover:bg-purple-500/30"
                    }`}
                  >
                    {a}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* hidden input */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>
    </div>
  );
}