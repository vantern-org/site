// Vantern's Site
// Copyright(C) 2026 Vantern
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useEffect } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { siGithub } from "simple-icons";
import "./v13.css";

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
  useEffect(() => {
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 5800;

    const timer = setTimeout(() => {
      window.location.href = "https://github.com/vantern-org/questbot/releases/tag/questbot-v1.3.0";
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  return (
    // Everything below also adjusts for smaller devices!! (see elements with sm and md classes)
    <main className="fixed inset-0 overflow-hidden bg-black">
      <Link
        to="/"
        className="absolute left-6 top-6 z-10 text-sm text-neutral-400 font-mono transition-colors flex items-center gap-3 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="v13Stage">
          <h1
            className="v13Title text-6xl font-mono font-bold tracking-tight text-white sm:text-8xl"
          >
            v1.3
          </h1>
        </div>
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
