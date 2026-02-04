"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { mulberry32 } from "@/lib/rng";
import { createInitialState, mergeAt, spawnRandom } from "@/lib/gameEngine";
import { GRID_SIZE } from "@/lib/gameTypes";
import { tierIcon, tierLabel } from "@/lib/items";

function Glow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(20,241,149,0.28),transparent_60%)] blur-2xl" />
      <div className="absolute -bottom-48 left-1/4 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(220,31,255,0.25),transparent_60%)] blur-2xl" />
      <div className="absolute -bottom-40 right-1/4 h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,208,255,0.22),transparent_60%)] blur-2xl" />
    </div>
  );
}

function cellBg(tier: number) {
  const colors = [
    "from-white/10 to-white/5",
    "from-[#14F195]/20 to-white/5",
    "from-[#00D0FF]/20 to-white/5",
    "from-[#DC1FFF]/20 to-white/5",
    "from-[#14F195]/25 to-[#00D0FF]/10",
    "from-[#00D0FF]/25 to-[#DC1FFF]/10",
    "from-[#DC1FFF]/25 to-[#14F195]/10",
    "from-[#14F195]/30 to-[#DC1FFF]/10",
    "from-[#00D0FF]/30 to-[#14F195]/10",
    "from-[#DC1FFF]/30 to-[#00D0FF]/10",
  ];
  return colors[tier] ?? colors[0];
}

export default function Home() {
  const [state, setState] = useState(() => createInitialState());
  const [seed, setSeed] = useState(1337);
  const rng = useMemo(() => mulberry32(seed), [seed]);

  const [selected, setSelected] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  function flash(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 1600);
  }

  function onCellClick(i: number) {
    if (selected === null) {
      setSelected(i);
      return;
    }
    if (selected === i) {
      setSelected(null);
      return;
    }

    const res = mergeAt(state, selected, i);
    if (res.next === state) {
      // invalid merge, just change selection
      setSelected(i);
      return;
    }
    setState(res.next);
    setSelected(null);
    if (res.spawnedLegendary) flash("Legendary triggered! (stub)");
    else flash(`+${res.gainedXp} XP`);
  }

  function doSpawn() {
    const res = spawnRandom(state, rng);
    setState(res.next);
    setSeed((s) => s + 1);
    if (res.next === state) {
      flash("No spawn (need energy or empty space)");
    } else {
      flash("Spawned! +1 XP");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="relative">
        <Glow />
        <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#14F195] via-[#00D0FF] to-[#DC1FFF]" />
            <div className="font-semibold tracking-tight">Solana Quest Arena</div>
          </div>
          <nav className="flex items-center gap-6 text-sm text-white/70">
            <Link className="hover:text-white" href="#play">
              Play
            </Link>
            <Link className="hover:text-white" href="#roadmap">
              Roadmap
            </Link>
          </nav>
        </header>

        <section className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
                <span className="h-2 w-2 rounded-full bg-[#14F195]" />
                MVP prototype · merge grid + energy + XP
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight">
                Merge. Level up. Chase legendaries.
              </h1>
              <p className="mt-3 text-sm text-white/70">
                This is a local prototype. On-chain sync + quests + advent are next.
              </p>

              <div id="play" className="mt-8">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <button
                    onClick={doSpawn}
                    className="rounded-full bg-gradient-to-r from-[#14F195] via-[#00D0FF] to-[#DC1FFF] px-5 py-2.5 text-sm font-semibold text-black"
                  >
                    Spawn (cost 5 energy)
                  </button>
                  <div className="text-sm text-white/70">
                    Energy: <span className="text-white">{state.energy}</span>/{state.energyCap}
                    <span className="mx-3 text-white/20">|</span>
                    XP: <span className="text-white">{state.xp}</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {Array.from({ length: GRID_SIZE }).map((_, i) => {
                    const cell = state.grid[i];
                    const isSel = selected === i;
                    return (
                      <button
                        key={i}
                        onClick={() => onCellClick(i)}
                        className={
                          "group relative aspect-square rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-left backdrop-blur transition hover:bg-white/[0.06] " +
                          (isSel ? "ring-2 ring-[#14F195]" : "")
                        }
                      >
                        {cell ? (
                          <div
                            className={
                              "flex h-full flex-col justify-between rounded-xl bg-gradient-to-br p-2 " +
                              cellBg(cell.tier)
                            }
                          >
                            <div className="flex items-center gap-2">
                              {tierIcon(cell.tier) ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={tierIcon(cell.tier)}
                                  alt=""
                                  className="h-8 w-8 opacity-90"
                                />
                              ) : null}
                              <div className="min-w-0">
                                <div className="text-xs text-white/70">Tier {cell.tier}</div>
                                <div className="truncate text-sm font-semibold">{tierLabel(cell.tier)}</div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-white/20">
                            empty
                          </div>
                        )}
                        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100" />
                      </button>
                    );
                  })}
                </div>

                {toast ? (
                  <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80">
                    {toast}
                  </div>
                ) : null}
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="text-sm font-semibold">How to play (prototype)</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/70">
                  <li>Click Spawn to place a tier-0 item.</li>
                  <li>Select a cell, then click another cell to merge.</li>
                  <li>Only identical tiers merge.</li>
                  <li>Ring+Ring triggers a Legendary (stub).</li>
                </ul>
              </div>

              <div
                id="roadmap"
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="text-sm font-semibold">Next steps</div>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-white/70">
                  <li>Energy regen timer + cap growth by level</li>
                  <li>Quest system + advent 15 days</li>
                  <li>Legendary giftboxes → badges</li>
                  <li>Referrals unlock bottom row slots</li>
                </ol>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
