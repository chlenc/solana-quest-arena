export const TIER_LABELS: Record<number, string> = {
  0: "Seed",
  1: "Sprout",
  2: "Flower",
  3: "Cake",
  4: "Bear",
  5: "Trophy",
  6: "Watch",
  7: "Rose",
  8: "Crown",
  9: "Ring",
};

export function tierLabel(tier: number) {
  return TIER_LABELS[tier] ?? `Tier ${tier}`;
}
