import React from "react";
import { User, Clock, Edit2 } from "lucide-react";
import logo from "../../assets/logo.png";
export default function ProfilePage() {
  const [userInfo, setUserInfo] = React.useState(null);
  const badges = [
    { id: 1, achieved: true },
    { id: 2, achieved: false },
    { id: 3, achieved: false },
  ];

  const recentGames = [
    { id: 1, title: "Game 1", image: "/api/placeholder/200/200" },
    { id: 2, title: "Game 2", image: "/api/placeholder/200/200" },
  ];

  return (
    <div className="min-h-screen bg-[#15151A] text-white px-8 pt-4">
      <nav className="px-8 py-1  flex justify-between items-center">
        <a className="navbar-brand flex items-center"
        href="/"
        >
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <p className="text-[#EAEAEA] text-2xl font-medium mt-2 -ml-1">
            trl Play
          </p>
        </a>

        <div className="flex items-center space-x-6">
          {/* <a href="#leaderboards" className="text-[#EAEAEA] font-medium text-sm hover:text-gray-300 transition-colors">
                LEADERBOARDS
              </a> */}

          {userInfo && (
            <a
              className="ml-4 flex space-x-3 text-[#EAEAEA] text-sm items-center"
              href={`/profile/${userInfo.address}`}
            >
              GM, {userInfo.username}
              <img
                src={userInfo.profile_picture_url}
                alt="Profile"
                className="h-10 w-10 ml-3 rounded-full border-2 border-white"
              />
            </a>
          )}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto mt-6">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-12">
          <div className="relative">
            {/* Profile Picture with Badge */}
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-yellow-400 relative">
              <img
                src="/api/placeholder/200/200"
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-2 -left-2 bg-pink-500 rounded-lg p-2">
                <User className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="text-right">
            <h1 className="text-4xl text-cyan-400 mb-4">CENA</h1>
            <div className="space-y-2">
              <p className="text-yellow-400">
                Rank <span className="text-4xl ml-2">#8</span>
              </p>
              <p className="text-yellow-400">
                Hours Played <span className="text-4xl ml-2">35h</span>
              </p>
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
                  className={`w-12 h-12 rounded-lg ${
                    badge.achieved ? "bg-pink-500" : "bg-gray-700"
                  } flex items-center justify-center`}
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
          <h2 className="text-2xl mb-4 text-yellow-400">
            Recently Played Game
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {recentGames.map((game) => (
              <div key={game.id} className="rounded-lg overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
