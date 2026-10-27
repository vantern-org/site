// Vantern's Site
// Copyright(C) 2026 Vantern
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Route } from "./+types/home";
import { Landing } from "./landing/landing";
import { ogImage } from "~/meta";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Vantern" },
    ...ogImage,
    { name: "description", content: "FOSS organization, creating open-source software for others." },
  ];
}

export default function Home() {
  return <Landing />;
}