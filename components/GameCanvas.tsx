import React, { useRef, useEffect } from 'react';
import { 
  GameState, PlatformType, 
  Platform, Spike, Door, LevelData, Button 
} from '../types';
import { 
  CANVAS_WIDTH, CANVAS_HEIGHT, GRAVITY, FRICTION, 
  MOVE_SPEED, JUMP_FORCE, PLAYER_WIDTH, PLAYER_HEIGHT,
  MAX_SANITY, SANITY_COST_PER_USE, SANITY_REGEN_RATE, COLORS
} from '../constants';
import { LEVELS } from '../levels';
import { 
  playJumpSound, playMaskToggleSound, playDieSound, 
  playWinSound, playStepSound, stopMaskSound, playButtonSound 
} from '../audioManager';

interface GameCanvasProps {
  onStateChange: (state: GameState) => void;
  onMaskStateChange: (active: boolean) => void;
  gameState: GameState;
  currentLevelIdx: number;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ 
  onStateChange, onMaskStateChange, gameState, currentLevelIdx 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  
  const playerRef = useRef({
    x: 0, y: 0, vx: 0, vy: 0,
    w: PLAYER_WIDTH, h: PLAYER_HEIGHT,
    isGrounded: false,
    sanity: MAX_SANITY,
    revealTimer: 0,
    facingRight: true,
    dead: false,
    stepTimer: 0
  });
  
  const keysRef = useRef<{ [key: string]: boolean }>({});
  
  // We need a mutable copy of the level data (for button states)
  const levelRef = useRef<LevelData>(JSON.parse(JSON.stringify(LEVELS[0])));

  // Cleanup audio on unmount or pause
  useEffect(() => {
    if (gameState !== GameState.PLAYING) {
      stopMaskSound();
    }
  }, [gameState]);

  // Load Level with Deep Reset
  useEffect(() => {
    resetLevelData(currentLevelIdx);
  }, [currentLevelIdx]);

  const resetLevelData = (idx: number) => {
    // Deep copy to ensure we don't mutate the const LEVELS array
    const freshLevel = JSON.parse(JSON.stringify(LEVELS[idx]));
    levelRef.current = freshLevel;
    resetPlayer(freshLevel.startPos);
    onMaskStateChange(false);
    stopMaskSound();
  };

  const resetPlayer = (pos: {x: number, y: number}) => {
    playerRef.current = {
      x: pos.x,
      y: pos.y,
      vx: 0,
      vy: 0,
      w: PLAYER_WIDTH,
      h: PLAYER_HEIGHT,
      isGrounded: false,
      sanity: MAX_SANITY,
      revealTimer: 0,
      facingRight: true,
      dead: false,
      stepTimer: 0
    };
  };

  // Input Handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.code] = true;
      
      // Mask Trigger
      if (e.code === 'KeyE' && gameState === GameState.PLAYING) {
        const p = playerRef.current;
        const level = levelRef.current;
        
        let newActiveState = false;
        if (p.revealTimer > 0) {
          p.revealTimer = 0; // Close
          newActiveState = false;
          playMaskToggleSound(false);
        } 
        else {
          if (p.sanity >= SANITY_COST_PER_USE) {
            p.revealTimer = level.revealDuration;
            p.sanity -= SANITY_COST_PER_USE;
            newActiveState = true;
            playMaskToggleSound(true);
          }
        }
        onMaskStateChange(newActiveState);
      }
      
      // Pause
      if (e.code === 'Escape') {
        if (gameState === GameState.PLAYING) onStateChange(GameState.PAUSED);
        else if (gameState === GameState.PAUSED) onStateChange(GameState.PLAYING);
      }

      // Reset
      if (e.code === 'KeyR' && (gameState === GameState.PLAYING || gameState === GameState.GAME_OVER)) {
        resetLevelData(currentLevelIdx);
        onStateChange(GameState.PLAYING);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState, onStateChange, onMaskStateChange, currentLevelIdx]);

  // Physics & Logic Update
  const update = (deltaTime: number) => {
    if (gameState !== GameState.PLAYING) return;

    const p = playerRef.current;
    const level = levelRef.current;

    // --- Movement ---
    let moving = false;
    if (keysRef.current['KeyA'] || keysRef.current['ArrowLeft']) {
      p.vx -= 1;
      p.facingRight = false;
      moving = true;
    }
    if (keysRef.current['KeyD'] || keysRef.current['ArrowRight']) {
      p.vx += 1;
      p.facingRight = true;
      moving = true;
    }

    // Footsteps
    if (moving && p.isGrounded) {
      p.stepTimer += deltaTime;
      if (p.stepTimer > 250) { 
        playStepSound();
        p.stepTimer = 0;
      }
    } else {
      p.stepTimer = 250; 
    }

    // Jump
    if ((keysRef.current['Space'] || keysRef.current['ArrowUp']) && p.isGrounded) {
      p.vy = JUMP_FORCE;
      p.isGrounded = false;
      playJumpSound();
    }

    // Apply Physics
    p.vx *= FRICTION;
    p.vy += GRAVITY;

    const maxSpeed = MOVE_SPEED;
    if (p.vx > maxSpeed) p.vx = maxSpeed;
    if (p.vx < -maxSpeed) p.vx = -maxSpeed;

    // Move X
    p.x += p.vx;
    checkCollisions(p, level.platforms, 'x');

    // Move Y
    p.y += p.vy;
    p.isGrounded = false; 
    checkCollisions(p, level.platforms, 'y');

    // Bounds check
    if (p.y > CANVAS_HEIGHT + 100) {
      die();
    }

    // --- Mask Timer & Sanity ---
    if (p.revealTimer > 0) {
      p.revealTimer -= deltaTime;
      if (p.revealTimer < 0) {
        p.revealTimer = 0;
        onMaskStateChange(false);
        playMaskToggleSound(false);
      }
    }

    if (p.sanity < MAX_SANITY) {
      p.sanity += SANITY_REGEN_RATE;
      if (p.sanity > MAX_SANITY) p.sanity = MAX_SANITY;
    }

    // --- Interactables ---
    checkSpikes(p, level.spikes);
    checkDoor(p, level.door);
    checkButtons(p, level.buttons, level.platforms);
  };

  const checkCollisions = (p: typeof playerRef.current, platforms: Platform[], axis: 'x' | 'y') => {
    const isMaskActive = p.revealTimer > 0;
    
    for (const plat of platforms) {
      // Logic for Visibility/Solidity
      let isSolid = false;
      
      // 1. Check active state (from Buttons)
      if (!plat.isActive) {
        isSolid = false; 
      } else {
        // 2. Check Type
        if (plat.type === PlatformType.NORMAL || plat.type === PlatformType.TOGGLE) {
            isSolid = true;
        } else if (plat.type === PlatformType.MASK_ONLY) {
            isSolid = isMaskActive;
        }
      }

      if (isSolid) {
        if (
          p.x < plat.x + plat.w &&
          p.x + p.w > plat.x &&
          p.y < plat.y + plat.h &&
          p.y + p.h > plat.y
        ) {
          if (axis === 'x') {
            if (p.vx > 0) p.x = plat.x - p.w;
            else if (p.vx < 0) p.x = plat.x + plat.w;
            p.vx = 0;
          } else {
            if (p.vy > 0) {
              p.y = plat.y - p.h;
              p.isGrounded = true;
              p.vy = 0;
            } else if (p.vy < 0) {
              p.y = plat.y + plat.h;
              p.vy = 0;
            }
          }
        }
      }
    }
  };

  const checkButtons = (p: typeof playerRef.current, buttons: Button[], platforms: Platform[]) => {
    for (const btn of buttons) {
        // Simple AABB for player touching button
        if (
            !btn.isPressed &&
            p.x < btn.x + btn.w &&
            p.x + p.w > btn.x &&
            p.y + p.h >= btn.y && // Feet touching top
            p.y < btn.y + btn.h
        ) {
            // Activate
            btn.isPressed = true;
            playButtonSound();
            
            // Toggle Linked Platforms
            platforms.forEach(plat => {
                if (plat.triggerKey === btn.triggerKey) {
                    plat.isActive = !plat.initiallyActive; 
                }
            });
        }
    }
  };

  const checkSpikes = (p: typeof playerRef.current, spikes: Spike[]) => {
    const padding = 8; 
    const isMaskActive = p.revealTimer > 0;
    
    for (const spike of spikes) {
      const isVisible = isMaskActive || !spike.maskDependent;
      if (isVisible) {
          if (
            p.x + padding < spike.x + spike.w &&
            p.x + p.w - padding > spike.x &&
            p.y + padding < spike.y + spike.h &&
            p.y + p.h - padding > spike.y
          ) {
            die();
          }
      }
    }
  };

  const checkDoor = (p: typeof playerRef.current, door: Door) => {
    const cx = p.x + p.w/2;
    const cy = p.y + p.h/2;
    if (cx > door.x && cx < door.x + door.w && cy > door.y && cy < door.y + door.h) {
      completeLevel();
    }
  };

  const die = () => {
    if (playerRef.current.dead) return;
    playerRef.current.dead = true;
    playDieSound();
    onStateChange(GameState.GAME_OVER);
  };

  const completeLevel = () => {
    if (currentLevelIdx === LEVELS.length - 1) {
      onStateChange(GameState.VICTORY);
      playWinSound();
    } else {
      onStateChange(GameState.LEVEL_COMPLETE);
      playWinSound();
    }
  };

  // --- CARTOON RENDERING ---

  const drawCartoonRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, fill: string, stroke: string = '#000') => {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 8);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = stroke;
    ctx.stroke();
    
    // Highlight
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath();
    ctx.roundRect(x + 4, y + 4, w - 8, h/3, 4);
    ctx.fill();
  };

  const drawPlayer = (ctx: CanvasRenderingContext2D, p: typeof playerRef.current) => {
    drawCartoonRect(ctx, p.x, p.y, p.w, p.h, COLORS.player.body);
    
    const eyeSize = 10;
    const eyeY = p.y + 12;
    const lookOffset = p.facingRight ? 4 : -4;
    const centerX = p.x + p.w / 2;
    
    // Eye Whites
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(centerX - 8 + lookOffset, eyeY, eyeSize/2, 0, Math.PI*2);
    ctx.arc(centerX + 8 + lookOffset, eyeY, eyeSize/2, 0, Math.PI*2);
    ctx.fill();
    ctx.stroke(); 

    // Pupils
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(centerX - 8 + lookOffset + (p.facingRight?2:-2), eyeY, 2, 0, Math.PI*2);
    ctx.arc(centerX + 8 + lookOffset + (p.facingRight?2:-2), eyeY, 2, 0, Math.PI*2);
    ctx.fill();
    
    if (p.sanity < 20) {
       ctx.fillStyle = '#00f';
       ctx.beginPath();
       ctx.arc(p.x + (p.facingRight?0:p.w), p.y, 4, 0, Math.PI*2);
       ctx.fill();
    }
  };

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    const p = playerRef.current;
    const level = levelRef.current;
    const isMaskActive = p.revealTimer > 0;

    // 1. Background
    ctx.fillStyle = isMaskActive ? COLORS.background.mask : COLORS.background.normal;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = isMaskActive ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.4)';
    for(let i=0; i<CANVAS_WIDTH; i+=40) {
      for(let j=0; j<CANVAS_HEIGHT; j+=40) {
        ctx.beginPath();
        ctx.arc(i, j, 2, 0, Math.PI*2);
        ctx.fill();
      }
    }

    // 2. Texts
    ctx.font = '24px "Patrick Hand", cursive';
    ctx.fillStyle = isMaskActive ? '#fff' : COLORS.text;
    ctx.textAlign = 'center';
    level.texts.forEach(t => {
      ctx.globalAlpha = t.opacity;
      ctx.fillText(t.text, t.x, t.y);
      ctx.globalAlpha = 1.0;
    });
    ctx.textAlign = 'left';

    // 3. Platforms
    level.platforms.forEach(plat => {
      let isVisible = false;
      let color = COLORS.platform.normal;

      if (!plat.isActive) {
        // Draw ghost if inactive? Or nothing?
        // Let's draw nothing for completely hidden.
        // For TOGGLE platforms that are inactive, maybe a ghost outline?
        if (plat.type === PlatformType.TOGGLE) {
             isVisible = true;
             color = COLORS.platform.toggleInactive;
        }
      } else {
         if (plat.type === PlatformType.NORMAL || plat.type === PlatformType.TOGGLE) {
            isVisible = true;
            color = plat.type === PlatformType.TOGGLE ? COLORS.platform.toggleActive : COLORS.platform.normal;
         } else if (plat.type === PlatformType.MASK_ONLY) {
            isVisible = isMaskActive;
            color = COLORS.platform.maskOnly;
         }
      }
      
      if (isVisible) {
        let dx = 0, dy = 0;
        if (plat.type === PlatformType.MASK_ONLY) {
           dx = Math.sin(frameCount * 0.1 + plat.x) * 2;
           dy = Math.cos(frameCount * 0.1 + plat.y) * 2;
        }

        // Dotted outline for inactive toggle platforms
        if (plat.type === PlatformType.TOGGLE && !plat.isActive) {
            ctx.beginPath();
            ctx.roundRect(plat.x, plat.y, plat.w, plat.h, 8);
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.stroke();
            ctx.setLineDash([]);
        } else {
            drawCartoonRect(ctx, plat.x + dx, plat.y + dy, plat.w, plat.h, color);
        }
      }
    });

    // 4. Buttons
    level.buttons.forEach(btn => {
        const h = btn.isPressed ? 5 : 10;
        const y = btn.isPressed ? btn.y + 5 : btn.y;
        
        // Base
        ctx.fillStyle = COLORS.button.base;
        ctx.fillRect(btn.x - 5, btn.y + 5, btn.w + 10, 10);
        
        // Top
        const topColor = btn.isPressed ? COLORS.button.topPressed : COLORS.button.topUnpressed;
        drawCartoonRect(ctx, btn.x, y, btn.w, h, topColor);
    });

    // 5. Spikes
    level.spikes.forEach(spike => {
      const isVisible = isMaskActive || !spike.maskDependent;
      if (isVisible) {
        ctx.fillStyle = COLORS.spike;
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        
        const spikeCount = Math.floor(spike.w / 20);
        const spikeW = spike.w / spikeCount;
        
        ctx.beginPath();
        for(let i=0; i<spikeCount; i++) {
           const sx = spike.x + i * spikeW;
           const sy = spike.y + spike.h;
           ctx.moveTo(sx, sy);
           ctx.lineTo(sx + spikeW/2, spike.y);
           ctx.lineTo(sx + spikeW, sy);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    });

    // 6. Door
    drawCartoonRect(ctx, level.door.x, level.door.y, level.door.w, level.door.h, COLORS.door);
    // Door knob
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(level.door.x + level.door.w - 10, level.door.y + level.door.h/2, 4, 0, Math.PI*2);
    ctx.fill();
    // Portal swirl (static)
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.beginPath();
    ctx.arc(level.door.x + level.door.w/2, level.door.y + level.door.h/2, 10, 0, Math.PI*2);
    ctx.stroke();

    // 7. Player
    drawPlayer(ctx, p);
  };

  const drawUI = (ctx: CanvasRenderingContext2D) => {
    const p = playerRef.current;
    
    const barW = 200;
    const barH = 20;
    const barX = 20;
    const barY = 20;
    
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.roundRect(barX, barY, barW, barH, 10);
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000';
    ctx.stroke();
    
    const fillW = (barW - 8) * (p.sanity / MAX_SANITY);
    if (fillW > 0) {
      ctx.fillStyle = p.sanity < SANITY_COST_PER_USE ? '#ccc' : '#E040FB'; 
      ctx.beginPath();
      ctx.roundRect(barX + 4, barY + 4, fillW, barH - 8, 6);
      ctx.fill();
    }
    
    ctx.fillStyle = '#000';
    ctx.font = '16px "Fredoka One", cursive';
    ctx.fillText("MAGIC POWER", barX, barY + 45);
    
    ctx.textAlign = 'right';
    const actionText = p.revealTimer > 0 ? "DISABLE" : "ACTIVATE";
    ctx.fillText(`[E] ${actionText}`, CANVAS_WIDTH - 20, 35);
    ctx.font = '14px "Patrick Hand", cursive';
    ctx.fillText(`Cost: ${SANITY_COST_PER_USE}`, CANVAS_WIDTH - 20, 55);
    ctx.textAlign = 'left';
  };

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const loop = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      const ctx = canvasRef.current?.getContext('2d');
      if (ctx) {
        update(deltaTime);
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        draw(ctx, frameCount);
        drawUI(ctx);
      }
      frameCount++;
      requestRef.current = requestAnimationFrame(loop);
    };
    requestRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(requestRef.current!);
  });

  return (
    <div className="relative">
      <canvas 
        ref={canvasRef} 
        width={CANVAS_WIDTH} 
        height={CANVAS_HEIGHT}
      />
    </div>
  );
};

export default GameCanvas;