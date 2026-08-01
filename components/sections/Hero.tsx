import type { Profile } from "@/lib/types";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center px-6 md:px-10 max-w-7xl mx-auto py-12">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-accent/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 rise-in">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-sm mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="mono text-xs text-zinc-300">{profile.status}</span>
        </div>

        <h1 className="heading uppercase font-bold text-zinc-100 leading-[1] text-[clamp(4.2rem,10vw,11rem)]">
          {profile.firstName}{" "}
          <span className="text-zinc-400">{profile.lastName}</span>
          <span className="text-accent">.</span>
        </h1>

        <div className="mt-10 grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <p className="text-zinc-300 text-lg md:text-xl leading-relaxed max-w-xl">
              {profile.shortBio}
            </p>
          </div>
          <div className="md:col-span-5 md:text-right">
            <p className="mono text-xs uppercase tracking-widest text-zinc-500 mb-2">
              Currently
            </p>
            <p className="text-zinc-200">{profile.heroCurrentRole}</p>
            <p className="mono text-xs text-zinc-500 mt-1 flex md:justify-end items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              {profile.location}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-start md:items-center justify-between gap-4">
          <div className="flex items-start md:items-center flex-col md:flex-row gap-3 md:ml-2">
            <a
              href="#work"
              className="inline-flex items-center gap-2 bg-accent text-background px-6 py-3 rounded-md font-medium hover:bg-accent-hover transition-colors"
            >
              See selected work <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 border border-white/15 text-zinc-200 px-6 py-3 rounded-md hover:border-white/30 hover:bg-white/[0.03] transition-colors"
            >
              Start a project <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
          <div className="flex items-center gap-3 md:ml-2">
            <a
              href={profile.socials.github}
              className="w-10 h-10 rounded-md border border-white/10 flex items-center justify-center text-zinc-400 hover:text-accent hover:border-accent/30 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={profile.socials.linkedin}
              className="w-10 h-10 rounded-md border border-white/10 flex items-center justify-center text-zinc-400 hover:text-accent hover:border-accent/30 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 md:left-10 mono text-[10px] uppercase tracking-[0.3em] text-zinc-600 hidden md:block">
        scroll —
      </div>
    </section>
  );
}
