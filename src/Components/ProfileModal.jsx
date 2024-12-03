import React, { useState } from "react";
import { X } from "lucide-react";
import girl1 from "../assets/girl1.png";
import boy1 from "../assets/boy1.png";
import boy3 from "../assets/boy3.png";
import boy4 from "../assets/boy4.png";

import toast, { Toaster } from "react-hot-toast";

import { createPulseProfile } from "../utils/function";
const avatars = [
  {
    id: 1,
    src: "https://cdn.discordapp.com/attachments/906173504225951776/1313632280023011358/IMG_4882.png?ex=6750d6e5&is=674f8565&hm=b68f42ac575e3f37dc84967fc3d77a8fad66b533b323cf5cf88d6d8515733f81&",
    alt: "Female avatar with blue hair and glasses",
  },
  {
    id: 2,
    src: "https://cdn.discordapp.com/attachments/906173504225951776/1313632068520902686/IMG_4877.png?ex=6750d6b3&is=674f8533&hm=ff3594b706c3778a3916e9c5f1b06fd1316e59839df45f6a21ab2b2b7e305d26&",
    alt: "Male avatar with beard and cap",
  },
  {
    id: 3,
    src: "https://cdn.discordapp.com/attachments/906173504225951776/1313632519773753478/IMG_4884.png?ex=6750d71e&is=674f859e&hm=679d5c58aa6866ac094c52680a921290b05f4010b4b112fc2d8b432f607ff25a&",
    alt: "Male avatar with headphones",
  },
  {
    id: 4,
    src: "https://cdn.discordapp.com/attachments/906173504225951776/1313632731435110420/IMG_4883.png?ex=6750d751&is=674f85d1&hm=4808169eca22d82f0f5d3329f644fdaee41227e8034dd8aaaab8d7b11b483181&",
    alt: "Male avatar with sunglasses and hat",
  },
];

const ProfileModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && selectedAvatar) {
      onSubmit({ name, avatarId: selectedAvatar });
      setName("");
      setSelectedAvatar(null);
    }
  };

  if (!isOpen) return null;

  async function handleProfileSubmit() {
    try {
      //check if an avatar is selected
      if (!selectedAvatar) {
        toast.error("Please select an avatar");
        return;
      }

      const loadingToast = toast.loading("Creating profile...");

      const wallet = localStorage.getItem("wallet");
      window.arweaveWallet = JSON.parse(wallet);
      const profile = await createPulseProfile(
        name,
        name,
        avatars.find((avatar) => avatar.id === selectedAvatar).src,
        window.arweaveWallet
      );

      console.log(profile);


      toast.dismiss(loadingToast);
      if(profile.status === "error") {
        
        toast.error("Error creating profile. ");
        return;
      }
      toast.success("Profile created successfully!");


      onClose();
    } catch (error) {
      console.error("Error creating profile:", error);
      toast.error("Error creating profile");
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <Toaster />
      <div className=" rounded-lg  p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#EAEAEA]"
        >
          <X size={24} />
        </button>

        <div  className="space-y-6">
          <div className="text-center">
            <h2 className="text-4xl mt-8 font-bold text-[#EAEAEA] mb-2">
              Create Your Profile!
            </h2>
            <h2 className="text-2xl mt-10 font-bold text-[#EAEAEA] mb-2">
              What should we call you?
            </h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-800 text-[#EAEAEA] border mt-3 border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#EAEAEA] text-center mt-10">
              Select an avatar
            </h3>
            <div className="grid grid-cols-4 gap-4 mt-8">
              {avatars.map((avatar) => (
                <button
                  key={avatar.id}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar.id)}
                  className={`rounded-full p-1 transition-all ${
                    selectedAvatar === avatar.id
                      ? "bg-cyan-400 scale-110"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <img
                    src={avatar.src}
                    alt={avatar.alt}
                    className="w-16 h-16 rounded-full"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => {
                handleProfileSubmit();
              }}
              className=" bg-cyan-400  py-2 px-8 rounded-lg mx-auto hover:bg-cyan-300  text-[#ffea00] font-semibold"
            >
              Create Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
