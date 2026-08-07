import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ArrowLink({
  children,
  className,
  href = "#",
  as = "a",
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  /** Use "span" when already nested inside another <a> to avoid invalid nested anchors. */
  as?: "a" | "span";
}) {
  const Component = as;

  return (
    <Component
      {...(as === "a" ? { href } : {})}
      className={cn(
        "group/arrow inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-inherit",
        className
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand transition-all duration-300 ease-out group-hover/arrow:w-full" />
      </span>
      <ArrowRight
        className="h-4 w-4 shrink-0 text-brand transition-transform duration-300 ease-out group-hover/arrow:translate-x-1.5"
        aria-hidden="true"
      />
    </Component>
  );
}
