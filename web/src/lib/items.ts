export type TierMeta = {
  symbol: string;
  name: string;
  iconPath: string;
};

// “Tokens” are not real SPL tokens (for now). They’re just fun tier labels.
export const TIERS: Record<number, TierMeta> = {
  0: { symbol: "SPRT", name: "Sprout", iconPath: "/items/t0-sprout.svg" },
  1: { symbol: "PEPE", name: "Pepe", iconPath: "/items/t1-pepe.svg" },
  2: { symbol: "BONK", name: "Bonk", iconPath: "/items/t2-bonk.svg" },
  3: { symbol: "WIF", name: "DogWifHat", iconPath: "/items/t3-wif.svg" },
  4: { symbol: "JUP", name: "Jupiter", iconPath: "/items/t4-jup.svg" },
  5: { symbol: "RAY", name: "Raydium", iconPath: "/items/t5-ray.svg" },
  6: { symbol: "PYTH", name: "Pyth", iconPath: "/items/t6-pyth.svg" },
  7: { symbol: "JTO", name: "Jito", iconPath: "/items/t7-jto.svg" },
  8: { symbol: "SOL", name: "Solana", iconPath: "/items/t8-sol.svg" },
  9: { symbol: "RING", name: "Ring", iconPath: "/items/t9-ring.svg" },
};

export function tierLabel(tier: number) {
  const t = TIERS[tier];
  if (!t) return `Tier ${tier}`;
  return `${t.symbol} · ${t.name}`;
}

export function tierIcon(tier: number) {
  return TIERS[tier]?.iconPath;
}
