import { useState, useCallback } from 'react';
import GameCard from '../components/GameCard';
import Portraits from '../components/Portraits';
import Narration from '../components/Narration';
import DiceRoll from '../components/DiceRoll';
import { useGame } from '../engine/gameState';
import { audioEngine } from '../engine/audio';
import { proposalScene, valentineRollOutcomes } from '../content/story';
import { interpolate } from '../engine/utils';

type Phase = 'prelude' | 'speech' | 'question' | 'rolling' | 'rollResult';

export default function ProposalScene() {
  const { state, goToScene } = useGame();
  const [phase, setPhase] = useState<Phase>('prelude');
  const [lineIndex, setLineIndex] = useState(0);
  const [roll, setRoll] = useState(0);

  const vars = {
    protagonistName: state.protagonistName,
    bardName: state.bardName,
    roll: String(roll),
  };

  const handleNextLine = () => {
    audioEngine.playSfx('click');
    if (lineIndex < proposalScene.speechLines.length - 1) {
      setLineIndex((i) => i + 1);
    } else {
      audioEngine.playSfx('heartbeat');
      setPhase('question');
    }
  };

  const handleYes = () => {
    audioEngine.playSfx('romantic');
    goToScene('end');
  };

  const handleRollResult = useCallback((result: number) => {
    setRoll(result);
    setPhase('rollResult');
  }, []);

  return (
    <GameCard title={proposalScene.title}>
      <Portraits
        protagonistName={state.protagonistName}
        bardName={state.bardName}
      />

      {/* Prelude */}
      {phase === 'prelude' && (
        <div className="animate-fade-in">
          <Narration text={interpolate(proposalScene.prelude, vars)} />
          <div className="text-center mt-6">
            <button
              onClick={() => { audioEngine.playSfx('click'); setPhase('speech'); }}
              className="btn-fantasy bg-gold/80 hover:bg-gold text-ink"
            >
              Listen…
            </button>
          </div>
        </div>
      )}

      {/* Speech — one line at a time */}
      {phase === 'speech' && (
        <div className="animate-fade-in">
          <div className="space-y-4 my-4">
            {proposalScene.speechLines
              .slice(0, lineIndex + 1)
              .map((line, i) => (
                <p
                  key={i}
                  className={`font-body text-ink/90 text-lg leading-relaxed italic transition-opacity duration-500 ${
                    i === lineIndex ? 'animate-fade-in' : ''
                  }`}
                >
                  {interpolate(line, vars)}
                </p>
              ))}
          </div>
          <div className="text-center mt-6">
            <button
              onClick={handleNextLine}
              className="btn-fantasy bg-gold/80 hover:bg-gold text-ink"
            >
              {lineIndex < proposalScene.speechLines.length - 1
                ? 'Continue…'
                : '…'}
            </button>
          </div>
        </div>
      )}

      {/* The Big Question */}
      {phase === 'question' && (
        <div className="animate-fade-in text-center py-6">
          <p className="font-heading text-3xl md:text-4xl text-ruby font-bold mb-8 leading-relaxed">
            "Will you be my Valentine?"
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleYes}
              className="btn-fantasy bg-ruby hover:bg-ruby-dark text-white text-xl px-10 py-4"
              aria-label="Say yes"
            >
              Yes ❤️
            </button>
            <button
              onClick={() => { audioEngine.playSfx('click'); setPhase('rolling'); }}
              className="btn-fantasy bg-royal-light hover:bg-royal text-gold text-xl px-10 py-4 border-2 border-gold/30"
              aria-label="Roll the dice for it"
            >
              Roll for it 🎲
            </button>
          </div>
        </div>
      )}

      {/* Dice roll path */}
      {phase === 'rolling' && (
        <div className="animate-fade-in text-center py-6">
          <p className="font-heading text-2xl text-gold mb-4">
            Let fate decide…
          </p>
          <DiceRoll prompt="Roll for Valentine" onResult={handleRollResult} />
        </div>
      )}

      {/* Roll result — always YES */}
      {phase === 'rollResult' && (
        <div className="animate-fade-in text-center py-6">
          <div className="mb-6">
            <span className="inline-block w-16 h-16 rounded-xl bg-royal-light border-2 border-gold leading-[4rem] font-heading text-2xl font-bold text-gold">
              {roll}
            </span>
          </div>
          <p className="font-body text-lg text-ink/90 italic mb-6 max-w-md mx-auto">
            {interpolate(
              roll >= 20
                ? valentineRollOutcomes.nat20
                : roll >= 15
                  ? valentineRollOutcomes.high
                  : roll >= 9
                    ? valentineRollOutcomes.mid
                    : valentineRollOutcomes.low,
              vars,
            )}
          </p>
          <p className="font-heading text-2xl text-ruby font-bold mb-6">
            The answer is always YES. 💕
          </p>
          <button
            onClick={handleYes}
            className="btn-fantasy bg-ruby hover:bg-ruby-dark text-white text-lg px-8 py-4"
          >
            ❤️ Into the light…
          </button>
        </div>
      )}
    </GameCard>
  );
}
