"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.15;

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId().replace(/:/g, "mermaid");
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Store zoom/pan in refs to avoid re-renders during interaction
  const zoomRef = useRef(1);
  const panRef = useRef({ x: 0, y: 0 });
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0 });
  const panOriginRef = useRef({ x: 0, y: 0 });
  const zoomDisplayRef = useRef<HTMLButtonElement>(null);

  // Apply transform directly to DOM — no React re-render
  const applyTransform = useCallback((animate = false) => {
    const el = contentRef.current;
    if (!el) return;
    const { x, y } = panRef.current;
    const z = zoomRef.current;
    el.style.transition = animate ? "transform 0.15s ease-out" : "none";
    el.style.transform = `translate(${x}px, ${y}px) scale(${z})`;

    // Update zoom % display
    if (zoomDisplayRef.current) {
      zoomDisplayRef.current.textContent = `${Math.round(z * 100)}%`;
    }
  }, []);

  const handleZoomIn = useCallback(() => {
    zoomRef.current = Math.min(MAX_ZOOM, zoomRef.current + ZOOM_STEP);
    applyTransform(true);
  }, [applyTransform]);

  const handleZoomOut = useCallback(() => {
    zoomRef.current = Math.max(MIN_ZOOM, zoomRef.current - ZOOM_STEP);
    applyTransform(true);
  }, [applyTransform]);

  const handleReset = useCallback(() => {
    zoomRef.current = 1;
    panRef.current = { x: 0, y: 0 };
    applyTransform(true);
  }, [applyTransform]);

  // Wheel zoom — direct DOM, no setState
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
      zoomRef.current = Math.min(
        MAX_ZOOM,
        Math.max(MIN_ZOOM, zoomRef.current + delta)
      );
      applyTransform(false);
    }

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [svg, applyTransform]);

  // Pan via pointer — direct DOM, no setState
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function onPointerDown(e: PointerEvent) {
      if (e.button !== 0) return;
      isPanningRef.current = true;
      panStartRef.current = { x: e.clientX, y: e.clientY };
      panOriginRef.current = { ...panRef.current };
      container!.setPointerCapture(e.pointerId);
      container!.style.cursor = "grabbing";
    }

    function onPointerMove(e: PointerEvent) {
      if (!isPanningRef.current) return;
      panRef.current = {
        x: panOriginRef.current.x + (e.clientX - panStartRef.current.x),
        y: panOriginRef.current.y + (e.clientY - panStartRef.current.y),
      };
      applyTransform(false);
    }

    function onPointerUp() {
      isPanningRef.current = false;
      container!.style.cursor = "grab";
    }

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
    };
  }, [svg, applyTransform]);

  useEffect(() => {
    let cancelled = false;

    async function renderChart() {
      try {
        const mermaid = (await import("mermaid")).default;

        const isDark = document.documentElement.classList.contains("dark");

        const colors = isDark
          ? {
              bg: "#09090b",
              nodeBg: "#27272a",
              nodeText: "#fafafa",
              nodeBorder: "#52525b",
              lineColor: "#a1a1aa",
              clusterBg: "#18181b",
              clusterBorder: "#3f3f46",
              labelBg: "#27272a",
            }
          : {
              bg: "#ffffff",
              nodeBg: "#f4f4f5",
              nodeText: "#18181b",
              nodeBorder: "#d4d4d8",
              lineColor: "#71717a",
              clusterBg: "#fafafa",
              clusterBorder: "#e4e4e7",
              labelBg: "#f4f4f5",
            };

        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          securityLevel: "loose",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          themeVariables: {
            primaryColor: colors.nodeBg,
            primaryTextColor: colors.nodeText,
            primaryBorderColor: colors.nodeBorder,
            secondaryColor: colors.nodeBg,
            secondaryTextColor: colors.nodeText,
            secondaryBorderColor: colors.nodeBorder,
            tertiaryColor: colors.nodeBg,
            tertiaryTextColor: colors.nodeText,
            tertiaryBorderColor: colors.nodeBorder,
            lineColor: colors.lineColor,
            textColor: colors.nodeText,
            mainBkg: colors.nodeBg,
            nodeBorder: colors.nodeBorder,
            clusterBkg: colors.clusterBg,
            clusterBorder: colors.clusterBorder,
            titleColor: colors.nodeText,
            edgeLabelBackground: colors.labelBg,
            nodeTextColor: colors.nodeText,
          },
        });

        const { svg: renderedSvg } = await mermaid.render(
          uniqueId,
          chart.trim()
        );

        if (!cancelled) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Mermaid rendering error:", err);
          setError(
            err instanceof Error ? err.message : "Failed to render diagram"
          );
        }
      }
    }

    renderChart();

    return () => {
      cancelled = true;
    };
  }, [chart, uniqueId]);

  if (error) {
    return (
      <div className="my-6 overflow-hidden rounded-xl border border-red-500/20 bg-red-950/10 p-4">
        <p className="mb-2 text-sm font-medium text-red-400">
          Failed to render diagram
        </p>
        <pre className="overflow-x-auto text-xs text-red-300/70">
          <code>{chart}</code>
        </pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="my-6 flex items-center justify-center rounded-xl border border-border/50 bg-muted/30 p-8">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <svg
            className="h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading diagram...
        </div>
      </div>
    );
  }

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-border bg-code text-code-foreground">
      <div className="flex items-center justify-between border-b border-border/30 px-4 py-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleZoomOut}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
            aria-label="Zoom out"
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" x2="16.65" y1="21" y2="16.65" />
              <line x1="8" x2="14" y1="11" y2="11" />
            </svg>
          </button>

          <button
            ref={zoomDisplayRef}
            type="button"
            onClick={handleReset}
            className="inline-flex h-7 min-w-[3.25rem] items-center justify-center rounded-md px-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
            aria-label="Reset zoom"
          >
            100%
          </button>

          <button
            type="button"
            onClick={handleZoomIn}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
            aria-label="Zoom in"
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" x2="16.65" y1="21" y2="16.65" />
              <line x1="11" x2="11" y1="8" y2="14" />
              <line x1="8" x2="14" y1="11" y2="11" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{
          cursor: "grab",
          minHeight: 200,
          willChange: "auto",
        }}
      >
        <div
          ref={contentRef}
          className="flex items-center justify-center p-6 [&_svg]:max-w-full"
          style={{
            transformOrigin: "center center",
            userSelect: "none",
            willChange: "transform",
          }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />

        <div className="pointer-events-none absolute right-3 bottom-2 flex items-center gap-1.5 rounded-md bg-background/40 px-2 py-1 text-[10px] text-foreground backdrop-blur-sm">
          <svg
            className="h-3 w-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" x2="16.65" y1="21" y2="16.65" />
            <line x1="11" x2="11" y1="8" y2="14" />
            <line x1="8" x2="14" y1="11" y2="11" />
          </svg>
          Scroll to zoom · Drag to pan
        </div>
      </div>
    </div>
  );
}
