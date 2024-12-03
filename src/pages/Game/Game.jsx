import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Power, Volume2, Settings } from "lucide-react";
import games from "./games.json";

const GamePage = () => {
  const { id } = useParams();
  const [isPowered, setIsPowered] = useState(true);
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const game = games.find((g) => g.id === parseInt(id, 10));

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current && iframeRef.current) {
        const container = containerRef.current;
        const iframe = iframeRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const iframeWidth = iframe.scrollWidth;
        const iframeHeight = iframe.scrollHeight;
        const scaleX = containerWidth / iframeWidth;
        const scaleY = containerHeight / iframeHeight;
        const newScale = Math.min(scaleX, scaleY, 1);
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    if (iframeRef.current) {
      iframeRef.current.addEventListener("load", updateScale);
    }

    return () => {
      window.removeEventListener("resize", updateScale);
      if (iframeRef.current) {
        iframeRef.current.removeEventListener("load", updateScale);
      }
    };
  }, []);

  if (!game) {
    return (
      <div className="p-4">
        <h2>Game not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#15151a] ">
      <div className="">
        {/* Retro TV Container */}
        <div className="relative flex-1 h-screen max-h-screen bg-[#15151a] ">
          {/* TV Frame */}
          <div className="relative h-full bg-gradient-to-br from-[#a89383] via-[#967c6d] to-[#846b5c] px-10 pt-10  shadow-2xl border-2 border-[#695849]">
            {/* Wood Grain Effect */}
            <div className="absolute inset-0  opacity-30 bg-[repeating-linear-gradient(90deg,#000_0px,transparent_2px,transparent_4px)] pointer-events-none" />

            {/* Top Speaker Grill */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-48 h-4">
              <div className="w-full h-full bg-[#695849] rounded-full opacity-40 flex items-center justify-center gap-1">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-[#463225] rounded-full" />
                ))}
              </div>
            </div>

            {/* TV Screen Container */}
            <div className="relative h-full flex flex-col">
              {/* Screen Bezel */}
              <div className="flex-1 relative rounded-3xl bg-[#463225] border-8 border-[#695849] shadow-[inset_0_0_60px_rgba(0,0,0,0.6)]">
                {/* Inner Screen Frame */}
                <div className="absolute inset-2 rounded-2xl border-4 border-[#2a1f1a]" />

                {/* Screen Effects */}
                <div
                  className={`absolute inset-4 rounded-xl overflow-hidden ${
                    !isPowered && "hidden"
                  }`}
                >
                  {/* Scanlines */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] animate-scan pointer-events-none" />

                  {/* CRT Curve Effect */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />

                  {/* Screen Glow */}
                  {/* <div className="absolute inset-0 bg-[#a98]/5 animate-glow pointer-events-none" /> */}
                </div>

                {/* Game Content */}
                <div
                  ref={containerRef}
                  className={`relative h-full rounded-xl overflow-hidden transition-opacity duration-1000 ${
                    isPowered ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="absolute  inset-4 flex items-center justify-center bg-black rounded-lg">
                    <iframe
                      ref={iframeRef}
                      src={game.url}
                      title={`Game ${game.id}`}
                      className="border-none"
                      style={{
                        width: `${game.width || "100%"}`,
                        height: `${game.height || "100%"}`,
                        overflow: "hidden",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Retro TV Controls Panel */}
              <div className="flex justify-between items-center px-8 ">
                <div className="flex items-center gap-8 ">
                  {/* Power Button */}
                  <button
                    onClick={() => setIsPowered(!isPowered)}
                    className="relative group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#463225] flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
                      <Power
                        className={`w-6 h-6 ${
                          isPowered ? "text-green-400" : "text-gray-600"
                        } transition-colors duration-300`}
                      />
                      <div
                        className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                          isPowered ? "bg-green-400" : ""
                        } animate-pulse`}
                      />
                    </div>
                  </button>

                  {/* Volume Controls */}
                  <div className="flex items-center gap-4">
                    <Volume2 className="w-6 h-6 text-[#463225]" />
                    <div className="w-10 h-10 rounded-full bg-[#463225] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] flex items-center justify-center">
                      <div className="w-1 h-5 bg-[#967c6d] rounded-full transform -rotate-45" />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1 bg-[#463225] rounded-sm text-[#967c6d] text-xs font-mono">
                    CTRL PLAY
                  </div>
                </div>
                {/* Channel Controls */}
                <div className="flex gap-6">
                  <div className="w-10 h-10 rounded-full bg-[#463225] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-[#967c6d] shadow-inner" />
                  </div>

                  <button
                    className="w-10 h-10 rounded-full bg-[#463225] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] flex items-center justify-center"
                    onClick={() => (window.location.href = `/`)}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#463225] text-[#ff007A] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] flex items-center justify-center">
                      X
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Brand Label */}
          </div>

          {/* TV Stand */}
          {/* <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2">
            <div className="h-16 bg-gradient-to-b from-[#846b5c] to-[#463225] rounded-t-3xl shadow-lg">

             
            </div>
          </div> */}
        </div>

        {/* Game Title */}
      </div>
    </div>
  );
};

export default GamePage;

// Add these custom animations to your global CSS or Tailwind config
const style = document.createElement("style");
style.textContent = `
  @keyframes appear {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  
  @keyframes scan {
    from { transform: translateY(0); }
    to { transform: translateY(4px); }
  }
  
  @keyframes glow {
    0% { opacity: 0.3; }
    50% { opacity: 0.6; }
    100% { opacity: 0.3; }
  }

  .animate-appear {
    animation: appear 0.5s ease-out;
  }
  
  .animate-scan {
    animation: scan 4s linear infinite;
  }
  
  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }
`;
document.head.appendChild(style);
