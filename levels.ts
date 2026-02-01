import { LevelData, PlatformType } from './types';

export const LEVELS: LevelData[] = [
  {
    id: 1,
    name: "Level 1: The Veil",
    description: "The world is broken. Press 'E' to reveal the truth and bridge the gap.",
    revealDuration: 5000,
    startPos: { x: 50, y: 500 },
    platforms: [
      { id: 'start_floor', x: 0, y: 560, w: 300, h: 40, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'end_floor', x: 500, y: 560, w: 300, h: 40, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      // Hidden bridge
      { id: 'bridge1', x: 320, y: 500, w: 60, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
      { id: 'bridge2', x: 420, y: 500, w: 60, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
    ],
    spikes: [
      { id: 'pit_hazard', x: 300, y: 580, w: 200, h: 20, maskDependent: false } // Always there
    ],
    buttons: [],
    door: { id: 'd1', x: 700, y: 480, w: 60, h: 80, reqMaskOff: false },
    texts: [
      { id: 't1', x: 100, y: 450, text: "A/D Move, SPACE Jump", opacity: 0.8 },
      { id: 't2', x: 300, y: 350, text: "[E] Reveal the Path", opacity: 1 },
    ]
  },
  {
    id: 2,
    name: "Level 2: Thorn Tower",
    description: "The truth hurts. Traps appear when you look too closely.",
    revealDuration: 4000,
    startPos: { x: 50, y: 500 },
    platforms: [
      { id: 'floor', x: 0, y: 560, w: 800, h: 40, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      // Climb
      { id: 'p1', x: 150, y: 450, w: 100, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'p2', x: 50, y: 350, w: 100, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true }, // Hidden
      { id: 'p3', x: 200, y: 250, w: 100, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'p4', x: 400, y: 200, w: 100, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true }, // Hidden
      { id: 'p5', x: 600, y: 150, w: 150, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
    ],
    spikes: [
      // These spikes only appear when Mask is ON.
      // Placed slightly above platforms or in jump arcs to force timing.
      { id: 's1', x: 170, y: 410, w: 60, h: 40, maskDependent: true }, 
      { id: 's2', x: 220, y: 210, w: 60, h: 40, maskDependent: true },
      { id: 's3', x: 500, y: 150, w: 40, h: 40, maskDependent: true }, // Air hazard
    ],
    buttons: [],
    door: { id: 'd2', x: 650, y: 70, w: 60, h: 80, reqMaskOff: false },
    texts: [
      { id: 't1', x: 200, y: 500, text: "Red spikes only exist in the Truth.", opacity: 0.8 }
    ]
  },
  {
    id: 3,
    name: "Level 3: Mechanism",
    description: "A closed door needs a key. Find the switch.",
    revealDuration: 3000,
    startPos: { x: 50, y: 300 },
    platforms: [
      { id: 'start_plat', x: 0, y: 350, w: 150, h: 40, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      
      // Path to button (Downwards)
      { id: 'down1', x: 200, y: 400, w: 80, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'down2', x: 350, y: 450, w: 80, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
      { id: 'btn_floor', x: 500, y: 500, w: 100, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      
      // Path to Door (Upwards) - Initially Ghost/Inactive
      { id: 'bridge_a', x: 250, y: 250, w: 80, h: 20, type: PlatformType.TOGGLE, isActive: false, initiallyActive: false, triggerKey: 'sw1' },
      { id: 'bridge_b', x: 400, y: 200, w: 80, h: 20, type: PlatformType.TOGGLE, isActive: false, initiallyActive: false, triggerKey: 'sw1' },
      { id: 'door_plat', x: 550, y: 150, w: 200, h: 40, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
    ],
    spikes: [
       { id: 'floor_spikes', x: 0, y: 580, w: 800, h: 20, maskDependent: false }
    ],
    buttons: [
      { id: 'b1', x: 530, y: 490, w: 40, h: 10, triggerKey: 'sw1', isPressed: false }
    ],
    door: { id: 'd3', x: 650, y: 70, w: 60, h: 80, reqMaskOff: false },
    texts: [
      { id: 't1', x: 50, y: 200, text: "The bridge is gone.", opacity: 1 },
      { id: 't2', x: 450, y: 550, text: "Click!", opacity: 1 }
    ]
  },
  {
    id: 4,
    name: "Level 4: Split Reality",
    description: "Two paths, one truth.",
    revealDuration: 2500,
    startPos: { x: 400, y: 500 },
    platforms: [
      { id: 'center', x: 350, y: 550, w: 100, h: 40, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      
      // Left Path (Button)
      { id: 'l1', x: 200, y: 480, w: 80, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'l2', x: 80, y: 400, w: 80, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
      { id: 'btn_plat', x: 20, y: 300, w: 80, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },

      // Right Path (Exit) - Blocked by Toggle Wall
      { id: 'r1', x: 500, y: 480, w: 80, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'r2', x: 650, y: 400, w: 100, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'door_plat', x: 700, y: 250, w: 80, h: 20, type: PlatformType.TOGGLE, isActive: false, initiallyActive: false, triggerKey: 'sw_door' },
    ],
    spikes: [
        { id: 'ceil', x: 200, y: 250, w: 400, h: 20, maskDependent: true }, // Ceiling spikes visible only in truth
    ],
    buttons: [
        { id: 'btn_left', x: 40, y: 290, w: 40, h: 10, triggerKey: 'sw_door', isPressed: false }
    ],
    door: { id: 'd4', x: 710, y: 170, w: 60, h: 80, reqMaskOff: false },
    texts: [
       { id: 'hint', x: 330, y: 400, text: "Left to unlock.\nRight to leave.", opacity: 1}
    ]
  },
  {
    id: 5,
    name: "Level 5: The Choice",
    description: "Everything combined. Precision is key.",
    revealDuration: 2000,
    startPos: { x: 50, y: 500 },
    platforms: [
      { id: 'start', x: 0, y: 560, w: 150, h: 40, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      
      // Section 1: Magic Platforms + Magic Spikes
      { id: 'm1', x: 200, y: 500, w: 60, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
      { id: 'm2', x: 300, y: 450, w: 60, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
      
      // Section 2: Safe Island
      { id: 'mid', x: 400, y: 400, w: 100, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      
      // Section 3: Button requires Mask to reach high platform
      { id: 'high_mask', x: 350, y: 300, w: 60, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
      { id: 'btn_plat', x: 250, y: 200, w: 80, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },

      // Section 4: Toggle Bridge to Exit
      { id: 'bridge1', x: 550, y: 350, w: 60, h: 20, type: PlatformType.TOGGLE, isActive: false, initiallyActive: false, triggerKey: 'final_sw' },
      { id: 'bridge2', x: 650, y: 300, w: 60, h: 20, type: PlatformType.TOGGLE, isActive: false, initiallyActive: false, triggerKey: 'final_sw' },
      { id: 'end', x: 750, y: 250, w: 50, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
    ],
    spikes: [
        { id: 'floor', x: 150, y: 580, w: 650, h: 20, maskDependent: false },
        { id: 'trap1', x: 200, y: 420, w: 60, h: 20, maskDependent: true }, // Hovering above m1
        { id: 'trap2', x: 550, y: 280, w: 60, h: 20, maskDependent: true }  // Hovering above bridge1
    ],
    buttons: [
        { id: 'b_final', x: 270, y: 190, w: 40, h: 10, triggerKey: 'final_sw', isPressed: false }
    ],
    door: { id: 'd5', x: 745, y: 170, w: 60, h: 80, reqMaskOff: false },
    texts: [
        { id: 'fin', x: 400, y: 100, text: "Do not hesitate.", opacity: 0.6 }
    ]
  }
];
