// Vantern's Site
// Copyright(C) 2026 Vantern
// SPDX-License-Identifier: AGPL-3.0-or-later

const logo = '/logoBanner.svg'
import { Nav } from "~/components/nav/nav";
import { Footer } from "~/components/footer/footer";

export function meta() {
  return [
    { title: "Coming Soon | Vantern" },
    { name: "description", content: "Something exciting is on the way." },
  ];
}

export default function ComingSoon() {
  return (
    <div className="relative flex flex-col flex-1 overflow-hidden">
      <header className="relative z-10 flex justify-center pt-6">
        <Nav />
      </header>
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 gap-4">
        <img src={logo} alt="Logo" />
        <h1 className="text-md text-center text-neutral-300">Coming Soon</h1>
      </div>
      <div className="mt-auto justify-end">
        <Footer />
      </div>
    </div>
    
  );
}