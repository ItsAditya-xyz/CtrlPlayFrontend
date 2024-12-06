import React, { useEffect } from "react";
import { User, Clock, Edit2 } from "lucide-react";
import logo from "../../assets/logo.png";
import { useParams } from "react-router-dom";
import { getPulseProfile } from "../../utils/function";
import GameCard from "../../Components/GameCard";

import miniPC from "../../assets/miniPC.png";
import mediumConsole from "../../assets/mediumConsole.png";
import bigConsole from "../../assets/bigConsole.png";
export default function ProfilePage() {
  const [userInfo, setUserInfo] = React.useState(null);
  const { address } = useParams();

  const badges = [
    { id: 1, achieved: true, url : miniPC},
    { id: 2, achieved: false, url: mediumConsole },
    { id: 3, achieved: false , url:bigConsole},
  ];

  const recentGames = [
    { id: 1, title: "Game 1", image: "/api/placeholder/200/200" },
    { id: 2, title: "Game 2", image: "/api/placeholder/200/200" },
  ];

  const [gameJson] = React.useState(() => [
    {
      id: 2,
      url: "https://4-cards-new.vercel.app/",
      name: "4 Cards",
      imageURL:
        "https://s3-alpha-sig.figma.com/img/e08e/1367/74c8b2102b00663c1f4fd67e90ec1804?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b-Op49WX4lIa14vpce6qlHGD-tNTCL9KmBEvNkSUoasR5ukkV25HeOTGRCfMXaHJjL0MnR8boJYz4poMAjclzgLTl7wKt-GY2ftrgvhmCr2~WUsrICXqX0b3iStA1AzVlHVwvP9JzuLFanIJqpN30F8dGmgD~c1MoJMrXS9sWuucXtBKlh8xfLSm9a0Ib331hhanthx5xTgt330oCx0sr11ejRzPqscuHojYGYln2W~Pv1iP6SdX1NAPmSuWE7eoDE9nrYc64OMrzDhlQvHIAv6KrrwFiHcbmWFARR5QTab72mmiz1glCAjiPkRUWlRcSPcPgRkmKFBq3DIjtGJYaA__",
    },

    {
      id: 8,
      url: "https://www.towergame.app/",
      name: "Tower Game",
      imageURL:
        "https://images.deso.org/7d0ff79a7a6a9537d625beab63ebbe53d44a4a89bdb08264e8ba277310f0c25e.webp",
    },
  ]);

  async function initalizeUserInfo() {
    const userInfo = await getPulseProfile(address);

    console.log(userInfo);

    setUserInfo(userInfo.data);
  }

  useEffect(() => {
    if (!address) return;
    initalizeUserInfo();
  }, [address]);

  return (
    <div className="min-h-screen bg-[#15151A] text-white px-8 pt-4">
      <nav className="px-8 py-1  flex justify-between items-center">
        <a className="navbar-brand flex items-center" href="/">
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

      {!userInfo && <>
      

        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400" />
        </div>

      </>}

      {userInfo && (
        <div className=" mx-auto mt-6">
          {/* Header Section */}

          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-start mb-12">
              <div className="relative">
                {/* Profile Picture with Badge */}
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-yellow-400 relative">
                  <img
                    src={userInfo.profile_picture_url}
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
                <h1 className="text-4xl text-cyan-400 mb-4">
                  {userInfo.username}
                </h1>
                <div className="space-y-2">
                  <p className="text-white">
                    Rank <span className="text-xl ml-2">#8</span>
                  </p>
                  <p className="text-white text-xl">
                    Hours Played <span className=" ml-2">35h</span>
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
                      className={`w-14 h-14 rounded-full ${
                        badge.achieved ? "" : ""
                      } flex items-center justify-center`}
                    >
                     <img 
                     src = {badge.url}
                     
                     alt="Badge" className="w-14 h-14 rounded-full" />
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
          </div>

          {/* Recently Played */}
          <div className="mx-auto  max-w-3xl">
            <h2 className="text-2xl mb-4 text-yellow-400">
              Recently Played Game
            </h2>
            <div className="flex justify-center items-center bg-[#15151a] py-6 px-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols- xl:grid-cols-3 gap-6 max-w-7xl w-full">
                {gameJson.map((game) => (
                  <div key={game.id} className="w-full flex justify-center">
                    <GameCard
                      id={game.id}
                      url={game.url}
                      name={game.name}
                      imgURL={game.imageURL}
                      stringSeed1={"stringSeed1"}
                      stringSeed2={"stringSeed2"}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
