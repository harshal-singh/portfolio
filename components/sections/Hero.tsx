import { GlassCard } from "@/components/aurora/GlassCard";
import { CmsImage } from "@/components/ui/cms-image";
import { assetFilename, resolvePublicAsset } from "@/lib/assets";
import type { Profile, Stat } from "@/lib/types";

interface HeroProps {
  profile: Profile;
  stats: Stat[];
  dailyStack?: string[];
}

export default function Hero({ profile, stats, dailyStack = [] }: HeroProps) {
  const headline = profile.heroHeadline?.trim() || "Frontend that feels";
  const highlight = profile.heroHighlight?.trim() || "effortless to use.";
  const resumeHref = resolvePublicAsset(profile.resumePdfUrl);
  const resumeName = assetFilename(profile.resumePdfUrl, "resume.pdf");

  return (
    <section
      id="top"
      className="site-container pb-8 pt-6 text-center md:pb-12 md:pt-18"
    >
      {profile.status ? (
        <span className="aurora-badge">
          <i className="aurora-badge-dot" aria-hidden />
          {profile.status}
        </span>
      ) : null}

      <h1 className="jk mx-auto mt-6 max-w-[18ch] text-[clamp(2.3rem,6.6vw,4.6rem)] text-balance font-extrabold leading-[1.06]">
        {/* {headline}{" "}
        <span className="text-grad">{highlight.replace(/\.$/, "")}</span>
        {highlight.endsWith(".") ? "." : ""} */}
        Software Engineer <span className="text-grad">building production</span>{" "}
        web apps.
      </h1>

      <p className="mx-auto mt-5 max-w-[60ch] text-[clamp(1rem,1.6vw,1.16rem)] leading-[1.68] text-muted">
        {profile.heroValueProp || profile.shortBio}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
        <a href="#work" className="aurora-pill">
          {profile.heroPrimaryCtaLabel || "See selected work"}
        </a>
        <a href={resumeHref} download={resumeName} className="aurora-ghost">
          Download resume ⤓
        </a>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3.5 md:grid-cols-4">
        <GlassCard className="col-span-2 p-5 text-left">
          <div className="flex items-center gap-3.5">
            {profile.photoUrl ? (
              <CmsImage
                src={profile.photoUrl}
                alt={profile.name}
                className="h-[52px] w-[52px] rounded-full border-2 border-white object-cover shadow-[0_6px_16px_-6px_rgba(60,40,140,.4)]"
              />
            ) : null}
            <span className="space-y-0.5">
              <strong className="jk block text-[1.25rem] font-bold tracking-[-0.02em] mb-2">
                {profile.name}
              </strong>
              <span className="block text-[0.8rem] text-muted-foreground">
                {profile.heroCurrentRole || profile.role}
              </span>
              <span className="block text-[0.8rem] text-muted-foreground">
                {profile.location} — working remotely.
              </span>
            </span>
          </div>
        </GlassCard>

        {stats.slice(0, 4).map((stat, index) => (
          <GlassCard key={stat.id} className="p-5 text-left">
            <b className={cnStat(index)}>{stat.value}</b>
            <small className="mt-2 block text-[0.8rem] leading-[1.5] text-muted-foreground">
              {stat.label}
            </small>
          </GlassCard>
        ))}

        {dailyStack.length > 0 ? (
          <GlassCard className="col-span-2 p-5 text-left">
            <small className="mb-2 block text-[0.8rem] text-muted-foreground">
              Daily stack
            </small>
            <div className="flex flex-wrap gap-1.5">
              {dailyStack.map((item) => (
                <span key={item} className="aurora-tag">
                  {item}
                </span>
              ))}
            </div>
          </GlassCard>
        ) : null}
      </div>
    </section>
  );
}

function cnStat(index: number) {
  const base =
    "jk block text-[clamp(1.7rem,3.6vw,2.5rem)] font-extrabold leading-none tracking-[-0.045em]";
  return index === 0 || index === 2 ? `${base} text-grad` : base;
}
