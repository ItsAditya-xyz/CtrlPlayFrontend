import React, { useState } from 'react';
import { X } from 'lucide-react';
import girl1 from "../assets/girl1.png"
import boy1 from "../assets/boy1.png"
import boy3 from "../assets/boy3.png";
import boy4 from "../assets/boy4.png";
const avatars = [
  {
    id: 1,
    src: boy1,
    alt: "Female avatar with blue hair and glasses"
  },
  {
    id: 2,
    src: girl1,
    alt: "Male avatar with beard and cap"
  },
  {
    id: 3,
    src: boy3,
    alt: "Male avatar with headphones"
  },
  {
    id: 4,
    src: boy4,
    alt: "Male avatar with sunglasses and hat"
  }
];

const ProfileModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && selectedAvatar) {
      onSubmit({ name, avatarId: selectedAvatar });
      setName('');
      setSelectedAvatar(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg  p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              What should we call you?
            </h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white text-center">
              Select an avatar for you
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {avatars.map((avatar) => (
                <button
                  key={avatar.id}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar.id)}
                  className={`rounded-full p-1 transition-all ${
                    selectedAvatar === avatar.id
                      ? 'bg-blue-500 scale-110'
                      : 'hover:bg-gray-700'
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

          <button
            type="submit"
            disabled={!name || !selectedAvatar}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Play
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;