import { cn } from "@/lib/utils";

/**
 * Thin champagne hairline divider with an optional centered diamond glyph.
 * Used as a refined visual break and as the ornament under section eyebrows.
 */
export function Divider({
  className,
  withGlyph = true,
  width = "md",
}: {
  className?: string;
  withGlyph?: boolean;
  width?: "sm" | "md" | "lg" | "full";
}) {
  const widths = {
    sm: "w-16",
    md: "w-24",
    lg: "w-40",
    full: "w-full",
  } as const;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3",
        widths[width],
        className,
      )}
      aria-hidden
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-champagne/60 to-champagne/0" />
      {withGlyph && (
        <svg
          className="h-2.5 w-2.5 text-champagne/80"
          viewBox="0 0 10 10"
          fill="currentColor"
        >
          <path d="M5 0l2.5 5L5 10 2.5 5z" />
        </svg>
      )}
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-champagne/60 to-champagne/0" />
    </div>
  );
}

/**
 * Section header = eyebrow + display serif heading + divider.
 * Consistent editorial rhythm across the landing page.
 */
export function SectionHeader({
  eyebrow,
  title,
  titleItalic,
  description,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  titleItalic?: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  const isCenter = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        isCenter ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="display-lg text-foreground">
        {title}
        {titleItalic && (
          <>
            {" "}
            <em className="italic text-champagne/90">{titleItalic}</em>
          </>
        )}
      </h2>
      <Divider withGlyph width="md" className={isCenter ? "mx-auto" : ""} />
      {description && (
        <p className="mt-1 max-w-xl text-base text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
