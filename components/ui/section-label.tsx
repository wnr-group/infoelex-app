import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em]",
        light ? "text-paper/70" : "text-graphite",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </div>
  );
}
