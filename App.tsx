import React, { useState, useEffect, useRef } from 'react';
import GameCanvas from './components/GameCanvas';
import UIOverlay from './components/UIOverlay';
import { GameState } from './types';
import { LEVELS } from './levels';
import { COLORS } from './constants';
import { startBackgroundMusic, stopBackgroundMusic } from './audioManager';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [previousState, setPreviousState] = useState<GameState>(GameState.MENU); // To return from settings
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [scale, setScale] = useState(1);
  const [isMaskActive, setIsMaskActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scaling Logic to fit screen
  useEffect(() => {
    const handleResize = () => {
      const targetW = 800;
      const targetH = 600;
      const availableW = window.innerWidth;
      const availableH = window.innerHeight;
      const scaleX = availableW / targetW;
      const scaleY = availableH / targetH;
      const newScale = Math.min(scaleX, scaleY); 
      setScale(newScale);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleStateChange = (newState: GameState) => {
    setGameState(newState);
    if (newState === GameState.PLAYING) {
      startBackgroundMusic();
    }
  };

  const handleStart = () => {
    setGameState(GameState.PLAYING);
    startBackgroundMusic();
  };

  const handleRestart = () => {
    setGameState(GameState.PLAYING);
    startBackgroundMusic();
  };

  const handleNextLevel = () => {
    if (currentLevelIdx < LEVELS.length - 1) {
      setCurrentLevelIdx(prev => prev + 1);
      setGameState(GameState.PLAYING);
      startBackgroundMusic();
    } else {
      setGameState(GameState.VICTORY);
      stopBackgroundMusic();
    }
  };

  const handleOpenSettings = () => {
    setPreviousState(gameState);
    setGameState(GameState.SETTINGS);
  };

  const handleCloseSettings = () => {
    setGameState(previousState);
  };

  const handleMaskStateChange = (active: boolean) => {
    setIsMaskActive(active);
  };

  const currentBgColor = isMaskActive ? COLORS.background.mask : COLORS.background.normal;

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center overflow-hidden relative transition-colors duration-300"
      style={{ backgroundColor: currentBgColor }}
    >
      {/* Game Container (Scaled) */}
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
        <div className="relative overflow-hidden">
           <GameCanvas 
            onStateChange={handleStateChange} 
            onMaskStateChange={handleMaskStateChange}
            gameState={gameState}
            currentLevelIdx={currentLevelIdx}
          />
        </div>
      </div>

      {/* UI Overlay - Moved OUTSIDE scale div to fix cutoff/shadow issues */}
      <UIOverlay 
        gameState={gameState} 
        onStart={handleStart}
        onRestart={handleRestart}
        onNextLevel={handleNextLevel}
        onOpenSettings={handleOpenSettings}
        onCloseSettings={handleCloseSettings}
        levelInfo={{
          name: LEVELS[currentLevelIdx].name,
          description: LEVELS[currentLevelIdx].description
        }}
      />

      {/* Fullscreen Button */}
      <button 
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 z-50 bg-yellow-400 hover:bg-yellow-300 border-2 border-black p-2 rounded-lg transition shadow-lg font-bold font-mono text-sm text-black"
        title="Toggle Fullscreen"
      >
        ⛶ FULLSCREEN
      </button>
    </div>
  );
};

export default App;