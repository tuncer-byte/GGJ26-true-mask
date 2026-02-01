import React from 'react';
import { GameState } from '../types';
import { toggleMute } from '../audioManager';

interface UIOverlayProps {
  gameState: GameState;
  onStart: () => void;
  onRestart: () => void;
  onFullRestart: () => void; // Restart game from level 1
  onNextLevel: () => void;
  onOpenSettings: () => void;
  onCloseSettings: () => void;
  levelInfo: { name: string; description: string };
}

const UIOverlay: React.FC<UIOverlayProps> = ({ 
  gameState, onStart, onRestart, onFullRestart, onNextLevel, 
  onOpenSettings, onCloseSettings, levelInfo 
}) => {
  const [isMuted, setIsMuted] = React.useState(false);

  const handleToggleSound = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    toggleMute(newState);
  };

  if (gameState === GameState.PLAYING) return null;

  return (
    // FIXED positioning ensures it covers the browser window, not just the scaled game div
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black/60 backdrop-blur-sm z-[9999]">
      <div className="cartoon-card p-10 max-w-lg w-full text-center relative overflow-hidden transform scale-110">
        
        {/* Decorative background circle */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-300 rounded-full opacity-50 pointer-events-none"></div>

        {gameState === GameState.MENU && (
          <>
            <h1 className="text-6xl text-purple-600 mb-2 cartoon-title text-outline text-white transform -rotate-2">
              Magic Mask
            </h1>
            <h2 className="text-2xl text-gray-700 mb-6 font-bold">Adventure</h2>
            
            <button 
              onClick={onStart}
              className="cartoon-btn px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black text-2xl w-full mb-4"
            >
              START GAME
            </button>
            
            <button 
              onClick={onOpenSettings}
              className="cartoon-btn px-6 py-2 bg-gray-200 hover:bg-gray-100 text-black text-lg w-full"
            >
              SETTINGS
            </button>
          </>
        )}

        {gameState === GameState.SETTINGS && (
          <>
            <h2 className="text-4xl text-gray-800 mb-8 cartoon-title">SETTINGS</h2>
            
            <div className="flex items-center justify-between mb-8 px-8 bg-gray-100 py-4 rounded-xl border-2 border-black">
              <span className="text-2xl font-bold text-gray-900">Sound</span>
              <button 
                onClick={handleToggleSound}
                className={`cartoon-btn px-4 py-2 w-24 text-xl font-bold ${isMuted ? 'bg-red-400' : 'bg-green-400'}`}
              >
                {isMuted ? "OFF" : "ON"}
              </button>
            </div>

            <button 
              onClick={onCloseSettings}
              className="cartoon-btn px-6 py-3 bg-blue-400 hover:bg-blue-300 text-white text-xl w-full"
            >
              BACK
            </button>
          </>
        )}

        {gameState === GameState.PAUSED && (
          <>
            <h2 className="text-5xl text-blue-500 mb-8 cartoon-title">PAUSED</h2>
            <button 
              onClick={onStart} 
              className="cartoon-btn px-6 py-3 bg-green-400 hover:bg-green-300 text-black text-xl w-full mb-4"
            >
              RESUME
            </button>
            <button 
              onClick={onOpenSettings}
              className="cartoon-btn px-6 py-3 bg-gray-200 hover:bg-gray-100 text-black text-xl w-full"
            >
              SETTINGS
            </button>
          </>
        )}

        {gameState === GameState.GAME_OVER && (
          <>
            <h2 className="text-5xl text-red-500 mb-4 cartoon-title transform rotate-2">OOPS!</h2>
            <p className="text-gray-600 mb-8 text-xl">That looked painful!</p>
            <button 
              onClick={onRestart}
              className="cartoon-btn px-8 py-4 bg-red-400 hover:bg-red-300 text-white text-xl"
            >
              TRY AGAIN
            </button>
          </>
        )}

        {gameState === GameState.LEVEL_COMPLETE && (
          <>
            <h2 className="text-5xl text-yellow-500 mb-4 cartoon-title">AWESOME!</h2>
            <p className="text-gray-600 mb-8">Level Complete!</p>
            <button 
              onClick={onNextLevel}
              className="cartoon-btn px-8 py-4 bg-blue-400 hover:bg-blue-300 text-white text-xl"
            >
              NEXT LEVEL
            </button>
          </>
        )}

        {gameState === GameState.VICTORY && (
          <>
            <h2 className="text-6xl text-purple-500 mb-6 cartoon-title">YOU WIN!</h2>
            <p className="text-gray-600 mb-8 text-lg">
              You are the master of Magic Vision!<br/>
              Thanks for playing.
            </p>
            <button 
              onClick={onFullRestart}
              className="cartoon-btn px-6 py-3 bg-gray-200 hover:bg-gray-100 text-black text-lg"
            >
              PLAY AGAIN
            </button>
          </>
        )}
        
        {/* Level Info Footer */}
        {(gameState === GameState.MENU || gameState === GameState.LEVEL_COMPLETE) && (
             <div className="mt-8 pt-4 border-t-2 border-gray-100">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">NEXT UP</div>
                <div className="text-xl font-bold text-gray-800">{levelInfo.name}</div>
                <div className="text-gray-500 text-sm">{levelInfo.description}</div>
             </div>
        )}
      </div>
    </div>
  );
};

export default UIOverlay;