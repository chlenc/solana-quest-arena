export const ENERGY_REGEN_MS = 5 * 60 * 1000; // 1 per 5 minutes

export function applyEnergyRegen(opts: {
  energy: number;
  energyCap: number;
  lastEnergyAtMs: number;
  nowMs: number;
}) {
  const { energy, energyCap, lastEnergyAtMs, nowMs } = opts;
  if (energy >= energyCap) {
    return { energy, lastEnergyAtMs: nowMs };
  }

  const elapsed = Math.max(0, nowMs - lastEnergyAtMs);
  const gained = Math.floor(elapsed / ENERGY_REGEN_MS);
  if (gained <= 0) return { energy, lastEnergyAtMs };

  const nextEnergy = Math.min(energyCap, energy + gained);
  const usedMs = gained * ENERGY_REGEN_MS;
  const nextLast = lastEnergyAtMs + usedMs;
  return { energy: nextEnergy, lastEnergyAtMs: nextLast };
}

export function msToNextEnergy(nowMs: number, lastEnergyAtMs: number) {
  const elapsed = Math.max(0, nowMs - lastEnergyAtMs);
  const rem = ENERGY_REGEN_MS - (elapsed % ENERGY_REGEN_MS);
  return rem === ENERGY_REGEN_MS ? 0 : rem;
}
