export type Cell = { tier: number } | null;

export type GameState = {
  grid: Cell[]; // length = 12 (3x4)
  energy: number;
  energyCap: number;
  xp: number;
};

export const GRID_SIZE = 12;

// 10-tier chain (0..9). Tier 9 is "ring"; merging two rings triggers Legendary.
export const MAX_TIER = 9;

export type MergeResult = {
  next: GameState;
  gainedXp: number;
  spawnedLegendary?: boolean;
};
