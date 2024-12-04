import React from 'react';
import { User, Clock, Edit2 } from 'lucide-react';

export default function ProfilePage() {
  const badges = [
    { id: 1, achieved: true },
    { id: 2, achieved: false },
    { id: 3, achieved: false }
  ];

  const recentGames = [
    { id: 1, title: "Game 1", image: "/api/placeholder/200/200" },
    { id: 2, title: "Game 2", image: "/api/placeholder/200/200" }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-12">
          <div className="relative">
            {/* Profile Picture with Badge */}
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-yellow-400 relative">
              <img src="/api/placeholder/200/200" alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute -bottom-2 -left-2 bg-pink-500 rounded-lg p-2">
                <User className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="text-right">
            <h1 className="text-4xl text-cyan-400 mb-4">CENA</h1>
            <div className="space-y-2">
              <p className="text-yellow-400">Rank <span className="text-4xl ml-2">#8</span></p>
              <p className="text-yellow-400">Hours Played <span className="text-4xl ml-2">35h</span></p>
            </div>
          </div>
        </div>

        {/* Badges Progress */}
        <div className="mb-12">
          <h2 className="text-2xl mb-4 text-yellow-400">Badges</h2>
          <div className="relative h-4 bg-white/20 rounded-full">
            <div className="absolute h-full w-1/3 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full" />
            <div className="absolute -bottom-8 w-full flex justify-between">
              {badges.map((badge, index) => (
                <div 
                  key={badge.id}
                  className={`w-12 h-12 rounded-lg ${badge.achieved ? 'bg-pink-500' : 'bg-gray-700'} flex items-center justify-center`}
                >
                  <User className="w-6 h-6" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-12">
          <h2 className="text-2xl mb-4 text-yellow-400">About</h2>
          <div className="relative bg-gray-800/50 rounded-lg p-4 border border-cyan-400/30">
            <textarea 
              className="w-full bg-transparent outline-none resize-none"
              placeholder="Write about you"
              rows={3}
            />
            <Edit2 className="absolute bottom-4 right-4 text-cyan-400" />
          </div>
        </div>

        {/* Recently Played */}
        <div>
          <h2 className="text-2xl mb-4 text-yellow-400">Recently Played Game</h2>
          <div className="grid grid-cols-2 gap-4">
            {recentGames.map(game => (
              <div key={game.id} className="rounded-lg overflow-hidden">
                <img src={game.image} alt={game.title} className="w-full h-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}