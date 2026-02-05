import GameCard from '../components/GameCard';
import Portraits from '../components/Portraits';
import Narration from '../components/Narration';
import { useGame } from '../engine/gameState';
import { audioEngine } from '../engine/audio';
import { festivalScene, bardQuips } from '../content/story';
import { interpolate } from '../engine/utils';

export default function FestivalScene() {
  const { state, goToScene } = useGame();
  const vars = {
    protagonistName: state.protagonistName,
    bardName: state.bardName,
  };

  return (
    <GameCard title={festivalScene.title}>
      <Portraits
        protagonistName={state.protagonistName}
        bardName={state.bardName}
      />
      <Narration text={interpolate(festivalScene.narrative, vars)} />

      <p className="text-center italic text-royal-light/80 font-body my-4 text-sm">
        {bardQuips[3]}
      </p>

      <div className="text-center mt-6">
        <button
          onClick={() => { audioEngine.playSfx('romantic'); goToScene('proposal'); }}
          className="btn-fantasy bg-ruby hover:bg-ruby-dark text-white text-lg px-8 py-4"
          aria-label="Walk with the bard"
        >
          💫 Walk with {state.bardName}
        </button>
      </div>
    </GameCard>
  );
}
