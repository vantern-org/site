// Vantern's Site
// Copyright(C) 2026 Vantern
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Nav } from "~/components/nav/nav";
import { Footer } from "~/components/footer/footer";

export function meta() {
  return [
    { title: "Sponsors | Vantern" },
    { name: "description", content: "The people and organizations that support Vantern." },
  ];
}

export default function Sponsors() {
  return (
    <div className="relative flex flex-col flex-1 overflow-hidden">
      <header className="relative z-10 flex flex-col items-center pt-6 gap-4">
        <Nav />
        <h1 className="text-5xl text-center text-white pt-8" style={{ fontFamily: "'Inria Serif', serif" }}>Sponsors</h1>
      </header>
      <div className="relative z-10 flex flex-col items-center justify-center pt-8 gap-4 text-xl text-neutral-300 hover:text-white" style={{ fontFamily: "'Inria Serif', serif" }}>
        <a href="https://jvr2022.tech" target="_blank">Jvr2022</a>
      </div>
      <div className="mt-auto justify-end">
        <Footer />
      </div>
    </div>
  );
}