import { GRID_SIZE, MAX_TIER, type Cell, type GameState, type MergeResult } from "./gameTypes";

function cloneGrid(g: Cell[]): Cell[] {
  return g.map((c) => (c ? { tier: c.tier } : null));
}

export function createInitialState(): GameState {
  return {
    grid: Array.from({ length: GRID_SIZE }, () => null),
    energy: 30,
    energyCap: 30,
    xp: 0,
  };
}

export function emptyIndices(grid: Cell[]): number[] {
  const out: number[] = [];
  for (let i = 0; i < grid.length; i++) if (!grid[i]) out.push(i);
  return out;
}

export function spawnRandom(state: GameState, rng: () => number, cost = 5): MergeResult {
  if (state.energy < cost) return { next: state, gainedXp: 0 };
  const empties = emptyIndices(state.grid);
  if (empties.length === 0) return { next: state, gainedXp: 0 };

  const idx = empties[Math.floor(rng() * empties.length)];
  const next: GameState = {
    ...state,
    energy: state.energy - cost,
    grid: cloneGrid(state.grid),
  };

  // Spawn tier 0 by default (tunable later)
  next.grid[idx] = { tier: 0 };

  // small XP drip for spawn
  next.xp += 1;

  return { next, gainedXp: 1 };
}

export function mergeAt(state: GameState, a: number, b: number): MergeResult {
  if (a === b) return { next: state, gainedXp: 0 };
  const A = state.grid[a];
  const B = state.grid[b];
  if (!A || !B) return { next: state, gainedXp: 0 };
  if (A.tier !== B.tier) return { next: state, gainedXp: 0 };

  const grid = cloneGrid(state.grid);

  // clear source cell b, upgrade a
  grid[b] = null;

  let spawnedLegendary = false;

  if (A.tier >= MAX_TIER) {
    // ring + ring => legendary event
    grid[a] = { tier: MAX_TIER }; // keep as ring for now
    spawnedLegendary = true;
  } else {
    grid[a] = { tier: A.tier + 1 };
  }

  // XP curve: higher tiers give more
  const gainedXp = 5 + A.tier * 3;
  const next: GameState = {
    ...state,
    grid,
    xp: state.xp + gainedXp,
  };

  return { next, gainedXp, spawnedLegendary };
}
