// Vantern's Site
// Copyright(C) 2026 Vantern
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useEffect, type RefObject } from "react";
import { animate, stagger } from "animejs";
import { prefersReducedMotion } from "~/a11y";

export function useRise(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let rise: ReturnType<typeof animate> | undefined;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      rise = animate(Array.from(el.children), {
        opacity: [0, 1],
        translateY: [48, 0],
        duration: 1800,
        ease: "outExpo",
        delay: stagger(140, { start: 150 }),
      });
    });
    return () => {
      cancelled = true;
      rise?.revert();
    };
  }, []);
}
