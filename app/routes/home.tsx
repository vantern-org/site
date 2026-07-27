import type { Route } from "./+types/home";
import { Landing } from "./landing/landing";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Vantern" },
    { property: "og:image", content: "https://vantern.org/LargeVanternBanner.png" },
    { name: "description", content: "FOSS organization, creating open-source software for others." },
  ];
}

export default function Home() {
  return <Landing />;
}