// Vantern's Site
// Copyright(C) 2026 Vantern
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useRef, type MouseEvent } from "react";
import confetti from "canvas-confetti";
import { ArrowUpRightIcon, HeartIcon } from "lucide-react";
import { Nav } from "~/components/nav/nav";
import { Footer } from "~/components/footer/footer";
import "~/components/button/button.css";
import { ogImage } from "~/meta";
import { focusRing, prefersReducedMotion } from "~/a11y";

const sponsorUrl = "https://github.com/sponsors/eamonwatson";

export function meta() {
  return [
    { title: "Sponsor | Vantern" },
    { name: "description", content: "Support Vantern's work through GitHub Sponsors." },
    ...ogImage,
  ];
}

export default function Sponsor() {
  const leaving = useRef(false);

  const celebrate = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (prefersReducedMotion()) return;
    e.preventDefault();
    if (leaving.current) return;
    leaving.current = true;

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 120,
      spread: 80,
      startVelocity: 40,
      origin: { x: (left + width / 2) / window.innerWidth, y: (top + height / 2) / window.innerHeight },
      colors: ["#ffffff", "#ccdaef", "#9fb9e0", "#6e93ca", "#4d76b3"],
    });

    setTimeout(() => {
      leaving.current = false;
      const tab = window.open(sponsorUrl, "_blank");
      if (tab) tab.opener = null;
      else window.location.assign(sponsorUrl);
    }, 400);
  };

  return (
    <div className="relative flex flex-col flex-1">
      <header className="relative z-10 flex flex-col items-center pt-6 px-4">
        <Nav />
        <div className="flex flex-col items-center gap-4 pt-20 pb-24 max-w-xl text-center">
          <h1 className="text-h1 text-white">Sponsor</h1>
          <p className="text-body-lg sm:text-lead text-vantern-300">
            Vantern is owned and maintained by{" "}
            <a
              href="https://eamonw.dev/"
              target="_blank"
              rel="noreferrer"
              className={`rounded-sm text-white underline decoration-vantern-400 underline-offset-4 transition-colors hover:decoration-white ${focusRing}`}
            >
              Eamon Watson
            </a>
            . Sponsorships go directly to him and support the work he does for Vantern.
          </p>
          <a href={sponsorUrl} target="_blank" rel="noreferrer" onClick={celebrate} className="buttonPrimary mt-2 flex items-center gap-2">
            <HeartIcon aria-hidden="true" className="size-4" />
            Sponsor
            <ArrowUpRightIcon aria-hidden="true" className="size-4" />
          </a>
        </div>
      </header>
      <div className="mt-auto justify-end">
        <Footer />
      </div>
    </div>
  );
}
