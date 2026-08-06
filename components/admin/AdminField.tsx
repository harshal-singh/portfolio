export function AdminField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="mono text-[11px] uppercase tracking-wider text-zinc-500">{label}</span>
      {hint ? <span className="block text-xs text-zinc-600">{hint}</span> : null}
      {children}
    </label>
  );
}
