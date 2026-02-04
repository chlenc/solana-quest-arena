export type Progression = {
  xp: number;
  level: number;
  energyCap: number;
};

// Simple curve: every 120 XP -> +1 level. Energy cap grows slowly.
export function calcLevel(xp: number) {
  return Math.max(1, Math.floor(xp / 120) + 1);
}

export function calcEnergyCap(level: number) {
  // level 1 => 30, then +1 cap every 2 levels up to 60
  const extra = Math.floor((level - 1) / 2);
  return Math.min(60, 30 + extra);
}

export function computeProgression(xp: number): Progression {
  const level = calcLevel(xp);
  const energyCap = calcEnergyCap(level);
  return { xp, level, energyCap };
}
