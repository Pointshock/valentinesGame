import { useState } from 'react';
import GameCard from '../components/GameCard';
import { useGame } from '../engine/gameState';
import { audioEngine } from '../engine/audio';
import { defaultProtagonistName, defaultBardName } from '../content/story';

export default function SetupScreen() {
  const { dispatch, goToScene, state } = useGame();
  const [protName, setProtName] = useState(
    state.protagonistName || defaultProtagonistName,
  );
  const [bName, setBName] = useState(state.bardName || defaultBardName);

  const handleBegin = () => {
    audioEngine.playSfx('click');
    dispatch({
      type: 'SET_PROTAGONIST_NAME',
      name: protName.trim() || defaultProtagonistName,
    });
    dispatch({
      type: 'SET_BARD_NAME',
      name: bName.trim() || defaultBardName,
    });
    goToScene('tavern');
  };

  return (
    <GameCard title="Character Setup">
      <div className="space-y-6">
        <div>
          <label
            htmlFor="protagonist-name"
            className="block font-heading text-sm text-ink/70 mb-1 uppercase tracking-wider"
          >
            Your Name
          </label>
          <input
            id="protagonist-name"
            type="text"
            value={protName}
            onChange={(e) => setProtName(e.target.value)}
            placeholder={defaultProtagonistName}
            className="w-full px-4 py-3 rounded-lg border-2 border-gold/30 bg-parchment-dark/50 font-body text-ink text-lg focus:outline-none focus:border-gold transition-colors"
            maxLength={30}
            aria-label="Protagonist name"
          />
          <p className="text-xs text-ink/40 mt-1 italic">
            The hero of our story
          </p>
        </div>

        <div>
          <label
            htmlFor="bard-name"
            className="block font-heading text-sm text-ink/70 mb-1 uppercase tracking-wider"
          >
            The Bard
          </label>
          <input
            id="bard-name"
            type="text"
            value={bName}
            onChange={(e) => setBName(e.target.value)}
            placeholder={defaultBardName}
            className="w-full px-4 py-3 rounded-lg border-2 border-gold/30 bg-parchment-dark/50 font-body text-ink text-lg focus:outline-none focus:border-gold transition-colors"
            maxLength={40}
            aria-label="Bard name"
          />
          <p className="text-xs text-ink/40 mt-1 italic">
            Your charming companion
          </p>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="text-center">
          <button
            onClick={handleBegin}
            className="btn-fantasy bg-ruby hover:bg-ruby-dark text-white text-lg px-10 py-4"
            aria-label="Begin the quest"
          >
            ⚔️ Begin Quest
          </button>
        </div>
      </div>
    </GameCard>
  );
}
