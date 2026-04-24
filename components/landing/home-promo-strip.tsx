const PROMO_COPY =
  "Special Mother's Day sale on selected items — up to 30% off.";

const TICKER_ITEMS = Array.from({ length: 10 }, (_, index) => index);

function TickerGroup() {
  return (
    <div className="ticker-marquee-group">
      {TICKER_ITEMS.map((item) => (
        <span key={item} className="ticker-marquee-item">
          {PROMO_COPY}
        </span>
      ))}
    </div>
  );
}

export default function HomePromoStrip() {
  return (
    <div
      className="ticker-marquee w-full border-b border-border bg-muted/90 py-2.5 font-body text-sm font-medium leading-snug text-foreground"
      role="status"
      aria-label={PROMO_COPY}
    >
      <div className="ticker-marquee-track" aria-hidden="true">
        <TickerGroup />
        <TickerGroup />
      </div>
    </div>
  );
}
