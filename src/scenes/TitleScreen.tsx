import GameCard from '../components/GameCard';
import { useGame } from '../engine/gameState';
import { audioEngine } from '../engine/audio';

export default function TitleScreen() {
  const { goToScene, dispatch, state } = useGame();

  return (
    <GameCard>
      <div className="text-center py-4">
        <div className="mb-6 animate-float">
          <img
            src="/assets/heartstone.png"
            alt="Heartstone"
            className="w-32 h-32 mx-auto object-contain drop-shadow-[0_0_12px_rgba(220,38,38,0.5)]"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-royal font-bold mb-2 leading-tight">
          Festival of Hearts
        </h1>
        <p className="font-heading text-base sm:text-lg text-gold italic mb-8">
          A Tiny Quest
        </p>

        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />

        <p className="text-ink/70 font-body text-lg mb-8 max-w-md mx-auto leading-relaxed">
          A short adventure of courage, enchantment, and matters of the heart.
        </p>

        <button
          onClick={() => {
            audioEngine.init();
            audioEngine.playSfx('click');
            dispatch({ type: 'RESET' });
            goToScene('setup');
          }}
          className="btn-fantasy bg-ruby hover:bg-ruby-dark text-white text-lg px-10 py-4"
          aria-label="Start a new adventure"
        >
          ✦ Begin Adventure ✦
        </button>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => { audioEngine.init(); audioEngine.playSfx('click'); dispatch({ type: 'TOGGLE_MUSIC' }); }}
            className="text-sm text-ink/50 hover:text-ink/80 transition-colors px-2 py-1"
            aria-label={
              state.settings.musicOn ? 'Disable music' : 'Enable music'
            }
          >
            {state.settings.musicOn ? '🔊' : '🔇'} Music
          </button>
          <span className="text-ink/20" aria-hidden="true">
            |
          </span>
          <button
            onClick={() => { audioEngine.init(); audioEngine.playSfx('click'); dispatch({ type: 'TOGGLE_SFX' }); }}
            className="text-sm text-ink/50 hover:text-ink/80 transition-colors px-2 py-1"
            aria-label={
              state.settings.sfxOn
                ? 'Disable sound effects'
                : 'Enable sound effects'
            }
          >
            {state.settings.sfxOn ? '🔊' : '🔇'} SFX
          </button>
        </div>
      </div>
    </GameCard>
  );
}
