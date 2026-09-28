/**
 * Deterministic placeholder QR-style matrix.
 *
 * This is NOT a scannable QR code — it is a visual stand-in generated from the
 * payload string so the demo needs no extra dependency. Swap for a real QR
 * library (e.g. `qrcode`) when the dossier payload becomes real.
 */
export function QrCode({ payload, size = 176 }: { payload: string; size?: number }) {
  const modules = 25;
  const cells: boolean[] = [];
  let hash = 2166136261;
  for (const ch of payload) {
    hash ^= ch.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  let seed = hash >>> 0;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  for (let i = 0; i < modules * modules; i++) cells.push(rand() > 0.52);

  const isFinder = (r: number, c: number) => {
    const inBox = (r0: number, c0: number) =>
      r >= r0 && r < r0 + 7 && c >= c0 && c < c0 + 7;
    return inBox(0, 0) || inBox(0, modules - 7) || inBox(modules - 7, 0);
  };
  const finderFilled = (r: number, c: number) => {
    const rr = r < 7 ? r : r - (modules - 7);
    const cc = c < 7 ? c : c - (modules - 7);
    const ring = Math.max(Math.abs(rr - 3), Math.abs(cc - 3));
    return ring === 3 || ring <= 1;
  };

  const unit = size / modules;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Placeholder QR code for the demo application dossier"
      className="rounded-lg bg-card"
    >
      <rect width={size} height={size} fill="currentColor" className="text-card" />
      {Array.from({ length: modules }).map((_, r) =>
        Array.from({ length: modules }).map((__, c) => {
          const filled = isFinder(r, c) ? finderFilled(r, c) : cells[r * modules + c];
          if (!filled) return null;
          return (
            <rect
              key={`${r}-${c}`}
              x={c * unit}
              y={r * unit}
              width={unit}
              height={unit}
              className="fill-foreground"
            />
          );
        }),
      )}
    </svg>
  );
}
