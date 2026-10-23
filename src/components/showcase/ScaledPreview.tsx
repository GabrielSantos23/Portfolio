"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Demos are laid out at a desktop-ish size and scaled down to the card, so they read as thumbnails.
const BASE_WIDTH = 640;
const BASE_HEIGHT = 400;

/**
 * Live, non-interactive thumbnail of a demo. It mounts only once the card is near the
 * viewport, so 30 demos don't all start animating on page load.
 */
export function ScaledPreview({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const resize = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / BASE_WIDTH));
    const intersect = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          intersect.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    resize.observe(el);
    intersect.observe(el);
    return () => {
      resize.disconnect();
      intersect.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="relative aspect-[8/5] overflow-hidden bg-background" aria-hidden="true" inert>
      {visible && scale !== null && (
        <div
          className="pointer-events-none absolute top-0 left-0 flex origin-top-left items-center justify-center font-sans select-none"
          style={{ width: BASE_WIDTH, height: BASE_HEIGHT, transform: `scale(${scale})` }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
