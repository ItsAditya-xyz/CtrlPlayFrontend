import React, { useState, useEffect } from "react";
import banner_image from "../../assets/banner_image.png";
import banner_image2 from "../../assets/banner_image2.png";
import logo from "../../assets/logo.png";
import pPlay from "../../assets/PlayP.png";

function Landing() {
  const [currentBg, setCurrentBg] = useState(banner_image);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentBg((prev) =>
          prev === banner_image ? banner_image2 : banner_image
        );
        setIsTransitioning(false);
      }, 500);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Extended text bar that goes beyond the background */}

      {/* Main content area with background */}
      <div className="relative w-screen h-screen overflow-hidden">
        <div
          className="absolute inset-0  bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${currentBg})`,
            opacity: isTransitioning ? 0 : 1,
          }}
        />
        <div
          className="absolute inset-0  bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${
              currentBg === banner_image ? banner_image2 : banner_image
            })`,
            opacity: isTransitioning ? 1 : 0,
          }}
        />

        {/* Content container with relative positioning */}
        <div className="relative h-full">
          {/* Navbar */}
          <nav className="px-8 py-4 bg-black/30 backdrop-blur-md flex justify-between items-center">
            {/* Logo */}
            <div className="navbar-brand">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-6">
              <a
                href="#home"
                className="text-white text-sm font-medium hover:text-gray-300 transition-colors"
              >
                HOME
              </a>
              <a
                href="#games"
                className="text-white font-medium text-sm hover:text-gray-300 transition-colors"
              >
                GAMES
              </a>
              <a
                href="#leaderboards"
                className="text-white font-medium text-sm hover:text-gray-300 transition-colors"
              >
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
        </div>
      </div>

      <div className="w-full bg-[#15151a] py-6 px-4">
        <div className="flex justify-center">
          <div className="flex  items-end ">
            <img src={logo} alt="Logo" className="h-36 w-auto " />
            <p className="text-white text-6xl font-medium -ml-3">trl</p>
          </div>

          <div className="flex items-end ml-6">
            <img src={pPlay} alt="Play" className="h-28 w-auto ml-auto" />
            <p className="text-white text-6xl font-medium -ml-3 ">lay</p>
          </div>
        </div>

          <div className="flex justify-center mt-5">

     
        <p className="text-white text-2xl leading-9 tracking-widest">
          Keep
          <span className="text-[#FFEA00] ml-2 mr-2">Ctrl</span>
          and <span className="text-[#FF007A] ml-1">Play</span> the Game
        </p>
        </div>
      </div>

      <div
      className="flex justify-center items-center bg-[#15151a] py-6 px-4"
      >

        

      </div>
    </>
  );
}

export default Landing;
