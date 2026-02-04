import type { GameState } from "./gameTypes";

const KEY = "sqa.v1";

export type Persisted = {
  state: GameState;
  lastEnergyAtMs: number;
  adventOpenedDays: Record<number, boolean>;
  badges: Record<string, number>;
};

export function loadPersisted(): Persisted | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed as Persisted;
  } catch {
    return null;
  }
}

export function savePersisted(p: Persisted) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function resetPersisted() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
