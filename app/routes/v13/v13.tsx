// Vantern's Site
// Copyright(C) 2026 Vantern
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { siGithub } from "simple-icons";
import ms from "ms";

export function meta() {
  return [
    { title: "Quest v1.3 | Vantern" },
    { property: "og:image", content: "https://vantern.org/UpdateBanner.png" },
    { property: "og:image:width", content: "1360" },
    { property: "og:image:height", content: "700" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "description", content: "Quest Bot v1.3." },
  ];
}

export default function V13() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // null until mounted
  const [countdown, setCountdown] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      // 1786356000 is the unix timestamp for 2026-08-10 at 10:00 (UTC), 12pm in NL which is when we plan to release v1.3
      const remaining = 1786356000 * 1000 - Date.now();
      setCountdown(
        remaining > 0 ? `Check back in ${ms(remaining, { long: true })}` : "Out now",
      );
    };

    tick();
    const timer = setInterval(tick, 30_000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let asciiGround: { destroy: () => void } | null = null;
    let isCancelled = false;

    // check if user prefers reduced motion but also updates on change (previously didn't so I fixed it, see below)
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onMotionChange: (() => void) | null = null;

    // import asciiground and the spiral pattern dynamically to avoid SSR issues
    void Promise.all([import("asciiground"), import("./spiralPattern")])
      .then(([{ ASCIIRenderer }, { SpiralPattern }]) => {
        if (isCancelled) return;

        const renderer = new ASCIIRenderer({
          canvas,
          pattern: new SpiralPattern(),
          options: {
            color: "#c4c4c4", // I'm aware that this is hard to see for some people but it looks good and its just the bg so idrc
            backgroundColor: "#000000",
            fontSize: 14,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          },
        });

        renderer.resize();
        
        // no animation if user prefers reduced motion :)
        // this is also where it updates on change
        onMotionChange = () => {
          if (motionQuery.matches) renderer.stopAnimation();
          else renderer.startAnimation();
        };

        onMotionChange();
        motionQuery.addEventListener("change", onMotionChange);

        asciiGround = renderer;
      })
      .catch((error: unknown) => {
        console.error("failed to start spiral, ", error);
      });

    return () => { // cleanup to prevent mem leaks
      isCancelled = true;
      if (onMotionChange) motionQuery.removeEventListener("change", onMotionChange);
      asciiGround?.destroy();
    };
  }, []);

  return (
    // Everything below also adjusts for smaller devices!! (see elements with sm and md classes)
    <main className="fixed inset-0 overflow-hidden bg-black">
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0" />

      <Link
        to="/"
        className="absolute left-6 top-6 z-10 text-sm text-neutral-400 font-mono transition-colors flex items-center gap-3 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4">
        <h1
          className="text-6xl font-mono font-bold tracking-tight text-white sm:text-8xl"
        >
          v1.3
        </h1>
        <h2
          className="text-xl font-mono tracking-tight text-neutral-100/60 sm:text-3xl">
          {countdown ?? "Check back soon"} {/* As there most likely will be a delay before I update the site */}
        </h2>
      </div>

      <Link
        to="/github/questbot"
        aria-label="Quest Bot GitHub" // announced to screen readers
        className="absolute right-6 bottom-6 z-10 text-neutral-400 transition-colors hover:text-white"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-10 w-10 md:h-14 md:w-14"
        >
          <path d={siGithub.path} />
        </svg>
      </Link>
    </main>
  );
}
