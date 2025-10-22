import Image from "next/image";
import {
  Search,
  Sparkles,
  ArrowRight,
  Users,
  Briefcase,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative z-10 my-6 rounded-2xl border border-white/10 bg-[radial-gradient(1200px_600px_at_10%_10%,_rgba(37,99,235,0.25),_transparent_60%),radial-gradient(800px_400px_at_90%_20%,_rgba(236,72,153,0.15),_transparent_60%),linear-gradient(180deg,_#0b0f1a,_#05070d)] overflow-hidden">

      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <div className="max-width-lg grid min-h-[85vh] grid-cols-1 items-center gap-10 overflow-hidden px-6 text-white md:px-10 lg:grid-cols-2 lg:px-20">
        {/* Left: Text */}
        <div className="relative z-10 mx-auto flex max-w-2xl flex-col justify-center text-center lg:mx-0 lg:text-left">
          {/* Badge */}
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-gray-200 backdrop-blur lg:mx-0">
            <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
            <span className="opacity-90">AI-matched roles updated daily</span>
          </div>

          <h1 className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-4xl font-extrabold leading-tight text-transparent drop-shadow-sm md:text-6xl">
            Discover your
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent">
              {" "}
              next career move
            </span>
          </h1>

          <p className="mt-4 text-sm text-gray-300 md:text-lg">
            Explore thousands of curated openings tailored to your skills. Our
            AI pinpoints the best matches so you can apply with confidence and
            get hired faster.
          </p>

          {/* CTAs */}
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <Link
              href="/listings"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-100"
            >
              Browse jobs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Trust/Benefits */}
          <div className="mt-6 grid grid-cols-3 gap-3 text-left text-xs text-gray-300 sm:max-w-xl">
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <Users className="h-4 w-4 text-sky-300" />
              <span>120k+ candidates</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <Briefcase className="h-4 w-4 text-emerald-300" />
              <span>8k+ postings</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <ShieldCheck className="h-4 w-4 text-amber-300" />
              <span>Verified employers</span>
            </div>
          </div>
        </div>

        {/* Right: Visual */}
        <div className="relative z-10 mx-auto flex h-[340px] w-[320px] items-center justify-center md:h-[420px] md:w-[420px] lg:h-[560px] lg:w-[560px]">
          <div className="relative h-full w-full max-w-xl">
            <Image
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
              alt="Professional at work"
              fill
              className="rounded-xl object-cover shadow-[0_0_60px_-10px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
              priority
            />

            {/* Floating chips */}
            <div className="absolute -left-3 top-6 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs backdrop-blur md:-left-6 md:px-4 md:py-2.5">
              <span className="block text-white/90">+37 new matches</span>
            </div>
            <div className="absolute -right-3 bottom-10 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs backdrop-blur md:-right-6 md:px-4 md:py-2.5">
              <span className="block text-white/90">Remote friendly</span>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] text-white/90 backdrop-blur">
              Featured
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="pointer-events-none absolute -right-28 -top-24 h-[600px] w-[520px] rotate-45 rounded-2xl bg-gradient-to-tr from-white/20 to-white/0" />
    </section>
  );
}
