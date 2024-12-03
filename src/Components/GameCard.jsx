import React from "react";
import { Clock, Calendar, Trophy } from "lucide-react";

const GameCard = ({ id, url, imgURL }) => {
  return (
    <div className="max-w-sm bg-[#24242f] rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
      {/* Header section with burst effect and title */}
      <div className="relative h-48 overflow-hidden group">
        {/* Image with hover effect */}
        <div 
          className="relative flex items-center justify-center h-full cursor-pointer overflow-hidden"
          onClick={() => window.location.href = `/game/${id}`}
        >
          <img 
            src={imgURL} 
            alt="Game" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-cyan-500/0 transition-all duration-300 group-hover:bg-cyan-500/20" />
          
          {/* Play button overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <div className="bg-black/50 px-6 py-2 rounded-full backdrop-blur-sm border border-white/20">
              <span className="text-white font-semibold">View Game</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats section with hover effects */}
      <div className="px-6 py-4 transition-colors duration-300 hover:bg-[#2a2a36]">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col group">
            <div className="flex items-center text-gray-500 text-xs mb-1 transition-colors duration-300 group-hover:text-cyan-400">
              <Clock className="w-6 h-6 mr-1 transition-transform duration-300 group-hover:scale-110" />
              PLAY TIME
            </div>
            <span className="text-white text-sm">356 hours</span>
          </div>
          <div className="flex flex-col group">
            <div className="flex items-center text-gray-500 text-xs mb-1 transition-colors duration-300 group-hover:text-cyan-400">
              <Calendar className="w-8 h-8 mr-1 text-xs transition-transform duration-300 group-hover:scale-110" />
              LAST PLAYED
            </div>
            <span className="text-white text-xs">2 hours ago</span>
          </div>
          <div className="flex flex-col group">
            <div className="flex items-center text-gray-500 text-sm mb-1 transition-colors duration-300 group-hover:text-cyan-400">
              <Trophy className="w-4 h-4 mr-1 text-xs transition-transform duration-300 group-hover:scale-110" />
              RANK
            </div>
            <span className="text-white text-xs">#3</span>
          </div>
        </div>
      </div>

      {/* Bottom section with animated elements */}
      <div className="px-6 py-4 flex justify-between items-center transition-colors duration-300 hover:bg-[#2a2a36]">
        <div className="flex items-center group">
          <div className="flex -space-x-2 transition-transform duration-300 group-hover:scale-105">
            <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-transparent transition-colors duration-300 group-hover:border-cyan-500"></div>
            <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-transparent transition-colors duration-300 group-hover:border-cyan-500"></div>
          </div>
          <span className="ml-4 text-cyan-400 text-xs transform transition-all duration-300 group-hover:translate-x-1">
            2 friends played recently
          </span>
        </div>
        <button 
          className="bg-cyan-500 text-white px-4 py-1 text-sm rounded-full transform transition-all duration-300 hover:bg-cyan-400 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 active:scale-95"
          onClick={() => {
            window.location.href = `/game/${id}`
          }}
        >
          Play
        </button>
      </div>
    </div>
  );
};

export default GameCard;