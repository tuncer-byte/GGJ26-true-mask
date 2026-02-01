export enum GameState {
  MENU = 'MENU',
  SETTINGS = 'SETTINGS',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  GAME_OVER = 'GAME_OVER',
  LEVEL_COMPLETE = 'LEVEL_COMPLETE',
  VICTORY = 'VICTORY'
}

export enum EntityType {
  PLAYER = 'PLAYER',
  PLATFORM = 'PLATFORM',
  SPIKE = 'SPIKE',
  DOOR = 'DOOR',
  TEXT = 'TEXT',
  BUTTON = 'BUTTON'
}

export enum PlatformType {
  NORMAL = 'NORMAL',       // Always visible/solid
  MASK_ONLY = 'MASK_ONLY', // Always solid, but only visible during Mask Reveal
  TOGGLE = 'TOGGLE'        // State depends on a button
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Button extends Rect {
  id: string;
  triggerKey: string; // Matches Platform triggerKey
  isPressed: boolean;
}

export interface Platform extends Rect {
  id: string;
  type: PlatformType;
  triggerKey?: string;   // Connects to a button
  isActive: boolean;     // Current state (solid/visible or not)
  initiallyActive: boolean; // State on level load
}

export interface Spike extends Rect {
  id: string;
  // If true, spike is only visible during Mask Reveal, but ALWAYS deadly.
  maskDependent: boolean; 
}

export interface Door extends Rect {
  id: string;
  reqMaskOff: boolean; 
}

export interface WorldText {
  id: string;
  x: number;
  y: number;
  text: string;
  opacity: number;
}

export interface LevelData {
  id: number;
  name: string;
  startPos: { x: number; y: number };
  platforms: Platform[];
  spikes: Spike[];
  buttons: Button[];
  door: Door;
  texts: WorldText[];
  description: string;
  revealDuration: number; // How long the mask stays active in ms
}

export interface Player extends Rect {
  vx: number;
  vy: number;
  isGrounded: boolean;
  sanity: number;
  revealTimer: number; // Time remaining for mask vision
  facingRight: boolean;
  dead: boolean;
}