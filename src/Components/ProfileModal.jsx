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
    src: "https://images.deso.org/20ad62a18c9d987f57cb344161431259d8ae4559d4bb007f65229f9fc8832da1.webp",
    alt: "Female avatar with blue hair and glasses",
  },
  {
    id: 2,
    src: "https://images.deso.org/084060aeb1e2f0dcd0ca9590bb5b2d9ae0d3a71cd28b657795e561a89be665eb.webp",
    alt: "Male avatar with beard and cap",
  },
  {
    id: 3,
    src: "https://images.deso.org/303ee8557da3db7a04a8225c7339a11ba2f2c756b64d689b0e0fec7491756210.webp",
    alt: "Male avatar with headphones",
  },
  {
    id: 4,
    src: "https://images.deso.org/21157611c96fe835f4376f9652402e6dd5e857bc7e3059fea45d21c1c6f93f4a.webp",
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
        
        toast.error(profile.message);
        return;
      }
      toast.success("Profile created successfully!");

      //reload page 
      window.location.reload();

      


       

      


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


