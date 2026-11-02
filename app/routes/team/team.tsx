// Vantern's Site
// Copyright(C) 2026 Vantern
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useRef } from "react";
import { Nav } from "~/components/nav/nav";
import { Footer } from "~/components/footer/footer";
import { ogImage } from "~/meta";
import { focusRing } from "~/a11y";
import { useRise } from "~/rise";

type Member = { name: string; role: string; github: string; href: string; photo?: string };

const members: Member[] = [
  { name: "Eamon", role: "Developer & Maintainer", github: "eamonwatson", href: "https://eamonw.dev/" },
  { name: "Andrei", role: "Developer", github: "andr3i1010", href: "https://github.com/andr3i1010", photo: "/avatars/andrei.jpg" },
  { name: "Joshua", role: "Security researcher", github: "Jvr2022", href: "https://jvr2022.tech/" },
];

export function meta() {
  return [
    { title: "Team | Vantern" },
    { name: "description", content: "The people behind Vantern." },
    ...ogImage,
  ];
}

export default function Team() {
  const listRef = useRef<HTMLUListElement>(null);

  useRise(listRef);

  return (
    <div className="relative flex flex-col flex-1">
      <header className="relative z-10 flex flex-col items-center pt-6">
        <Nav />
        <div className="flex flex-col items-center gap-4 px-4 pt-20 pb-16 max-w-xl text-center">
          <h1 className="text-h1 text-white">Team</h1>
          <p className="text-body-lg sm:text-lead text-vantern-300">The people behind Vantern.</p>
        </div>
      </header>
      <main className="mx-auto w-full max-w-4xl px-4 pb-24">
        {/* no-js fallback */}
        <noscript>
          <style>{".teamMember { opacity: 1; }"}</style>
        </noscript>
        <ul ref={listRef} className="grid grid-cols-3 gap-4 sm:gap-8">
          {members.map(({ name, role, github, href, photo }) => (
            <li key={github} className="teamMember opacity-0 motion-reduce:opacity-100">
              <a href={href} target="_blank" rel="noreferrer" className={`group flex flex-col gap-4 rounded-sm ${focusRing}`}>
                <span className="isolate block overflow-hidden rounded-lg bg-vantern-700">
                  <img
                    src={photo ?? `https://github.com/${github}.png?size=460`}
                    alt=""
                    width={460}
                    height={460}
                    className="aspect-square w-full object-cover grayscale mix-blend-luminosity"
                  />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-body-lg sm:text-h3 text-white transition-colors duration-200 group-hover:text-vantern-200 motion-reduce:transition-none">
                    {name}
                  </span>{" "}
                  <span className="text-small sm:text-body text-vantern-300">{role}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </main>
      <div className="mt-auto justify-end">
        <Footer />
      </div>
    </div>
  );
}
