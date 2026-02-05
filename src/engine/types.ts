export type SceneId =
  | 'title'
  | 'setup'
  | 'tavern'
  | 'forest'
  | 'market'
  | 'ruins'
  | 'boss'
  | 'festival'
  | 'proposal'
  | 'end';

export type LocationId = 'forest' | 'market' | 'ruins';

export interface Inventory {
  petal: boolean;
  ribbon: boolean;
  candle: boolean;
}

export interface Visited {
  forest: boolean;
  market: boolean;
  ruins: boolean;
}

export interface Settings {
  musicOn: boolean;
  sfxOn: boolean;
}

export interface GameState {
  currentSceneId: SceneId;
  protagonistName: string;
  bardName: string;
  inventory: Inventory;
  visited: Visited;
  lastRoll: number | null;
  bossChoice: string | null;
  settings: Settings;
}

export type GameAction =
  | { type: 'GO_TO_SCENE'; sceneId: SceneId }
  | { type: 'SET_PROTAGONIST_NAME'; name: string }
  | { type: 'SET_BARD_NAME'; name: string }
  | { type: 'COLLECT_SHARD'; location: LocationId }
  | { type: 'VISIT_LOCATION'; location: LocationId }
  | { type: 'SET_ROLL'; roll: number }
  | { type: 'SET_BOSS_CHOICE'; choice: string }
  | { type: 'TOGGLE_MUSIC' }
  | { type: 'TOGGLE_SFX' }
  | { type: 'RESET' };
