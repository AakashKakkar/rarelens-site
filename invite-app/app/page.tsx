import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <section className="w-full max-w-[520px] rounded-[8px] border border-[#e5ded7] bg-white/86 p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
          RareLens
        </p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight text-[#161311]">
          Open a RareLens share or invite link.
        </h1>
        <p className="mt-4 text-base leading-7 text-[#6f6761]">
          This public app resolves links shared from RareLens.
        </p>
        <Link
          className="mt-7 inline-flex h-11 items-center rounded-[6px] bg-[#161311] px-5 text-sm font-semibold text-white"
          href="https://www.rarelens.ai"
        >
          Visit RareLens
        </Link>
      </section>
    </main>
  );
}
