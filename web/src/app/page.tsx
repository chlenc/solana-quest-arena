import Link from "next/link";

function Glow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(20,241,149,0.28),transparent_60%)] blur-2xl" />
      <div className="absolute -bottom-48 left-1/4 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(220,31,255,0.25),transparent_60%)] blur-2xl" />
      <div className="absolute -bottom-40 right-1/4 h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,208,255,0.22),transparent_60%)] blur-2xl" />
    </div>
  );
}

export default function Home() {
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
            <Link className="hover:text-white" href="#mvp">
              MVP
            </Link>
            <Link className="hover:text-white" href="#roadmap">
              Roadmap
            </Link>
            <Link
              className="rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/15"
              href="#play"
            >
              Play (soon)
            </Link>
          </nav>
        </header>

        <section className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
              <span className="h-2 w-2 rounded-full bg-[#14F195]" />
              15-day advent · merge game · on-chain leaderboard
            </div>

            <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight">
              GiftFest‑style merge game,
              <span className="block bg-gradient-to-r from-[#14F195] via-[#00D0FF] to-[#DC1FFF] bg-clip-text text-transparent">
                powered by Solana.
              </span>
            </h1>

            <p className="mt-6 text-lg text-white/70">
              Spend energy to spawn items, merge 2 identical to level up, chase
              legendaries, open advent boxes, earn XP — and climb the leaderboard.
              <span className="ml-2 text-white/60">
                “Shitcoins” are in‑game balances (not SPL tokens).
              </span>
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="rounded-full bg-gradient-to-r from-[#14F195] via-[#00D0FF] to-[#DC1FFF] px-5 py-2.5 text-sm font-semibold text-black"
                href="#play"
              >
                Start building MVP
              </a>
              <a
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white hover:bg-white/10"
                href="https://github.com/chlenc/solana-quest-arena"
                target="_blank"
                rel="noreferrer"
              >
                Repo
              </a>
            </div>
          </div>

          <div
            id="mvp"
            className="mt-14 grid gap-4 md:grid-cols-3"
          >
            {[
              {
                title: "Merge grid (3×4)",
                body: "Spawn with energy → merge → upgrade chain (10 tiers).",
              },
              {
                title: "Energy & quests",
                body: "1 energy / 5 min, cap grows with levels. Quests grant boosts.",
              },
              {
                title: "Advent (15 days)",
                body: "Daily box: energy + items + meme share to X.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur"
              >
                <div className="text-sm font-semibold">{c.title}</div>
                <div className="mt-2 text-sm text-white/70">{c.body}</div>
              </div>
            ))}
          </div>

          <div id="roadmap" className="mt-14 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="text-sm font-semibold">Roadmap (next commits)</div>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-white/70">
              <li>Implement merge engine + deterministic RNG (seeded per player/day)</li>
              <li>Energy timer + cap + level progression</li>
              <li>Advent calendar logic (15 slots) + meme cards</li>
              <li>Leaderboards (off-chain first, then verifiable on-chain)</li>
              <li>Referrals unlock extra grid slots (bottom row)</li>
            </ol>
          </div>

          <div id="play" className="mt-14 text-sm text-white/60">
            Playable build: coming in the next milestones.
          </div>
        </section>
      </div>
    </main>
  );
}
