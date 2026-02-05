import { useEffect, useRef } from 'react';
import { GameProvider, useGame } from './engine/gameState';
import { audioEngine, SCENE_TRACK } from './engine/audio';
import TitleScreen from './scenes/TitleScreen';
import SetupScreen from './scenes/SetupScreen';
import TavernScene from './scenes/TavernScene';
import LocationScene from './scenes/LocationScene';
import BossScene from './scenes/BossScene';
import FestivalScene from './scenes/FestivalScene';
import ProposalScene from './scenes/ProposalScene';
import EndScreen from './scenes/EndScreen';

function SceneRenderer() {
  const { state } = useGame();

  switch (state.currentSceneId) {
    case 'title':
      return <TitleScreen />;
    case 'setup':
      return <SetupScreen />;
    case 'tavern':
      return <TavernScene />;
    case 'forest':
    case 'market':
    case 'ruins':
      // key forces remount so local state resets per location
      return <LocationScene key={state.currentSceneId} />;
    case 'boss':
      return <BossScene />;
    case 'festival':
      return <FestivalScene />;
    case 'proposal':
      return <ProposalScene />;
    case 'end':
      return <EndScreen />;
    default:
      return <TitleScreen />;
  }
}

/** Syncs audio engine with game state. */
function AudioSync() {
  const { state } = useGame();
  const prevSceneRef = useRef(state.currentSceneId);

  // Unlock AudioContext on first user interaction
  useEffect(() => {
    const unlock = () => {
      audioEngine.init();
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('pointerdown', unlock);
    window.addEventListener('keydown', unlock);
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, []);

  // Sync music enabled/disabled
  useEffect(() => {
    audioEngine.setMusicEnabled(state.settings.musicOn);
  }, [state.settings.musicOn]);

  // Sync sfx enabled/disabled
  useEffect(() => {
    audioEngine.setSfxEnabled(state.settings.sfxOn);
  }, [state.settings.sfxOn]);

  // Change music track when scene changes
  useEffect(() => {
    const trackId = SCENE_TRACK[state.currentSceneId];
    if (trackId) audioEngine.playTrack(trackId);
  }, [state.currentSceneId]);

  // Play transition whoosh on scene change (skip initial mount)
  useEffect(() => {
    if (prevSceneRef.current !== state.currentSceneId) {
      audioEngine.playSfx('transition');
      prevSceneRef.current = state.currentSceneId;
    }
  }, [state.currentSceneId]);

  return null;
}

export default function App() {
  return (
    <GameProvider>
      <AudioSync />
      <SceneRenderer />
    </GameProvider>
  );
}
