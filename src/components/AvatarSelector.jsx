import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const avatarOptions = [
  { id: 1, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4' },
  { id: 2, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam&backgroundColor=c0aede' },
  { id: 3, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan&backgroundColor=ffd5dc' },
  { id: 4, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor&backgroundColor=d1f4e0' },
  { id: 5, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan&backgroundColor=ffe8cc' },
  { id: 6, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Casey&backgroundColor=ffeaa7' },
  { id: 7, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Riley&backgroundColor=fab1a0' },
  { id: 8, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie&backgroundColor=74b9ff' },
  { id: 9, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dakota&backgroundColor=a29bfe' },
  { id: 10, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Avery&backgroundColor=fd79a8' },
  { id: 11, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Parker&backgroundColor=81ecec' },
  { id: 12, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Quinn&backgroundColor=55efc4' },
];

const AvatarSelector = ({ selectedAvatar, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Choose Your Avatar</label>
      
      {/* Selected Avatar Display */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer glass-card p-4 hover:bg-white/15 transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 p-1">
            <img 
              src={selectedAvatar || avatarOptions[0].url} 
              alt="Selected avatar"
              className="w-full h-full rounded-full bg-white"
            />
          </div>
          <div>
            <p className="font-semibold">Selected Avatar</p>
            <p className="text-sm text-gray-400">Click to change</p>
          </div>
        </div>
      </div>

      {/* Avatar Grid */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 glass-card p-4"
        >
          <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
            {avatarOptions.map((avatar) => (
              <motion.div
                key={avatar.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onSelect(avatar.url);
                  setIsOpen(false);
                }}
                className={`relative cursor-pointer rounded-full p-1 transition-all ${
                  selectedAvatar === avatar.url
                    ? 'bg-gradient-to-br from-primary-500 to-accent-500 ring-4 ring-primary-500/50'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <img 
                  src={avatar.url} 
                  alt={`Avatar ${avatar.id}`}
                  className="w-full h-full rounded-full bg-white"
                />
                {selectedAvatar === avatar.url && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
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
