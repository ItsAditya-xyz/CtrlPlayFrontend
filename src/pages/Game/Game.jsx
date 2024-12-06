import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Power, Volume2, Settings } from "lucide-react";
import games from "./games.json";
import logo from "../../assets/logo.png";
import pPlay from "../../assets/PlayP.png";
import ProfileModal from "../../Components/ProfileModal";
import toast, { Toaster } from "react-hot-toast";

import {
  createCommentOnID,
  getCommentsForID,
  getPulseProfile,
  getUsersFromlistOfIDs,
} from "../../utils/function";
const GamePage = () => {
  const { id } = useParams();
  const [isPowered, setIsPowered] = useState(true);
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const game = games.find((g) => g.id === parseInt(id, 10));
  const [hoveredStar, setHoveredStar] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [comment, setComment] = useState("");

  const [userInfo, setUserInfo] = useState(null);

  const [commenterInfo, setCommenterInfo] = useState(null);

  const handleProfileSubmit = (profileData) => {
    console.log(profileData); // { name: string, avatarId: number }
    setIsModalOpen(false);
  };

  const [rating, setRating] = useState(0);

  const [comments, setComments] = useState([]);

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

  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      } else if (iframeRef.current.webkitRequestFullscreen) {
        iframeRef.current.webkitRequestFullscreen();
      } else if (iframeRef.current.mozRequestFullScreen) {
        iframeRef.current.mozRequestFullScreen();
      } else if (iframeRef.current.msRequestFullscreen) {
        iframeRef.current.msRequestFullscreen();
      }
    }
  };

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

  async function getComments() {
    const commentVal = await getCommentsForID(id);
    console.log(commentVal.data.comments);

 

    //get list of commenter ids
    const commenterIDs = commentVal.data.comments.map(
      (comment) => `${comment.user_id}`
    );
    console.log(commenterIDs);

    const commenterInfo = await getUsersFromlistOfIDs(commenterIDs);
    
    console.log(commenterInfo.data);
    setCommenterInfo(commenterInfo.data);

    setComments(commentVal.data.comments);

    return;
  }

  async function handlePostComment() {
    if (!userInfo) {
      setIsModalOpen(true);
      return;
    }

    //if no comments show error
    if (!comment) {
      toast.error("Please write a comment");
      return;
    }

    //create comment process

    const loadingToast = toast.loading("Posting comment...");

    const wallet = localStorage.getItem("wallet");
    window.arweaveWallet = JSON.parse(wallet);

    const commentResponse = await createCommentOnID(
      id,
      comment,
      window.arweaveWallet
    );

    console.log(commentResponse);

    toast.dismiss(loadingToast);
    if (commentResponse.status === "error") {
      toast.error(commentResponse.message);
      return;
    } else {
      toast.success("Comment posted successfully");
      setComment("");
      getComments();
    }
  }

  useEffect(() => {
    if (localStorage.getItem("wallet")) {
      initializePulseProfile();
      getComments();
    }
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
      <Toaster />
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

                {!isPowered && (
                  <div className="flex justify-center mt-64  items-center ">
                    <div className="flex items-end">
                      <img src={logo} alt="Logo" className="h-36 w-auto" />
                      <p className="text-[#33241B] text-6xl font-bold -ml-3">
                        trl
                      </p>
                    </div>

                    <div className="flex items-end ml-6">
                      <img
                        src={pPlay}
                        alt="Play"
                        className="h-28 w-auto ml-auto"
                      />
                      <p className="text-[#33241B] text-6xl font-bold -ml-3">
                        lay
                      </p>
                    </div>
                  </div>
                )}

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
                </div>

                {/* Game Content */}
                <div
                  ref={containerRef}
                  className={`relative h-full rounded-xl overflow-hidden transition-opacity duration-1000 ${
                    isPowered ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="absolute inset-4 flex items-center justify-center bg-black rounded-lg">
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
                      allowFullScreen
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
                  <a
                    className="px-4 py-1 bg-[#463225] rounded-sm text-[#967c6d] text-xs font-mono"
                    href="/#games"
                  >
                    CTRL PLAY
                  </a>
                </div>
                {/* Channel Controls */}
                <div className="flex gap-6">
                  <button
                    className="w-10 h-10 rounded-full text-[#967c6d] bg-[#463225] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] flex items-center justify-center"
                    onClick={handleFullscreen}
                  >
                    {`[ ]`}
                  </button>

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
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-8 rounded-xl overflow-hidden ">
          {/* Game Info Section */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-[#EAEAEA] mb-2">
                  {game.name}
                </h1>
                <p className="text-gray-400 text-sm">
                  Created by{" "}
                  <span className="text-cyan-400">{game.creator}</span>
                </p>
              </div>

              {/* Rating Section */}
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className="focus:outline-none transform transition-all duration-300 hover:scale-110"
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => {
                        if (!userInfo) {
                          setIsModalOpen(true);
                        }
                        setRating(star);
                      }}
                    >
                      <svg
                        className={`w-6 h-6 ${
                          star <= (hoveredStar || rating)
                            ? "text-cyan-400"
                            : "text-gray-600"
                        } transition-colors duration-300`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-400">
                  Rating: {game.ratings}/5
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <textarea
              onFocus={() => {
                if (!userInfo) {
                  setIsModalOpen(true);
                }
              }}
              className="w-full p-4 text-sm bg-[#24242f] text-[#EAEAEA] rounded-xl border border-gray-700 focus:outline-none focus:border-[#FF007A] focus:ring-1 focus:ring-[#FF007A] placeholder-gray-500 transition-all duration-300"
              placeholder="Write a comment..."
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <ProfileModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleProfileSubmit}
            />
            <div className="flex justify-end mt-2">
              <button
                className="bg-cyan-500 text-[#EAEAEA] px-4 py-2 text-sm rounded-full transform transition-all duration-300 hover:bg-cyan-400 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 active:scale-95"
                onClick={() => {
                  handlePostComment();
                }}
              >
                Post Comment
              </button>
            </div>
          </div>
          {/* Comments Section */}
          <div className=" p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#EAEAEA]">Comments</h2>
            </div>

            {/* Comments List */}
            <div className="space-y-4 -z-20">
              {comments.map((comment) => (
                <div
                  key={comment.comment_id}
                  className="bg-[#24242f] p-4 rounded-xl transform transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <img
                        src={commenterInfo[parseInt(comment.user_id)].profile_picture_url}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://diamondapp.com/assets/img/default-profile-pic.png";
                        }
                        }
                 
                        className="w-10 h-10 rounded-full border-2 border-cyan-500/20"
                      />
                      <div className="ml-3">
                        <span className=" text-[#EAEAEA] text-base">
                        {commenterInfo[parseInt(comment.user_id)].username}
                        </span>
                        {/* <p className="text-gray-500 text-xs">
                          {comment.timeAgo}
                        </p> */}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-3 text-sm  font-extralight">
                    {comment.content}
                  </p>
                  <div className="flex items-center text-sm text-gray-400">
                    <button className="flex items-center space-x-1 group">
                      <svg
                        className="w-5 h-5 transition-colors duration-300 group-hover:text-cyan-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="transition-colors duration-300 group-hover:text-cyan-400">
                        {comment.likes} likes
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment Box */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;

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
