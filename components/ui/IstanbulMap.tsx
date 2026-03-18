"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ISTANBUL_MAP_DATA } from "@/lib/data/istanbul-map-data";

const SERVICES = [
  { icon: "💉", label: "Evde Serum Tedavisi" },
  { icon: "👩‍⚕️", label: "Hemşirelik Hizmetleri" },
  { icon: "🩹", label: "Evde Pansuman" },
  { icon: "🏋️", label: "Fizyoterapi" },
  { icon: "🏠", label: "Yaşlı / Hasta Bakımı" },
  { icon: "🩸", label: "Evde Kan Alma" },
  { icon: "👨‍⚕️", label: "Evde Doktor" },
];

const CYCLE_MS = 2000;
const RESUME_MS = 2500;

// Manual label offsets for crowded central districts (dx, dy from centroid)
const LABEL_OFFSETS: Record<string, { dx: number; dy: number }> = {
  // European side - very tight center
  beyoglu: { dx: 3.5, dy: -2.5 },
  sisli: { dx: 2.5, dy: -3.5 },
  kagithane: { dx: -1, dy: -3.0 },
  besiktas: { dx: 5, dy: -1.5 },
  bayrampasa: { dx: -3.5, dy: -2.5 },
  esenler: { dx: -4.5, dy: -1.5 },
  gungoren: { dx: -3, dy: 3.5 },
  zeytinburnu: { dx: -1.5, dy: 4.0 },
  bakirkoy: { dx: -3, dy: 4.5 },
  bahcelievler: { dx: -4, dy: 3.0 },
  fatih: { dx: 3, dy: 4.0 },
  gaziosmanpasa: { dx: -5, dy: -2.0 },
  avcilar: { dx: -3, dy: 3.5 },
  beylikduzu: { dx: -3, dy: 4.0 },
  // Asian side - tight area
  uskudar: { dx: 1, dy: 4.0 },
  kadikoy: { dx: -3, dy: 4.0 },
  sultanbeyli: { dx: 3, dy: -3.0 },
  eyupsultan: { dx: -2, dy: -3.0 },
};

function shuffle<T>(a: T[]): T[] {
  const s = [...a];
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
}

export default function IstanbulMap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathMap = useRef(new Map<string, SVGPathElement>());
  const orderRef = useRef<string[]>([]);
  const idxRef = useRef(0);
  const ivRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const [autoSlug, setAutoSlug] = useState<string | null>(null);
  const [hoverSlug, setHoverSlug] = useState<string | null>(null);
  const [userActive, setUserActive] = useState(false);
  const [centroids, setCentroids] = useState(new Map<string, { x: number; y: number; w: number; h: number }>());
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const activeSlug = userActive ? hoverSlug : autoSlug;
  const activeData = activeSlug ? ISTANBUL_MAP_DATA.find((d) => d.slug === activeSlug) : null;
  const activeCentroid = activeSlug ? centroids.get(activeSlug) || null : null;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const t = setTimeout(() => {
      const m = new Map<string, { x: number; y: number; w: number; h: number }>();
      pathMap.current.forEach((el, slug) => {
        try {
          const b = el.getBBox();
          m.set(slug, {
            x: b.x + b.width / 2,
            y: b.y + b.height / 2,
            w: b.width,
            h: b.height,
          });
        } catch { /* noop */ }
      });
      if (m.size > 0) setCentroids(m);
    }, 300);
    return () => clearTimeout(t);
  }, [mounted]);

  // Font size based on district area
  const labelSize = (info: { w: number; h: number }) => {
    const area = info.w * info.h;
    if (area > 50) return 1.4;
    if (area > 25) return 1.1;
    if (area > 12) return 0.95;
    if (area > 6) return 0.82;
    return 0.7;
  };

  // IntersectionObserver
  useEffect(() => {
    if (!mounted) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.15 },
    );
    if (wrapRef.current) io.observe(wrapRef.current);
    return () => io.disconnect();
  }, [mounted]);

  // Auto-cycle engine (simple setInterval, no rAF or viewBox tricks)
  const startCycle = useCallback(() => {
    if (ivRef.current) clearInterval(ivRef.current);
    if (!orderRef.current.length || idxRef.current >= orderRef.current.length) {
      orderRef.current = shuffle(ISTANBUL_MAP_DATA.map((d) => d.slug));
      idxRef.current = 0;
    }
    const tick = () => {
      if (idxRef.current >= orderRef.current.length) {
        orderRef.current = shuffle(ISTANBUL_MAP_DATA.map((d) => d.slug));
        idxRef.current = 0;
      }
      setAutoSlug(orderRef.current[idxRef.current]);
      idxRef.current++;
    };
    tick();
    ivRef.current = setInterval(tick, CYCLE_MS);
  }, []);

  const stopCycle = useCallback(() => {
    if (ivRef.current) { clearInterval(ivRef.current); ivRef.current = null; }
  }, []);

  useEffect(() => {
    if (!mounted || !inView || userActive) { stopCycle(); return; }
    startCycle();
    return stopCycle;
  }, [mounted, inView, userActive, startCycle, stopCycle]);

  useEffect(() => () => {
    stopCycle();
    if (resumeRef.current) clearTimeout(resumeRef.current);
  }, [stopCycle]);

  // User interaction
  const onMouseMove = (e: React.MouseEvent) => {
    if (!wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    setTooltipPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const onPathEnter = (slug: string) => {
    if (resumeRef.current) { clearTimeout(resumeRef.current); resumeRef.current = null; }
    setUserActive(true);
    setHoverSlug(slug);
    stopCycle();
  };

  const onPathLeave = () => {
    setHoverSlug(null);
    resumeRef.current = setTimeout(() => setUserActive(false), RESUME_MS);
  };

  return (
    <div ref={wrapRef} className="relative" onMouseMove={onMouseMove}>
      <div className="flex flex-col lg:flex-row gap-5 items-stretch">
        {/* ── MAP ── */}
        <div className="flex-1 min-w-0 relative rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
          <svg
            viewBox="73 31 74 42"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
            style={{ maxHeight: "520px" }}
          >
            <defs>
              <filter id="ds"><feDropShadow dx="0" dy="0.15" stdDeviation="0.3" floodOpacity="0.1" /></filter>
              <filter id="glow"><feDropShadow dx="0" dy="0" stdDeviation="0.6" floodColor="#D32F2F" floodOpacity="0.55" /></filter>
              <filter id="ts"><feDropShadow dx="0" dy="0.06" stdDeviation="0.12" floodColor="#000" floodOpacity="0.25" /></filter>
            </defs>

            {ISTANBUL_MAP_DATA.map((d) => {
              const active = activeSlug === d.slug;
              return (
                <Link key={d.slug} href={`/istanbul-evde-saglik/${d.slug}`}>
                  <path
                    ref={(el) => { if (el) pathMap.current.set(d.slug, el); }}
                    d={d.d}
                    onMouseEnter={() => onPathEnter(d.slug)}
                    onMouseLeave={onPathLeave}
                    className="cursor-pointer"
                    fill={active ? "#D32F2F" : "#E2E8F0"}
                    stroke={active ? "#FFF" : "#94A3B8"}
                    strokeWidth={active ? "0.3" : "0.15"}
                    filter={active ? "url(#glow)" : "url(#ds)"}
                    style={{ transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)" }}
                  />
                </Link>
              );
            })}

            {/* Pulsing dot on active district */}
            {activeCentroid && (
              <g key={`pulse-${activeSlug}`} style={{ pointerEvents: "none" }}>
                <circle cx={activeCentroid.x} cy={activeCentroid.y} r="0.8" fill="none" stroke="#D32F2F" strokeWidth="0.12" opacity="0.5">
                  <animate attributeName="r" from="0.5" to="2.8" dur="1.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="1.4s" repeatCount="indefinite" />
                </circle>
                <circle cx={activeCentroid.x} cy={activeCentroid.y} r="0.35" fill="#D32F2F" />
              </g>
            )}

            {/* District name labels - always visible */}
            {mounted && centroids.size > 0 && ISTANBUL_MAP_DATA.map((d) => {
              const c = centroids.get(d.slug);
              if (!c) return null;
              const active = activeSlug === d.slug;
              const fs = labelSize(c);
              const offset = LABEL_OFFSETS[d.slug];
              const lx = c.x + (offset?.dx ?? 0);
              const ly = c.y + (offset?.dy ?? 0);
              return (
                <g key={`lbl-${d.slug}`} style={{ pointerEvents: "none" }}>
                  {/* Leader line for offset labels */}
                  {offset && (
                    <line
                      x1={c.x} y1={c.y}
                      x2={lx} y2={ly}
                      stroke={active ? "#D32F2F" : "#94A3B8"}
                      strokeWidth="0.08"
                      strokeDasharray={active ? "none" : "0.3 0.15"}
                      opacity={active ? 0.8 : 0.5}
                    />
                  )}
                  {/* Small dot at centroid for offset labels */}
                  {offset && (
                    <circle
                      cx={c.x} cy={c.y} r="0.2"
                      fill={active ? "#D32F2F" : "#94A3B8"}
                      opacity={active ? 0.8 : 0.5}
                    />
                  )}
                  {/* Label text */}
                  <text
                    x={lx}
                    y={ly + fs * 0.35}
                    textAnchor="middle"
                    fontSize={fs}
                    fontWeight={active ? "800" : "600"}
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fill={active ? "#D32F2F" : "#1B2A4A"}
                    stroke="#FFFFFF"
                    strokeWidth="0.22"
                    paintOrder="stroke"
                    style={{ transition: "fill 0.3s" }}
                  >
                    {d.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* ── INFO CARD ── */}
        <div className="lg:w-[285px] flex-shrink-0 hidden sm:block">
          <div className="bg-white rounded-2xl shadow-lg border border-border p-5 h-full flex flex-col justify-center sticky top-24">
            {activeData ? (
              <div key={activeData.slug} className="animate-fade-in">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-secondary">{activeData.name}</h4>
                    <p className="text-xs text-muted">Evde Sağlık Hizmetleri</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {SERVICES.map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-sm">{s.icon}</span>
                      <span className="text-xs text-muted flex-1">{s.label}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/istanbul-evde-saglik/${activeData.slug}`}
                  className="block text-center bg-primary text-white py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  {activeData.name} Sayfasına Git →
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm text-muted">İlçe keşfediliyor...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile tooltip */}
      {activeData && userActive && (
        <div
          className="absolute z-50 pointer-events-none sm:hidden"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y - 10}px`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="bg-white rounded-lg shadow-xl border border-border px-3 py-2">
            <p className="text-xs font-bold text-secondary">{activeData.name}</p>
            <p className="text-[10px] text-primary">Tıklayarak sayfaya gidin →</p>
          </div>
        </div>
      )}

      {/* Mobile list */}
      <div className="mt-6 sm:hidden">
        <div className="grid grid-cols-2 gap-2">
          {ISTANBUL_MAP_DATA.map((d) => (
            <Link
              key={d.slug}
              href={`/istanbul-evde-saglik/${d.slug}`}
              className="flex items-center gap-2 px-3 py-2.5 bg-white rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all text-xs font-medium text-secondary hover:text-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {d.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
