// Vantern's Site
// Copyright(C) 2026 Vantern
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useNavigate } from "react-router";
const logo = '/logoBanner.svg'
import { Button } from "~/components/button/button";
import { Nav } from "~/components/nav/nav";
import { Footer } from "~/components/footer/footer";

export function Landing() {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col flex-1 overflow-hidden">
      <header className="relative z-10 flex justify-center pt-6">
        <Nav />
      </header>
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 gap-4">
        <img src={logo} alt="Logo" />
        <div className="flex flex-row gap-4">
          <Button variant="primary" onClick={() => window.open('https://vantern.statuspage.io/', '_blank')}>
            Status
          </Button>
          <Button variant="secondary" onClick={() => navigate('/discord')}>
            Join Discord
          </Button>
        </div>
      </div>
      <div className="mt-auto justify-end">
        <Footer />
      </div>
    </div>
  );
}