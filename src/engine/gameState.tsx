import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import type { GameState, GameAction, SceneId } from './types';

const SAVE_KEY = 'festival-of-hearts-save';

const defaultState: GameState = {
  currentSceneId: 'title',
  protagonistName: 'My Love',
  bardName: 'Sir Cristof the Golden',
  inventory: { petal: false, ribbon: false, candle: false },
  visited: { forest: false, market: false, ruins: false },
  lastRoll: null,
  bossChoice: null,
  settings: { musicOn: true, sfxOn: true },
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'GO_TO_SCENE':
      return { ...state, currentSceneId: action.sceneId, lastRoll: null };
    case 'SET_PROTAGONIST_NAME':
      return { ...state, protagonistName: action.name || 'My Love' };
    case 'SET_BARD_NAME':
      return {
        ...state,
        bardName: action.name || 'Sir Cristof the Golden',
      };
    case 'COLLECT_SHARD': {
      const map = {
        forest: 'petal',
        market: 'ribbon',
        ruins: 'candle',
      } as const;
      const shard = map[action.location];
      return {
        ...state,
        inventory: { ...state.inventory, [shard]: true },
      };
    }
    case 'VISIT_LOCATION':
      return {
        ...state,
        visited: { ...state.visited, [action.location]: true },
      };
    case 'SET_ROLL':
      return { ...state, lastRoll: action.roll };
    case 'SET_BOSS_CHOICE':
      return { ...state, bossChoice: action.choice };
    case 'TOGGLE_MUSIC':
      return {
        ...state,
        settings: { ...state.settings, musicOn: !state.settings.musicOn },
      };
    case 'TOGGLE_SFX':
      return {
        ...state,
        settings: { ...state.settings, sfxOn: !state.settings.sfxOn },
      };
    case 'RESET':
      return { ...defaultState, settings: state.settings };
    default:
      return state;
  }
}

function loadSavedState(): GameState {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<GameState>;
      if (parsed && typeof parsed.currentSceneId === 'string') {
        return { ...defaultState, ...parsed };
      }
    }
  } catch {
    // ignore corrupt save data
  }
  return defaultState;
}

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  goToScene: (sceneId: SceneId) => void;
  transitioning: boolean;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    gameReducer,
    defaultState,
    () => loadSavedState(),
  );
  const [transitioning, setTransitioning] = useState(false);
  const transRef = useRef(false);

  // Persist state to localStorage on every change
  useEffect(() => {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  }, [state]);

  const goToScene = useCallback((sceneId: SceneId) => {
    if (transRef.current) return;
    transRef.current = true;
    setTransitioning(true);
    setTimeout(() => {
      dispatch({ type: 'GO_TO_SCENE', sceneId });
      requestAnimationFrame(() => {
        setTransitioning(false);
        transRef.current = false;
      });
    }, 300);
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch, goToScene, transitioning }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within a GameProvider');
  return ctx;
}
