import React, { useState, useEffect } from "react";
import banner_image from "../../assets/banner_image.png";
import banner_image2 from "../../assets/banner_image2.png";
import logo from "../../assets/logo.png";
import pPlay from "../../assets/PlayP.png";
import GameCard from "../../Components/GameCard";

const generateRandomString = (length) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
};

const generateSeeds = (game) => ({
  ...game,
  stringSeed1: generateRandomString(3),
  stringSeed2: generateRandomString(3)
});

function Landing() {
  const [currentBg, setCurrentBg] = useState(banner_image);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [gameJson] = useState(() => [
    {
      id: 1,
      url: "https://4-cards-new.vercel.app/",
      name: "4 Cards",
      imageURL: "https://s3-alpha-sig.figma.com/img/e08e/1367/74c8b2102b00663c1f4fd67e90ec1804?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b-Op49WX4lIa14vpce6qlHGD-tNTCL9KmBEvNkSUoasR5ukkV25HeOTGRCfMXaHJjL0MnR8boJYz4poMAjclzgLTl7wKt-GY2ftrgvhmCr2~WUsrICXqX0b3iStA1AzVlHVwvP9JzuLFanIJqpN30F8dGmgD~c1MoJMrXS9sWuucXtBKlh8xfLSm9a0Ib331hhanthx5xTgt330oCx0sr11ejRzPqscuHojYGYln2W~Pv1iP6SdX1NAPmSuWE7eoDE9nrYc64OMrzDhlQvHIAv6KrrwFiHcbmWFARR5QTab72mmiz1glCAjiPkRUWlRcSPcPgRkmKFBq3DIjtGJYaA__",
    },
    {
      id: 2,
      url: "hhttps://itch.io/embed-upload/1880291?color=333333",
      name: "Just Slide",
      imageURL: "https://cdn.discordapp.com/attachments/1019657011488628847/1313512365228294194/image.png?ex=67506737&is=674f15b7&hm=23f8eedf03837f9a1f75d88bfcb7dfa02dc9c99ee68edb421b888ca768dbeb9a&",
    },
    {
      id: 3,
      url: "https://weave-word.vercel.app/",
      name: "Weave Word",
      imageURL: "https://cdn.discordapp.com/attachments/906173504225951776/1313528673780895814/image.png?ex=67507668&is=674f24e8&hm=5c554b7099fea0c270d1918896b3718ce57c7cf2515e33861cfcdf1bbf74aba2&",
    },
    {
      id: 4,
      url: "https://chess_arlink.ar-io.dev/",
      name: "Chess",
      imageURL: "https://cdn.discordapp.com/attachments/1305544713733935206/1313529246471290942/image.png?ex=675076f0&is=674f2570&hm=4fe6ab5ede08ed3ae22a860b2996add292bc365afa48d64ee720ad9f4669351b&",
    },
    {
      id: 5,
      url: "https://bsehovac.github.io/the-cube/",
      name: "The Cube",
      imageURL: "https://cdn.discordapp.com/attachments/1305544713733935206/1313529474146631690/image.png?ex=67507726&is=674f25a6&hm=aaabd2512c313142a9aef5af065d834ead4faabd14e3493a90a90aa4259b0aba&",
    },
    {
      id: 6,
      url: "https://bobrov.dev/pacman-pwa/",
      name: "Pacman",
      imageURL: "https://cdn.discordapp.com/attachments/1305544713733935206/1313529686449721486/image.png?ex=67507759&is=674f25d9&hm=eb909bf3a6d5ca1ad3c9f0b19a4303b62fcf5ffa31786074547f358289fb40fe&",
    },
    {
      id: 7,
      url: "https://www.towergame.app/",
      name: "Tower Game",
      imageURL: "https://cdn.discordapp.com/attachments/1305544713733935206/1313530162515804181/image.png?ex=675077ca&is=674f264a&hm=79acfc364f827abcbfd7903fa201871ba92d0b44bd3bf93c96d688334aabbb0e&",
    },
    {
      id: 8,
      url: "https://snake-pwa.github.io/",
      name: "Snake",
      imageURL: "https://cdn.discordapp.com/attachments/1305544713733935206/1313530527080513537/image.png?ex=67507821&is=674f26a1&hm=250eb7bb73798a4be608a6636112197dc99f44384ef6445f638fd16eaab2ba7e&",
    },
  ].map(generateSeeds));

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentBg((prev) => prev === banner_image ? banner_image2 : banner_image);
        setIsTransitioning(false);
      }, 500);
    }, 300);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${currentBg})`,
            opacity: isTransitioning ? 0 : 1,
          }}
        />
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${currentBg === banner_image ? banner_image2 : banner_image})`,
            opacity: isTransitioning ? 1 : 0,
          }}
        />
        

        <div className="relative h-full">
          <nav className="px-8 py-4 bg-black/30 backdrop-blur-md flex justify-between items-center">
            <div className="navbar-brand">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
            </div>

            <div className="flex items-center space-x-6">
              <a href="#home" className="text-[#EAEAEA] text-sm font-medium hover:text-gray-300 transition-colors">
                HOME
              </a>
              <a href="#games" className="text-[#EAEAEA] font-medium text-sm hover:text-gray-300 transition-colors">
                GAMES
              </a>
              <a href="#leaderboards" className="text-[#EAEAEA] font-medium text-sm hover:text-gray-300 transition-colors">
                LEADERBOARDS
              </a>
              <div className="ml-4 cursor-pointer">
                <img
                  src="https://s3-alpha-sig.figma.com/img/5f9e/1146/fc68babcf0627ea90ca94da1b85a238c?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fapBvJQuxRh0s5p6IV903MnLm5qGEgc5cNmDeNmuyBC7gwT492QfJtBrbt8ce0rnJlPuHS84ceiFOziK3LvhoeusEvMozW3CuPRRBy8TbynS22l3EKIYnlap3d8zvnkTgHtX7AcJOQ1tQmv6Dj51G53~VSvRe6sE3HdGImooZf9xMAKUadIg7Usew7d-5qSCsDqD-T~btY~ZWAzMJ0dv9jQiXT95BFvePj1A9HDNXYORDfYGw3ldHQLCwuSG5FeSpVzUVejevdVLa~vIfGkqD3TnDtSmKe4VVFqBru~mpM2r1RKBMkOH0nTa7VXpmjf6e1e-f4FTeHfG9ySiwfLYBg__"
                  alt="Profile"
                  className="h-10 w-10 rounded-full border-2 border-white"
                />
              </div>
            </div>

           
          </nav>
          <a className = "bg-red-500 w-full h-20 absolute bottom-56 opacity-0 scroll-smooth"
          href = "#games"
          >
             
            </a>
        </div>
      </div>

      <div className="w-full bg-[#15151a] py-6 px-4">
        <div className="flex justify-center">
          <div className="flex items-end">
            <img src={logo} alt="Logo" className="h-36 w-auto" />
            <p className="text-[#EAEAEA] text-6xl font-medium -ml-3">trl</p>
          </div>

          <div className="flex items-end ml-6">
            <img src={pPlay} alt="Play" className="h-28 w-auto ml-auto" />
            <p className="text-[#EAEAEA] text-6xl font-medium -ml-3">lay</p>
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <p className="text-[#EAEAEA] text-2xl leading-9 tracking-widest"
          id="games"
          >
            Keep
            <span className="text-[#FFEA00] ml-2 mr-2">Ctrl</span>
            and <span className="text-[#FF007A] ml-1">Play</span> the Game
          </p>
        </div>

        <div className="flex justify-center items-center bg-[#15151a] py-6 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl w-full">
            {gameJson.map((game) => (
              <div key={game.id} className="w-full flex justify-center">
                <GameCard
                  id={game.id}
                  url={game.url}
                  name = {game.name}
                  imgURL={game.imageURL}
                  stringSeed1={game.stringSeed1}
                  stringSeed2={game.stringSeed2}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;