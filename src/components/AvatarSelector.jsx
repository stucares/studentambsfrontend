import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const avatarOptions = [
  { id: 1, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Alex&backgroundColor=b6e3f4' },
  { id: 2, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Sam&backgroundColor=c0aede' },
  { id: 3, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Jordan&backgroundColor=ffd5dc' },
  { id: 4, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Taylor&backgroundColor=d1f4e0' },
  { id: 5, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Morgan&backgroundColor=ffe8cc' },
  { id: 6, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Casey&backgroundColor=ffeaa7' },
  { id: 7, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Riley&backgroundColor=fab1a0' },
  { id: 8, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Jamie&backgroundColor=74b9ff' },
  { id: 9, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Dakota&backgroundColor=a29bfe' },
  { id: 10, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Avery&backgroundColor=fd79a8' },
  { id: 11, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Parker&backgroundColor=81ecec' },
  { id: 12, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Quinn&backgroundColor=55efc4' },
  { id: 13, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=River&backgroundColor=ff9ff3' },
  { id: 14, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Skyler&backgroundColor=feca57' },
  { id: 15, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Jaden&backgroundColor=54a0ff' },
  { id: 16, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Sage&backgroundColor=5f27cd' },
];

const AvatarSelector = ({ selectedAvatar, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-gray-700">Choose Your Avatar</label>

      {/* Selected Avatar Display */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer bg-white border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-all shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 p-1">
            <img
              src={selectedAvatar || avatarOptions[0].url}
              alt="Selected avatar"
              className="w-full h-full rounded-full bg-white object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Selected Avatar</p>
            <p className="text-sm text-gray-500">Click to change</p>
          </div>
        </div>
      </div>

      {/* Avatar Grid */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 bg-white border border-gray-200 rounded-xl p-4 shadow-lg"
        >
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {avatarOptions.map((avatar) => (
              <motion.div
                key={avatar.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onSelect(avatar.url);
                  setIsOpen(false);
                }}
                className={`relative cursor-pointer rounded-full p-1 transition-all ${selectedAvatar === avatar.url
                    ? 'bg-gradient-to-br from-primary-500 to-accent-500 ring-2 ring-primary-500'
                    : 'bg-gray-100 hover:bg-gray-200'
                  }`}
              >
                <img
                  src={avatar.url}
                  alt={`Avatar ${avatar.id}`}
                  className="w-full h-full rounded-full bg-white object-cover"
                />
                {selectedAvatar === avatar.url && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border border-white">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AvatarSelector;
