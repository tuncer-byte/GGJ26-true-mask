export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

// Physics - Bouncy Cartoon Physics
export const GRAVITY = 0.65; // Reduced slightly for better air time
export const FRICTION = 0.85;
export const MOVE_SPEED = 6;
export const JUMP_FORCE = -14; // Increased from -12.5 to help reach platforms
export const DOUBLE_JUMP_FORCE = -12; // Slightly lower for the second jump
export const MAX_JUMPS = 2;
export const MAX_FALL_SPEED = 16;

// Player
export const PLAYER_WIDTH = 40;
export const PLAYER_HEIGHT = 40;
export const MAX_SANITY = 100;
export const SANITY_COST_PER_USE = 15;
export const SANITY_REGEN_RATE = 0.25;

// Colors - Vibrant Cartoon Palette
export const COLORS = {
  background: {
    normal: '#8EC5FC', // Sky Blue
    mask: '#4B0082',   // Deep Purple (Magic Mode)
  },
  player: {
    body: '#FFD700',   // Golden Yellow
    outline: '#000000'
  },
  platform: {
    normal: '#7CAFC2',    // Concrete/Blue-ish
    maskOnly: '#E040FB',  // Neon Purple (Magic)
    toggleActive: '#FF9800', // Orange for activated platforms
    toggleInactive: 'rgba(255, 152, 0, 0.3)', // Ghostly orange
    outline: '#000000'
  },
  button: {
    base: '#607D8B',
    topUnpressed: '#FF5252', // Red button
    topPressed: '#4CAF50',   // Green when pressed
  },
  spike: '#FF4444',
  door: '#4CAF50',
  text: '#333333',
  ui: {
    barBg: '#ffffff',
    barFill: '#FFD700',
    barBorder: '#000000'
  }
};