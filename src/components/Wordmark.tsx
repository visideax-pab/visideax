interface WordmarkProps {
  light?: boolean; // true = for use on dark/navy backgrounds
  tagline?: boolean;
  className?: string;
}

export function Wordmark({ light = true, tagline = false, className = "" }: WordmarkProps) {
  const secondColor = light ? "text-white" : "text-alpine-slate";
  const taglineColor = light ? "text-white/80" : "text-alpine-slate/70";

  return (
    <span className={`inline-flex flex-col ${className}`}>
      <span className="font-display font-semibold leading-none tracking-tight">
        <span className="text-alpine-gold">V</span>
        <span className="wordmark-i text-alpine-gold">i</span>
        <span className="text-alpine-gold">s</span>
        <span className="wordmark-i text-alpine-gold">i</span>
        <span className={secondColor}>deaX</span>
      </span>
      {tagline && (
        <span className={`mt-1.5 text-[0.32em] font-normal uppercase tracking-[0.2em] ${taglineColor}`}>
          Partnership Advisory Boutique
        </span>
      )}
    </span>
  );
}
