import { useState, useCallback } from 'react';
import GameCard from '../components/GameCard';
import Portraits from '../components/Portraits';
import Narration from '../components/Narration';
import DiceRoll from '../components/DiceRoll';
import InventoryBar from '../components/InventoryBar';
import { useGame } from '../engine/gameState';
import { audioEngine } from '../engine/audio';
import { locationScenes } from '../content/story';
import { interpolate, getRollTier } from '../engine/utils';
import type { LocationId } from '../engine/types';

const SUCCESS_THRESHOLD = 10; // 10-20 = success, 1-9 = fail

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function LocationScene() {
  const { state, dispatch, goToScene } = useGame();
  const locationId = state.currentSceneId as LocationId;
  const content = locationScenes[locationId];

  const [phase, setPhase] = useState<'intro' | 'failed' | 'complete'>('intro');
  const [roll, setRoll] = useState(0);
  const [rollKey, setRollKey] = useState(0); // key to remount DiceRoll for retries
  const [failText, setFailText] = useState('');
  const [showToast, setShowToast] = useState(false);

  const vars = {
    protagonistName: state.protagonistName,
    bardName: state.bardName,
    roll: String(roll),
  };

  // Safety: if already visited or content missing, redirect
  // Only redirect when first entering (phase is still 'intro') — not mid-completion
  if (!content || (state.visited[locationId] && phase === 'intro')) {
    return (
      <GameCard title="Already Visited">
        <p className="font-body text-ink text-center mb-6">
          You've already claimed this shard. The path leads back to the tavern.
        </p>
        <div className="text-center">
          <button
            onClick={() => goToScene('tavern')}
            className="btn-fantasy bg-royal-light hover:bg-royal text-white"
          >
            🏠 Return to Tavern
          </button>
        </div>
      </GameCard>
    );
  }

  const handleRollResult = (result: number) => {
    setRoll(result);

    if (result < SUCCESS_THRESHOLD) {
      // Failed roll — show random fail dialogue and allow retry
      setFailText(pickRandom(content.failDialogues));
      setPhase('failed');
    } else {
      // Success!
      dispatch({ type: 'SET_ROLL', roll: result });
      dispatch({ type: 'COLLECT_SHARD', location: locationId });
      setPhase('complete');
      setShowToast(true);
      audioEngine.playSfx('shardCollect');
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleRetry = useCallback(() => {
    audioEngine.playSfx('click');
    setPhase('intro');
    setRoll(0);
    setRollKey((k) => k + 1); // force DiceRoll to remount fresh
  }, []);

  const tier = getRollTier(roll);

  return (
    <GameCard title={content.title}>
      <Portraits
        protagonistName={state.protagonistName}
        bardName={state.bardName}
        showBard={false}
      />
      <Narration text={interpolate(content.narrative, vars)} />

      {phase === 'intro' && (
        <DiceRoll key={rollKey} prompt={content.rollPrompt} onResult={handleRollResult} />
      )}

      {phase === 'failed' && (
        <div className="animate-fade-in">
          <div className="my-4 text-center">
            <span className="inline-block bg-red-900/40 text-red-300 font-heading text-sm px-4 py-1 rounded-full border border-red-400/30">
              🎲 Rolled {roll} — Failed!
            </span>
          </div>
          <Narration text={interpolate(failText, vars)} />
          <div className="text-center mt-6">
            <button
              onClick={handleRetry}
              className="btn-fantasy bg-royal-light hover:bg-royal text-gold border-2 border-gold/50 hover:border-gold px-8 py-3 text-lg"
              aria-label="Try rolling again"
            >
              🎲 Try Again
            </button>
          </div>
        </div>
      )}

      {phase === 'complete' && (
        <div className="animate-fade-in">
          <Narration text={interpolate(content.outcomes[tier], vars)} />
          <div className="text-center mt-6">
            <button
              onClick={() => { audioEngine.playSfx('click'); dispatch({ type: 'VISIT_LOCATION', location: locationId }); goToScene('tavern'); }}
              className="btn-fantasy bg-royal-light hover:bg-royal text-white"
              aria-label="Return to the tavern"
            >
              🏠 Return to Tavern
            </button>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 z-40 toast-animate">
          <div className="bg-royal/95 text-gold px-6 py-3 rounded-full shadow-xl border border-gold/30 font-heading text-sm flex items-center gap-2">
            <span aria-hidden="true">✨</span>
            <span>{content.shardName} obtained!</span>
            <span aria-hidden="true">✨</span>
          </div>
        </div>
      )}

      <InventoryBar inventory={state.inventory} />
    </GameCard>
  );
}
