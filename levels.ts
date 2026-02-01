import { LevelData, PlatformType } from './types';

export const LEVELS: LevelData[] = [
  // LEVEL 1
  {
    id: 1,
    name: "Level 1: The Veil",
    description: "The world is broken. Press 'E' to reveal the truth.",
    revealDuration: 5000,
    startPos: { x: 50, y: 500 },
    platforms: [
      { id: 'start_floor', x: 0, y: 560, w: 300, h: 40, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'end_floor', x: 500, y: 560, w: 300, h: 40, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'bridge1', x: 320, y: 500, w: 60, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
      { id: 'bridge2', x: 420, y: 500, w: 60, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
    ],
    spikes: [
      { id: 'pit', x: 300, y: 580, w: 200, h: 20, maskDependent: false }
    ],
    buttons: [],
    door: { id: 'd1', x: 700, y: 480, w: 60, h: 80, reqMaskOff: false },
    texts: [
      { id: 't1', x: 100, y: 450, text: "A/D Move, SPACE Jump", opacity: 0.8 },
      { id: 't2', x: 300, y: 350, text: "[E] Reveal Truth", opacity: 1 },
    ]
  },
  // LEVEL 2
  {
    id: 2,
    name: "Level 2: Thorns",
    description: "The truth hurts. Traps appear when you look closely.",
    revealDuration: 4000,
    startPos: { x: 50, y: 500 },
    platforms: [
      { id: 'floor', x: 0, y: 560, w: 800, h: 40, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'p1', x: 150, y: 450, w: 100, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'p2', x: 50, y: 350, w: 100, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
      { id: 'p3', x: 200, y: 250, w: 100, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'p4', x: 400, y: 200, w: 100, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
      { id: 'p5', x: 600, y: 150, w: 150, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
    ],
    spikes: [
      { id: 's1', x: 170, y: 410, w: 60, h: 40, maskDependent: true }, 
      { id: 's2', x: 220, y: 210, w: 60, h: 40, maskDependent: true },
      { id: 's3', x: 500, y: 150, w: 40, h: 40, maskDependent: true },
    ],
    buttons: [],
    door: { id: 'd2', x: 650, y: 70, w: 60, h: 80, reqMaskOff: false },
    texts: [
      { id: 't1', x: 200, y: 500, text: "Red spikes = Truth Danger", opacity: 0.8 }
    ]
  },
  // LEVEL 3
  {
    id: 3,
    name: "Level 3: Mechanism",
    description: "Find the switch to open the path.",
    revealDuration: 3000,
    startPos: { x: 50, y: 300 },
    platforms: [
      { id: 'start', x: 0, y: 350, w: 150, h: 40, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'd1', x: 200, y: 400, w: 80, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'd2', x: 350, y: 450, w: 80, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
      { id: 'btn_floor', x: 500, y: 500, w: 100, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
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
    texts: []
  },
  // LEVEL 4
  {
    id: 4,
    name: "Level 4: Split",
    description: "One way to unlock, one way to leave.",
    revealDuration: 2500,
    startPos: { x: 400, y: 500 },
    platforms: [
      { id: 'center', x: 350, y: 550, w: 100, h: 40, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'l1', x: 200, y: 480, w: 80, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'l2', x: 80, y: 400, w: 80, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
      { id: 'btn_plat', x: 20, y: 300, w: 80, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'r1', x: 500, y: 480, w: 80, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'r2', x: 650, y: 400, w: 100, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'door_plat', x: 700, y: 250, w: 80, h: 20, type: PlatformType.TOGGLE, isActive: false, initiallyActive: false, triggerKey: 'sw_door' },
    ],
    spikes: [
        { id: 'ceil', x: 200, y: 250, w: 400, h: 20, maskDependent: true },
    ],
    buttons: [
        { id: 'btn_left', x: 40, y: 290, w: 40, h: 10, triggerKey: 'sw_door', isPressed: false }
    ],
    door: { id: 'd4', x: 710, y: 170, w: 60, h: 80, reqMaskOff: false },
    texts: []
  },
  // LEVEL 5
  {
    id: 5,
    name: "Level 5: Precision",
    description: "Don't blink.",
    revealDuration: 2000,
    startPos: { x: 50, y: 500 },
    platforms: [
      { id: 'start', x: 0, y: 560, w: 150, h: 40, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'm1', x: 200, y: 500, w: 60, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
      { id: 'm2', x: 300, y: 450, w: 60, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
      { id: 'mid', x: 400, y: 400, w: 100, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'high_mask', x: 350, y: 300, w: 60, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
      { id: 'btn_plat', x: 250, y: 200, w: 80, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'bridge1', x: 550, y: 350, w: 60, h: 20, type: PlatformType.TOGGLE, isActive: false, initiallyActive: false, triggerKey: 'final_sw' },
      { id: 'bridge2', x: 650, y: 300, w: 60, h: 20, type: PlatformType.TOGGLE, isActive: false, initiallyActive: false, triggerKey: 'final_sw' },
      { id: 'end', x: 750, y: 250, w: 50, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
    ],
    spikes: [
        { id: 'floor', x: 150, y: 580, w: 650, h: 20, maskDependent: false },
        { id: 'trap1', x: 200, y: 420, w: 60, h: 20, maskDependent: true },
    ],
    buttons: [
        { id: 'b_final', x: 270, y: 190, w: 40, h: 10, triggerKey: 'final_sw', isPressed: false }
    ],
    door: { id: 'd5', x: 745, y: 170, w: 60, h: 80, reqMaskOff: false },
    texts: []
  },
  // LEVEL 6: The Void Steps
  {
    id: 6,
    name: "Level 6: Void Steps",
    description: "The path only exists when you look for it.",
    revealDuration: 3000,
    startPos: { x: 50, y: 400 },
    platforms: [
      { id: 'start', x: 0, y: 450, w: 100, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'h1', x: 150, y: 400, w: 50, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
      { id: 'h2', x: 250, y: 350, w: 50, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
      { id: 'h3', x: 350, y: 400, w: 50, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
      { id: 'h4', x: 450, y: 450, w: 50, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
      { id: 'safe', x: 600, y: 400, w: 200, h: 40, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
    ],
    spikes: [
      { id: 'floor', x: 0, y: 580, w: 800, h: 20, maskDependent: false }
    ],
    buttons: [],
    door: { id: 'd6', x: 700, y: 320, w: 60, h: 80, reqMaskOff: false },
    texts: [{ id: 't6', x: 300, y: 200, text: "Trust your memory.", opacity: 0.8 }]
  },
  // LEVEL 7: Verticality
  {
    id: 7,
    name: "Level 7: Ascension",
    description: "Climb the tower. Mind the red spikes.",
    revealDuration: 4000,
    startPos: { x: 50, y: 550 },
    platforms: [
      { id: 'floor', x: 0, y: 580, w: 100, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'p1', x: 150, y: 500, w: 80, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'p2', x: 50, y: 400, w: 80, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
      { id: 'p3', x: 150, y: 300, w: 80, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'p4', x: 250, y: 200, w: 80, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
      { id: 'p5', x: 400, y: 150, w: 100, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'p6', x: 600, y: 150, w: 200, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
    ],
    spikes: [
      { id: 's1', x: 150, y: 470, w: 80, h: 20, maskDependent: true },
      { id: 's2', x: 150, y: 270, w: 80, h: 20, maskDependent: true },
      { id: 's3', x: 0, y: 590, w: 800, h: 10, maskDependent: false }, // Floor kill
    ],
    buttons: [],
    door: { id: 'd7', x: 700, y: 70, w: 60, h: 80, reqMaskOff: false },
    texts: []
  },
  // LEVEL 8: The Switch Trap
  {
    id: 8,
    name: "Level 8: Bait",
    description: "The button is guarded.",
    revealDuration: 3000,
    startPos: { x: 50, y: 500 },
    platforms: [
      { id: 'start', x: 0, y: 550, w: 200, h: 40, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'btn_plat', x: 350, y: 350, w: 100, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'path1', x: 200, y: 450, w: 50, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
      { id: 'path2', x: 280, y: 400, w: 50, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
      { id: 'exit_plat', x: 600, y: 250, w: 150, h: 20, type: PlatformType.TOGGLE, isActive: false, initiallyActive: false, triggerKey: 'trap_sw' },
    ],
    spikes: [
      { id: 'trap', x: 340, y: 320, w: 120, h: 20, maskDependent: true }, // Floating above button
      { id: 'floor', x: 200, y: 580, w: 600, h: 20, maskDependent: false }
    ],
    buttons: [
      { id: 'b8', x: 390, y: 340, w: 20, h: 10, triggerKey: 'trap_sw', isPressed: false }
    ],
    door: { id: 'd8', x: 650, y: 170, w: 60, h: 80, reqMaskOff: false },
    texts: []
  },
  // LEVEL 9: Long Jump
  {
    id: 9,
    name: "Level 9: Faith",
    description: "Double jump is your best friend.",
    revealDuration: 1500,
    startPos: { x: 50, y: 300 },
    platforms: [
      { id: 'start', x: 0, y: 350, w: 100, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'mid', x: 350, y: 350, w: 100, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
      { id: 'end', x: 700, y: 350, w: 100, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
    ],
    spikes: [
      { id: 'ceil', x: 350, y: 250, w: 100, h: 20, maskDependent: true },
      { id: 'floor', x: 0, y: 580, w: 800, h: 20, maskDependent: false }
    ],
    buttons: [],
    door: { id: 'd9', x: 720, y: 270, w: 60, h: 80, reqMaskOff: false },
    texts: []
  },
  // LEVEL 10: Claustrophobia
  {
    id: 10,
    name: "Level 10: Tight Squeeze",
    description: "Don't touch the walls.",
    revealDuration: 5000,
    startPos: { x: 50, y: 500 },
    platforms: [
      { id: 'floor', x: 0, y: 550, w: 800, h: 40, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      // Tunnel
      { id: 't1', x: 200, y: 450, w: 400, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 't2', x: 200, y: 350, w: 400, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
    ],
    spikes: [
      // Spikes inside the tunnel only visible with mask
      { id: 's1', x: 250, y: 430, w: 30, h: 20, maskDependent: true },
      { id: 's2', x: 350, y: 430, w: 30, h: 20, maskDependent: true },
      { id: 's3', x: 450, y: 430, w: 30, h: 20, maskDependent: true },
    ],
    buttons: [],
    door: { id: 'd10', x: 700, y: 470, w: 60, h: 80, reqMaskOff: false },
    texts: [{ id: 't10', x: 400, y: 300, text: "Crawl through.", opacity: 0.8 }]
  },
  // LEVEL 11: The Drop
  {
    id: 11,
    name: "Level 11: The Drop",
    description: "Fall with style.",
    revealDuration: 3000,
    startPos: { x: 50, y: 100 },
    platforms: [
      { id: 'start', x: 0, y: 150, w: 100, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'catch1', x: 200, y: 300, w: 100, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
      { id: 'catch2', x: 400, y: 450, w: 100, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
      { id: 'end', x: 600, y: 550, w: 200, h: 40, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
    ],
    spikes: [
      { id: 's1', x: 200, y: 250, w: 100, h: 20, maskDependent: true }, // Above catch1
      { id: 'floor', x: 0, y: 580, w: 580, h: 20, maskDependent: false }
    ],
    buttons: [],
    door: { id: 'd11', x: 700, y: 470, w: 60, h: 80, reqMaskOff: false },
    texts: []
  },
  // LEVEL 12: Dual Switches
  {
    id: 12,
    name: "Level 12: Duality",
    description: "Two keys, one door.",
    revealDuration: 5000,
    startPos: { x: 400, y: 500 },
    platforms: [
      { id: 'center', x: 300, y: 550, w: 200, h: 40, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      // Left Wing
      { id: 'l1', x: 150, y: 450, w: 80, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'btn_l', x: 50, y: 350, w: 80, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      // Right Wing
      { id: 'r1', x: 570, y: 450, w: 80, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      { id: 'btn_r', x: 670, y: 350, w: 80, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
      // Exit (Needs 2 toggles logically, but simplistic engine supports 1:1. We simulate by chaining)
      // Actually we will put door on a platform that requires button 1, blocked by wall requiring button 2
      { id: 'gate', x: 350, y: 250, w: 100, h: 20, type: PlatformType.TOGGLE, isActive: false, initiallyActive: false, triggerKey: 'sw_gate' },
      { id: 'wall', x: 350, y: 150, w: 20, h: 100, type: PlatformType.TOGGLE, isActive: true, initiallyActive: true, triggerKey: 'sw_wall' }, 
    ],
    spikes: [
        { id: 'f', x: 0, y: 590, w: 800, h: 10, maskDependent: false }
    ],
    buttons: [
        { id: 'b_gate', x: 70, y: 340, w: 40, h: 10, triggerKey: 'sw_gate', isPressed: false },
        { id: 'b_wall', x: 690, y: 340, w: 40, h: 10, triggerKey: 'sw_wall', isPressed: false },
    ],
    door: { id: 'd12', x: 370, y: 170, w: 60, h: 80, reqMaskOff: false },
    texts: [{id:'hint', x:400, y:100, text:"Left builds the floor. Right removes the wall.", opacity: 1}]
  },
  // LEVEL 13: Endurance
  {
    id: 13,
    name: "Level 13: Endurance",
    description: "Keep moving.",
    revealDuration: 4000,
    startPos: { x: 50, y: 300 },
    platforms: [
        { id: 'p1', x: 0, y: 350, w: 100, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
        { id: 'p2', x: 150, y: 350, w: 50, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
        { id: 'p3', x: 250, y: 300, w: 50, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
        { id: 'p4', x: 350, y: 250, w: 50, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
        { id: 'p5', x: 450, y: 300, w: 50, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
        { id: 'p6', x: 550, y: 350, w: 50, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
        { id: 'end', x: 650, y: 350, w: 150, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
    ],
    spikes: [
        { id: 'floor', x: 0, y: 580, w: 800, h: 20, maskDependent: false },
        { id: 'roof_spikes', x: 200, y: 100, w: 400, h: 20, maskDependent: true }
    ],
    buttons: [],
    door: { id: 'd13', x: 700, y: 270, w: 60, h: 80, reqMaskOff: false },
    texts: []
  },
  // LEVEL 14: The Cage
  {
    id: 14,
    name: "Level 14: The Cage",
    description: "Trapped inside.",
    revealDuration: 2000,
    startPos: { x: 400, y: 300 },
    platforms: [
        // The Box
        { id: 'bot', x: 300, y: 400, w: 200, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
        { id: 'top', x: 300, y: 200, w: 200, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
        { id: 'left', x: 300, y: 200, w: 20, h: 220, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
        { id: 'right', x: 480, y: 200, w: 20, h: 220, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
        // Escape Path
        { id: 'esc1', x: 550, y: 300, w: 50, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
        { id: 'esc2', x: 650, y: 400, w: 100, h: 20, type: PlatformType.TOGGLE, isActive: false, initiallyActive: false, triggerKey: 'free' },
    ],
    spikes: [
        { id: 'in_spike', x: 350, y: 380, w: 100, h: 20, maskDependent: true },
        { id: 'floor', x: 0, y: 580, w: 800, h: 20, maskDependent: false }
    ],
    buttons: [
        // Button is inside, but requires mask to see safe spot to stand?
        // No, button opens the wall.
        // Actually, let's make the right wall a toggle.
        { id: 'b_esc', x: 330, y: 390, w: 20, h: 10, triggerKey: 'free', isPressed: false }
    ],
    door: { id: 'd14', x: 670, y: 320, w: 60, h: 80, reqMaskOff: false },
    texts: []
  },
  // LEVEL 15: Final Exam
  {
    id: 15,
    name: "Level 15: Truth",
    description: "Combine everything. Good luck.",
    revealDuration: 1500, // Short duration
    startPos: { x: 50, y: 500 },
    platforms: [
        { id: 'start', x: 0, y: 550, w: 100, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
        // Phase 1: Invisible jumps
        { id: 'm1', x: 150, y: 500, w: 50, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
        { id: 'm2', x: 250, y: 450, w: 50, h: 20, type: PlatformType.MASK_ONLY, isActive: true, initiallyActive: true },
        // Phase 2: Toggle
        { id: 'btn_p', x: 350, y: 400, w: 50, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
        { id: 'bridge', x: 450, y: 350, w: 150, h: 20, type: PlatformType.TOGGLE, isActive: false, initiallyActive: false, triggerKey: 'fin' },
        // Phase 3: Danger Climb
        { id: 'c1', x: 650, y: 250, w: 50, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
        { id: 'end', x: 50, y: 150, w: 200, h: 20, type: PlatformType.NORMAL, isActive: true, initiallyActive: true },
    ],
    spikes: [
        { id: 'f', x: 0, y: 590, w: 800, h: 10, maskDependent: false },
        { id: 'trap1', x: 150, y: 450, w: 50, h: 20, maskDependent: true }, // Trap on m1
        { id: 'trap2', x: 450, y: 300, w: 150, h: 20, maskDependent: true }, // Trap above bridge
    ],
    buttons: [
        { id: 'b_fin', x: 365, y: 390, w: 20, h: 10, triggerKey: 'fin', isPressed: false }
    ],
    door: { id: 'd15', x: 100, y: 70, w: 60, h: 80, reqMaskOff: false },
    texts: [{id: 'thx', x: 400, y: 50, text: "Thank you for playing.", opacity: 1}]
  }
];