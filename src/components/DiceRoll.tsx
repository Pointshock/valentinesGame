import { useState, useRef, useCallback, useEffect } from 'react';
import { rollD20, asset } from '../engine/utils';
import { audioEngine } from '../engine/audio';

interface DiceRollProps {
  onResult: (roll: number) => void;
  prompt?: string;
  /** When true, start rolling immediately on mount (e.g. after "Try Again") */
  autoRoll?: boolean;
}

export default function DiceRoll({
  onResult,
  prompt = 'Roll the d20',
  autoRoll = false,
}: DiceRollProps) {
  const [phase, setPhase] = useState<'idle' | 'rolling' | 'done'>('idle');
  const [displayNum, setDisplayNum] = useState(20);
  const [finalRoll, setFinalRoll] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const onResultRef = useRef(onResult);
  onResultRef.current = onResult;
  const hasAutoRolledRef = useRef(false);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startRoll = useCallback(() => {
    setPhase('rolling');
    audioEngine.playSfx('diceRoll');

    // Rapidly cycle random numbers for suspense
    intervalRef.current = window.setInterval(() => {
      setDisplayNum(Math.floor(Math.random() * 20) + 1);
    }, 80);

    // Determine result up front, reveal after delay
    const result = rollD20();
    setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      setDisplayNum(result);
      setFinalRoll(result);
      setPhase('done');
      audioEngine.playSfx('diceReveal');
      // Short pause to admire the number, then notify parent
      setTimeout(() => onResultRef.current(result), 700);
    }, 1500);
  }, []);

  // Auto-roll once when mounted with autoRoll (e.g. after "Try Again")
  useEffect(() => {
    if (!autoRoll || hasAutoRolledRef.current) return;
    hasAutoRolledRef.current = true;
    startRoll();
  }, [autoRoll, startRoll]);

  const handleRoll = useCallback(() => {
    if (phase !== 'idle') return;
    startRoll();
  }, [phase, startRoll]);

  const getRollColor = (roll: number) => {
    if (roll >= 15) return 'text-green-400';
    if (roll >= 10) return 'text-yellow-300';
    return 'text-red-400';
  };

  return (
    <div className="flex flex-col items-center gap-4 my-6">
      {phase === 'idle' && (
        <button
          onClick={handleRoll}
          className="btn-fantasy bg-royal-light hover:bg-royal text-gold border-2 border-gold/50 hover:border-gold px-8 py-4 text-lg flex items-center gap-3"
          aria-label={prompt}
        >
          <img src={asset('assets/dice_idle.png')} alt="" className="w-14 h-14 object-contain" style={{ imageRendering: 'pixelated' }} />
          {prompt}
        </button>
      )}

      {(phase === 'rolling' || phase === 'done') && (
        <div className="flex flex-col items-center gap-3 animate-fade-in">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <img
              src={phase === 'rolling' ? asset('assets/dice_roll.png') : asset('assets/dice_idle.png')}
              alt="D20"
              className={`w-40 h-40 object-contain ${phase === 'rolling' ? 'dice-rolling' : ''}`}
              style={{ imageRendering: 'pixelated' }}
            />
            <span
              className={`absolute inset-0 flex items-center justify-center text-3xl font-heading font-bold transition-colors duration-300 ${
                phase === 'rolling'
                  ? 'text-gold/70'
                  : getRollColor(finalRoll)
              }`}
              style={{ textShadow: '0 0 4px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)' }}
            >
              {displayNum}
            </span>
          </div>

          {phase === 'rolling' && (
            <span
              className="text-sm text-gold/60 italic animate-pulse"
              style={{ textShadow: '0 0 4px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.7)' }}
            >
              Rolling…
            </span>
          )}

          {phase === 'done' && (
            <span
              className={`text-sm font-bold ${getRollColor(finalRoll)}`}
              style={{ textShadow: '0 0 4px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.7)' }}
            >
              {finalRoll >= 20
                ? '✨ Natural 20! ✨'
                : finalRoll >= 15
                  ? '🌟 Great roll!'
                  : finalRoll >= 10
                    ? '✔️ Success!'
                    : '😅 Not enough...'}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
