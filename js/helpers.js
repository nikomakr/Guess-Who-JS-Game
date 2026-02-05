// Trait display configuration
export const TRAIT_MAP = {
  glasses: "Glasses",
  hat: "Hat",
  beard: "Beard",
  smile: "Smile",
};

// Color palette for trait visual variety
export const TRAIT_COLORS = [
  "#3498db",
  "#e74c3c",
  "#2ecc71",
  "#f39c12",
  "#9b59b6",
  "#1abc9c",
  "#e67e22",
  "#16a085",
];

// Random color generator for trait visual variety
export function getRandomTraitColor() {
  return TRAIT_COLORS[Math.floor(Math.random() * TRAIT_COLORS.length)];
}

// Fisher-Yates shuffle algorithm
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Sound URL configuration
export const SOUND_URLS = {
  win: "https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3",
  lose: "https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3",
  start: "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3",
  yes: "https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3",
  no: "https://assets.mixkit.co/active_storage/sfx/1864/1864-preview.mp3",
};
