import { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
import Confetti from '../components/Confetti';
import { useGame } from '../engine/gameState';
import { audioEngine } from '../engine/audio';
import { endScene } from '../content/story';
import { interpolate, asset } from '../engine/utils';

export default function EndScreen() {
  const { state, goToScene, dispatch } = useGame();
  const [showKeepsake, setShowKeepsake] = useState(false);
  const [copied, setCopied] = useState(false);

  const vars = {
    protagonistName: state.protagonistName,
    bardName: state.bardName,
  };

  // Confetti pop on mount
  useEffect(() => {
    audioEngine.playSfx('confetti');
  }, []);

  const handlePlayAgain = () => {
    audioEngine.playSfx('click');
    dispatch({ type: 'RESET' });
    goToScene('title');
  };

  const keepsakeText = interpolate(endScene.keepsake, vars);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(keepsakeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API may fail in some contexts
    }
  };

  return (
    <>
      <Confetti />
      <GameCard title={endScene.title}>
        <div className="text-center">
          <div className="mb-4 animate-float">
            <img
              src={asset('assets/heart.png')}
              alt=""
              className="w-24 h-24 mx-auto object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

          <div className="font-body text-ink/90 text-lg leading-relaxed my-6 max-w-lg mx-auto">
            {interpolate(endScene.narrative, vars)
              .split('\n\n')
              .filter((p) => p.trim())
              .map((p, i) => (
                <p key={i} className="mb-4 last:mb-0">
                  {p.trim()}
                </p>
              ))}
          </div>

          <p className="font-heading text-lg text-gold italic my-6">
            🎵 The Ballad of {state.protagonistName} &{' '}
            {state.bardName} — to be continued… 🎵
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button
              onClick={handlePlayAgain}
              className="btn-fantasy bg-royal-light hover:bg-royal text-gold"
              aria-label="Play the game again"
            >
              🔄 Play Again
            </button>
            <button
              onClick={() => { audioEngine.playSfx('click'); setShowKeepsake(true); }}
              className="btn-fantasy bg-gold/80 hover:bg-gold text-ink"
              aria-label="View your keepsake scroll"
            >
              <img src={asset('assets/scroll.png')} alt="" className="w-7 h-7 inline-block mr-1 -mt-0.5 object-contain" style={{ imageRendering: 'pixelated' }} /> View Keepsake
            </button>
          </div>
        </div>
      </GameCard>

      {/* Keepsake modal */}
      {showKeepsake && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowKeepsake(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Keepsake scroll"
        >
          <div
            className="bg-parchment rounded-2xl shadow-2xl border border-gold/30 max-w-lg w-full p-8 animate-fade-in max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <pre className="font-body text-ink/90 text-sm leading-relaxed whitespace-pre-wrap text-center mb-6">
              {keepsakeText}
            </pre>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCopy}
                className="btn-fantasy bg-gold/80 hover:bg-gold text-ink text-sm"
              >
                {copied ? '✓ Copied!' : '📋 Copy to Clipboard'}
              </button>
              <button
                onClick={() => setShowKeepsake(false)}
                className="btn-fantasy bg-ink/10 hover:bg-ink/20 text-ink text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
