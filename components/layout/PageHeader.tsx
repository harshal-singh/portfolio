interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <div className="site-container pt-28 md:pt-32 pb-12 md:pb-16 max-w-3xl hero-stagger">
      <p className="hero-stagger-item text-label text-accent mb-4">{label}</p>
      <h1 className="hero-stagger-item text-display font-semibold leading-[1.05] text-foreground text-balance">
        {title}
      </h1>
      {description ? (
        <p className="hero-stagger-item max-w-2xl mt-6 text-body-lg text-muted leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
