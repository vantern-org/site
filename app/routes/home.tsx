import type { Route } from "./+types/home";
import { Landing } from "./landing/landing";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Vantern" },
    { property: "og:image", content: "https://vantern.org/LargeVanternBanner.png" },
    { property: "og:image:width", content: "1360" },
    { property: "og:image:height", content: "660" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "description", content: "FOSS organization, creating open-source software for others." },
  ];
}

export default function Home() {
  return <Landing />;
}