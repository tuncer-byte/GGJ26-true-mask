// Simple Synthesizer for Retro Sound Effects & BGM Manager
let audioCtx: AudioContext | null = null;
let isMuted = false;

// BGM
const BGM_URL = "https://dm0qx8t0i9gc9.cloudfront.net/previews/audio/H4aBNp9sLkao4zcc2/audioblocks-the-dark-era_HZ7GI1_2h_NWM.mp3";
let bgmAudio: HTMLAudioElement | null = null;

// Trackers for loops (SFX)
let maskDroneOscillator: OscillatorNode | null = null;
let maskGain: GainNode | null = null;

const getCtx = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

export const toggleMute = (mute: boolean) => {
  isMuted = mute;
  
  // Handle SFX Context
  if (audioCtx) {
    if (isMuted) {
      audioCtx.suspend();
    } else {
      audioCtx.resume();
    }
  }

  // Handle BGM
  if (bgmAudio) {
    bgmAudio.muted = isMuted;
    if (!isMuted && bgmAudio.paused && audioCtx?.state === 'running') {
        // If we unmute and we are in a state where music should be playing (handled by caller logic usually, but here simple toggle)
        // We rely on the App calling startBackgroundMusic
    }
  }
};

const createOscillator = (type: OscillatorType, freq: number, duration: number, vol: number = 0.1) => {
  if (isMuted) return null;
  const ctx = getCtx();
  if (ctx.state === 'suspended') ctx.resume();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  osc.connect(gain);
  gain.connect(ctx.destination);

  gain.gain.setValueAtTime(vol, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

  osc.start();
  osc.stop(ctx.currentTime + duration);
  
  return { osc, gain, ctx };
};

// --- BGM ---
export const startBackgroundMusic = () => {
  if (!bgmAudio) {
    bgmAudio = new Audio(BGM_URL);
    bgmAudio.loop = true;
    bgmAudio.volume = 0.3; // 30% volume
  }

  bgmAudio.muted = isMuted;

  // Only play if not already playing
  if (bgmAudio.paused) {
      const playPromise = bgmAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Auto-play prevented:", error);
        });
      }
  }
};

export const stopBackgroundMusic = () => {
  if (bgmAudio) {
    bgmAudio.pause();
    bgmAudio.currentTime = 0;
  }
};

// --- MASK TENSION SOUND ---
export const startMaskSound = () => {
  if (isMuted || maskDroneOscillator) return;
  const ctx = getCtx();

  maskDroneOscillator = ctx.createOscillator();
  maskGain = ctx.createGain();
  
  maskDroneOscillator.type = 'sawtooth';
  maskDroneOscillator.frequency.value = 60; // Low buzz
  
  maskDroneOscillator.connect(maskGain);
  maskGain.connect(ctx.destination);
  
  maskGain.gain.setValueAtTime(0, ctx.currentTime);
  maskGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.5); // Fade in

  maskDroneOscillator.start();
};

export const stopMaskSound = () => {
  if (maskDroneOscillator && maskGain) {
    const ctx = getCtx();
    const g = maskGain;
    const o = maskDroneOscillator;
    
    // Fade out
    g.gain.cancelScheduledValues(ctx.currentTime);
    g.gain.setValueAtTime(g.gain.value, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
    
    setTimeout(() => {
      o.stop();
      o.disconnect();
      g.disconnect();
    }, 350);
    
    maskDroneOscillator = null;
    maskGain = null;
  }
};

// --- SFX ---

export const playJumpSound = () => {
  if (isMuted) return;
  const res = createOscillator('sine', 300, 0.2, 0.15);
  if(res) res.osc.frequency.linearRampToValueAtTime(500, res.ctx.currentTime + 0.1);
};

export const playMaskToggleSound = (isActive: boolean) => {
  if (isMuted) return;
  const res = createOscillator(isActive ? 'square' : 'triangle', isActive ? 150 : 400, 0.4, 0.1);
  if (res) {
    if (isActive) {
      res.osc.frequency.linearRampToValueAtTime(600, res.ctx.currentTime + 0.3);
      startMaskSound();
    } else {
      res.osc.frequency.linearRampToValueAtTime(100, res.ctx.currentTime + 0.3);
      stopMaskSound();
    }
  }
};

export const playButtonSound = () => {
    if (isMuted) return;
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
    
    // Mechanical click
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
};

export const playDieSound = () => {
  if (isMuted) return;
  stopMaskSound(); // Ensure drone stops on death
  const res = createOscillator('sawtooth', 150, 0.5, 0.2);
  if (res) res.osc.frequency.exponentialRampToValueAtTime(10, res.ctx.currentTime + 0.4);
};

export const playWinSound = () => {
  if (isMuted) return;
  stopMaskSound();
  const ctx = getCtx();
  if (ctx.state === 'suspended') ctx.resume();
  
  const now = ctx.currentTime;
  [440, 554, 659, 880].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.1, now + i * 0.1);
    gain.gain.linearRampToValueAtTime(0, now + i * 0.1 + 0.3);
    osc.start(now + i * 0.1);
    osc.stop(now + i * 0.1 + 0.3);
  });
};

export const playStepSound = () => {
  if (isMuted) return;
  const ctx = getCtx();
  if (ctx.state === 'suspended') return; 
  
  const bufferSize = ctx.sampleRate * 0.05; 
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const gain = ctx.createGain();
  gain.gain.value = 0.05;
  
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 150;

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  noise.start();
};