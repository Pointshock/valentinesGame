import GameCard from '../components/GameCard';
import Portraits from '../components/Portraits';
import Narration from '../components/Narration';
import InventoryBar from '../components/InventoryBar';
import { useGame } from '../engine/gameState';
import { audioEngine } from '../engine/audio';
import { tavernScene, tavernReturn, bardQuips } from '../content/story';
import { interpolate, countShards } from '../engine/utils';

export default function TavernScene() {
  const { state, goToScene } = useGame();
  const { visited, inventory } = state;
  const allVisited = visited.forest && visited.market && visited.ruins;
  const shardsFound = countShards(inventory);
  const isFirstVisit = shardsFound === 0;

  const vars = {
    protagonistName: state.protagonistName,
    bardName: state.bardName,
  };

  let narrativeText: string;
  if (isFirstVisit) {
    narrativeText = tavernScene.narrative;
  } else if (allVisited) {
    narrativeText = tavernReturn.allCollected;
  } else {
    narrativeText = tavernReturn.partial;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{ backgroundImage: 'url(/assets/tavern.png)' }}
    >
      <GameCard title={tavernScene.title}>
      <Portraits
        protagonistName={state.protagonistName}
        bardName={state.bardName}
      />
      <Narration text={interpolate(narrativeText, vars)} />

      {/* Bard quip on return visits */}
      {!isFirstVisit && !allVisited && (
        <p className="text-center italic text-royal-light/80 font-body my-4 text-sm">
          {bardQuips[(shardsFound - 1) % bardQuips.length]}
        </p>
      )}

      {!allVisited ? (
        <div className="flex flex-col gap-3 mt-6">
          <p className="text-center font-heading text-ink/50 text-sm uppercase tracking-wider">
            Choose your destination
          </p>
          {!visited.forest && (
            <button
              onClick={() => { audioEngine.playSfx('click'); goToScene('forest'); }}
              className="btn-fantasy bg-forest hover:bg-green-800 text-white flex items-center gap-3"
              aria-label="Travel to the Whispering Forest"
            >
              <img src="/assets/scene_forest.png" alt="" className="w-24 h-20 rounded object-contain" style={{ imageRendering: 'pixelated' }} />
              <span>The Whispering Forest</span>
            </button>
          )}
          {!visited.market && (
            <button
              onClick={() => { audioEngine.playSfx('click'); goToScene('market'); }}
              className="btn-fantasy bg-royal-light hover:bg-royal text-white flex items-center gap-3"
              aria-label="Travel to the Moonlit Market"
            >
              <img src="/assets/scene_market.png" alt="" className="w-24 h-20 rounded object-contain" style={{ imageRendering: 'pixelated' }} />
              <span>The Moonlit Market</span>
            </button>
          )}
          {!visited.ruins && (
            <button
              onClick={() => { audioEngine.playSfx('click'); goToScene('ruins'); }}
              className="btn-fantasy bg-ruby-dark hover:bg-ruby text-white flex items-center gap-3"
              aria-label="Travel to the Crumbled Ruins"
            >
              <img src="/assets/scene_ruins.png" alt="" className="w-24 h-20 rounded object-contain" style={{ imageRendering: 'pixelated' }} />
              <span>The Crumbled Ruins</span>
            </button>
          )}
        </div>
      ) : (
        <div className="text-center mt-6">
          <button
            onClick={() => { audioEngine.playSfx('click'); goToScene('boss'); }}
            className="btn-fantasy bg-ruby hover:bg-ruby-dark text-white text-lg px-8 py-4"
            aria-label="Confront the Mischief Imp"
          >
            ⚡ Confront the Imp
          </button>
        </div>
      )}

      <InventoryBar inventory={inventory} />
    </GameCard>
    </div>
  );
}
