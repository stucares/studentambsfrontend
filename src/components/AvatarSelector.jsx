import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const avatarOptions = [
  { id: 1, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix', name: 'Felix' },
  { id: 2, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka', name: 'Aneka' },
  { id: 3, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Midnight', name: 'Midnight' },
  { id: 4, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Buddy', name: 'Buddy' },
  { id: 5, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna', name: 'Luna' },
  { id: 6, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max', name: 'Max' },
  { id: 7, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rocky', name: 'Rocky' },
  { id: 8, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie', name: 'Charlie' },
  { id: 9, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bella', name: 'Bella' },
  { id: 10, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Milo', name: 'Milo' },
  { id: 11, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daisy', name: 'Daisy' },
  { id: 12, url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cooper', name: 'Cooper' },
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
            <p className="font-semibold">
              {avatarOptions.find(a => a.url === selectedAvatar)?.name || 'Select Avatar'}
            </p>
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
                  alt={avatar.name}
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
