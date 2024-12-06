import React, { useState, useEffect } from "react";
import banner_image from "../../assets/banner_image.png";
import banner_image2 from "../../assets/banner_image2.png";
import logo from "../../assets/logo.png";
import pPlay from "../../assets/PlayP.png";
import GameCard from "../../Components/GameCard";
import { getPulseProfile } from "../../utils/function";
import Footer from "./Footer";

const generateRandomString = (length) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
};

const generateSeeds = (game) => ({
  ...game,
  stringSeed1: generateRandomString(3),
  stringSeed2: generateRandomString(3),
});

function Landing() {
  const [currentBg, setCurrentBg] = useState(banner_image);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [userInfo, setUserInfo] = useState(null);

  const [gameJson] = useState(() =>
    [
      {
        id: 2,
        url: "https://4-cards-new.vercel.app/",
        name: "4 Cards",
        imageURL:
          "https://s3-alpha-sig.figma.com/img/e08e/1367/74c8b2102b00663c1f4fd67e90ec1804?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b-Op49WX4lIa14vpce6qlHGD-tNTCL9KmBEvNkSUoasR5ukkV25HeOTGRCfMXaHJjL0MnR8boJYz4poMAjclzgLTl7wKt-GY2ftrgvhmCr2~WUsrICXqX0b3iStA1AzVlHVwvP9JzuLFanIJqpN30F8dGmgD~c1MoJMrXS9sWuucXtBKlh8xfLSm9a0Ib331hhanthx5xTgt330oCx0sr11ejRzPqscuHojYGYln2W~Pv1iP6SdX1NAPmSuWE7eoDE9nrYc64OMrzDhlQvHIAv6KrrwFiHcbmWFARR5QTab72mmiz1glCAjiPkRUWlRcSPcPgRkmKFBq3DIjtGJYaA__",
      },
      {
        id: 3,
        url: "hhttps://itch.io/embed-upload/1880291?color=333333",
        name: "Just Slide",
        width: "720px",
        height: "680px",
        imageURL:
          "https://images.deso.org/4503d3a10e2827f6b2d78e8b4568120445fbae36917ab31d1a86225e20504029.webp",
      },
      {
        id: 4,
        url: "https://weave-word.vercel.app/",
        name: "Weave Word",
        imageURL:
          "https://images.deso.org/55d6ac4f5171f65fa692fee56865e0a35365d86ca55ea62869152315c6dec6c4.webp",
      },
      {
        id: 5,
        url: "https://chess_arlink.ar-io.dev/",
        name: "Chess",
        imageURL:
          "https://images.deso.org/7c25f0f38bf9b5bd03e931932693e4e9dec3f47803187deb995614e14ea59919.webp",
      },
      {
        id: 6,
        url: "https://bsehovac.github.io/the-cube/",
        name: "The Cube",
        imageURL:
          "https://images.deso.org/d5fe838984221dc1b6c386c20f3ca089c4ab28b965e83e4669645459d2c70685.webp",
      },
      {
        id: 7,
        url: "https://bobrov.dev/pacman-pwa/",
        name: "Pacman",
        imageURL:
          "https://images.deso.org/4f02c9225b8956f37cae50f1012734e72a70dd55e0f40d2b8a94cabe031b6f93.webp",
      },
      {
        id: 8,
        url: "https://www.towergame.app/",
        name: "Tower Game",
        imageURL:
          "https://images.deso.org/7d0ff79a7a6a9537d625beab63ebbe53d44a4a89bdb08264e8ba277310f0c25e.webp",
      },
      {
        id:9,
        url: "https://snake-pwa.github.io/",
        name: "Snake",
        imageURL:
          "https://images.deso.org/d7b067b572358f18e2cb3c59c9c0152d8bfaa74933512cb1f364ed5184371f64.webp",
      },
      {
        id: 11,
        url: "https://game318298.konggames.com/gamez/0031/8298/live/index.html?kongregate_game_version=1586601715&kongregate_host=www.congregate.com",
        name: "Fruit Reset",
        imageURL: "https://images.deso.org/70c1731773928fabee8d7350b7c0d979efd5a823a615c6334e682411c8ef62b9.webp",

      },
      {
        id: 10,
        url: "https://game323505.konggames.com/gamez/0032/3505/live/index.html",
        name: "Just Slide Remastered",
        imageURL: "https://images.deso.org/3f8a6b7e6f4557d5391942875167a3204274ba9c6e1ffdddffb7e541bb9e45ec.webp"
      }
    ].map(generateSeeds)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentBg((prev) =>
          prev === banner_image ? banner_image2 : banner_image
        );
        setIsTransitioning(false);
      }, 600);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  async function initializePulseProfile() {
    const wallet = JSON.parse(localStorage.getItem("wallet"));
    window.arweaveWallet = wallet;

    const address = localStorage.getItem("address");

    const response = await getPulseProfile(address);

    console.log(response);

    if (response.status === "error") {
      console.log("Error fetching profile");
      return;
    }

    setUserInfo(response.data);
  }

  useEffect(() => {
    if (localStorage.getItem("wallet")) {
      initializePulseProfile();
    }
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
            backgroundImage: `url(${
              currentBg === banner_image ? banner_image2 : banner_image
            })`,
            opacity: isTransitioning ? 1 : 0,
          }}
        />

        <div className="relative h-full">
          <nav className="px-8 py-4 bg-black/5  flex justify-between items-center">
            <div className="navbar-brand flex items-center">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
              <p className="text-[#EAEAEA] text-2xl font-medium mt-2 -ml-1">
                trl Play
              </p>
            </div>

            <div className="flex items-center space-x-6">
              {/* <a href="#leaderboards" className="text-[#EAEAEA] font-medium text-sm hover:text-gray-300 transition-colors">
                LEADERBOARDS
              </a> */}

              {userInfo && (
                <a className="ml-4 flex space-x-3 text-[#EAEAEA] text-sm items-center"
              href = {`/profile/${userInfo.address}`}
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
          <a
            className="bg-red-500 w-full h-20 absolute bottom-56 opacity-0 scroll-smooth"
            href="#games"
          ></a>
        </div>
      </div>

      <div className="w-full bg-[#15151a] py-6 px-4">
        <div className="flex justify-center">
          <div className="flex items-end">
            <img src={logo} alt="Logo" className="h-28 w-auto" />
            <p className="text-[#EAEAEA] text-7xl font-medium -ml-3">trl</p>
          </div>

          <div className="flex items-end ml-6">
            <p className="text-[#EAEAEA] text-7xl font-medium -ml-3">Play</p>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <p
            className="text-[#EAEAEA] text-2xl leading-9 tracking-widest"
            id="games"
          >
            Keep
            <span className="text-[#FFEA00] ml-2 mr-2">Ctrl</span>
            and <span className="text-[#FF007A] ml-1">Play</span> the Games
          </p>
        </div>

        <div className="flex justify-center items-center bg-[#15151a] py-6 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl w-full">
            {gameJson.map((game) => (
              <div key={game.id} className="w-full flex justify-center">
                <GameCard
                  id={game.id}
                  url={game.url}
                  name={game.name}
                  imgURL={game.imageURL}
                  stringSeed1={game.stringSeed1}
                  stringSeed2={game.stringSeed2}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Landing;
