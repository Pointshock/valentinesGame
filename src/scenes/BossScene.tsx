import { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
import Portraits from '../components/Portraits';
import Narration from '../components/Narration';
import { useGame } from '../engine/gameState';
import { audioEngine } from '../engine/audio';
import { bossScene } from '../content/story';
import { interpolate } from '../engine/utils';

export default function BossScene() {
  const { state, dispatch, goToScene } = useGame();
  const [phase, setPhase] = useState<'intro' | 'chosen' | 'resolved'>('intro');
  const [chosenId, setChosenId] = useState<string | null>(null);

  const vars = {
    protagonistName: state.protagonistName,
    bardName: state.bardName,
  };

  // Dramatic entrance SFX
  useEffect(() => {
    audioEngine.playSfx('bossAppear');
  }, []);

  const chosen = bossScene.choices.find((c) => c.id === chosenId);

  const handleChoice = (id: string) => {
    audioEngine.playSfx('click');
    dispatch({ type: 'SET_BOSS_CHOICE', choice: id });
    setChosenId(id);
    setPhase('chosen');
  };

  return (
    <GameCard title={bossScene.title}>
      <div className="flex justify-center mb-4">
        <img
          src="/assets/imp.png"
          alt="Mischief Imp of Envy"
          className="w-40 h-40 object-contain drop-shadow-[0_0_8px_rgba(74,222,128,0.4)]"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
      <Portraits
        protagonistName={state.protagonistName}
        bardName={state.bardName}
        showBard={false}
      />
      <Narration text={interpolate(bossScene.narrative, vars)} />

      {phase === 'intro' && (
        <div className="flex flex-col gap-3 mt-6">
          <p className="text-center font-heading text-ink/50 text-sm uppercase tracking-wider">
            How do you respond?
          </p>
          {bossScene.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => handleChoice(choice.id)}
              className="btn-fantasy bg-royal-light hover:bg-royal text-white text-left"
              aria-label={choice.label}
            >
              {choice.label}
            </button>
          ))}
        </div>
      )}

      {phase === 'chosen' && chosen && (
        <div className="animate-fade-in mt-4">
          <Narration text={interpolate(chosen.outcome, vars)} />
          <div className="text-center mt-4">
            <button
              onClick={() => { audioEngine.playSfx('victory'); setPhase('resolved'); }}
              className="btn-fantasy bg-gold hover:bg-gold-dark text-ink"
            >
              Continue…
            </button>
          </div>
        </div>
      )}

      {phase === 'resolved' && (
        <div className="animate-fade-in mt-4">
          <Narration text={interpolate(bossScene.resolution, vars)} />
          <div className="text-center mt-6">
            <button
              onClick={() => { audioEngine.playSfx('click'); goToScene('festival'); }}
              className="btn-fantasy bg-ruby hover:bg-ruby-dark text-white text-lg"
              aria-label="Return to the festival"
            >
              <img src="/assets/heartstone.png" alt="" className="w-8 h-8 inline-block mr-1 -mt-0.5 object-contain" style={{ imageRendering: 'pixelated' }} /> Return to the Festival
            </button>
          </div>
        </div>
      )}
    </GameCard>
  );
}
