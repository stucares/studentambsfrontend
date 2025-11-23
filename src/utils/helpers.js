export const getLevelInfo = (referralCount) => {
  if (referralCount === 0) {
    return { name: 'Rookie', emoji: '🌱', color: 'bg-gray-500', next: 1, progress: 0 };
  } else if (referralCount >= 1 && referralCount <= 10) {
    return { name: 'Hustler', emoji: '🔥', color: 'bg-orange-500', next: 11, progress: (referralCount / 10) * 100 };
  } else if (referralCount >= 11 && referralCount <= 39) {
    return { name: 'Pro', emoji: '⭐', color: 'bg-yellow-500', next: 40, progress: ((referralCount - 10) / 29) * 100 };
  } else if (referralCount >= 40 && referralCount <= 79) {
    return { name: 'Master', emoji: '💎', color: 'bg-blue-500', next: 80, progress: ((referralCount - 39) / 40) * 100 };
  } else if (referralCount >= 80 && referralCount <= 199) {
    return { name: 'Grandmaster', emoji: '👑', color: 'bg-purple-500', next: 200, progress: ((referralCount - 79) / 120) * 100 };
  } else {
    return { name: 'Ace', emoji: '🏆', color: 'bg-gradient-to-r from-yellow-400 to-pink-500', next: null, progress: 100 };
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};
