// Vantern's Site
// Copyright(C) 2026 Vantern
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useEffect, useRef, useState, type RefObject } from "react";
import { animate, stagger } from "animejs";
import { Nav } from "~/components/nav/nav";
import { Footer } from "~/components/footer/footer";
import { focusRing, prefersReducedMotion } from "~/a11y";
import "./landing.css";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "stacked-alpha-video": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

type StorySegment = string | { text: string; href: string };

const storyText: StorySegment[][] = [
  ["Vantern is a small team of developers and a ",
  { text: "security researcher", href: "https://jvr2022.tech"},
  "."
  ],
  ["Most of what we build is open source, because software is better when anyone can read it, use it, and improve it."],
  ["We keep the team small and the work open by default, built with care and made to respect the people who use it."],
];

function StoryWords({ text, href }: { text: string; href?: string }) {
  const words = text.match(/\s*\S+\s*/g)?.map((word, i) => (
    <span key={i} className="storyWord">{word}</span>
  ));
  return href ? <a href={href} target="_blank" rel="noreferrer" className={`storyLink ${focusRing}`}>{words}</a> : words;
}

function useScrollFrame<T extends HTMLElement>(ref: RefObject<T | null>, setup: (el: T) => () => void) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const update = setup(el);
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
}

function Story() {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollFrame(sectionRef, section => {
    const words = section.querySelectorAll(".storyWord");
    section.classList.add("storyPinned");
    let lit = -1;
    return () => {
      const rect = section.getBoundingClientRect();
      const lead = window.innerHeight / 2;
      // 0 when section top hits the middle of the screen and 1 at end
      const progress = (lead - rect.top) / (rect.height - window.innerHeight + lead);
      // all words lit by 85%
      const next = Math.round(Math.min(Math.max(progress / 0.85, 0), 1) * words.length);
      if (next === lit) return;
      words.forEach((word, i) => word.classList.toggle("storyLit", i < next));
      lit = next;
    };
  });

  return (
    <section ref={sectionRef} className="story">
      <div className="storyInner">
        {storyText.map((line, i) => (
          <p key={i} className="storyLine">
            {line.map((segment, j) => (
              <StoryWords key={j} {...(typeof segment === "string" ? { text: segment } : segment)} />
            ))}
          </p>
        ))}
      </div>
    </section>
  );
}

export function Landing() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const title = titleRef.current;
    if (!title || prefersReducedMotion()) return;
    let rise: ReturnType<typeof animate> | undefined;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      rise = animate(Array.from(title.children), {
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

  useScrollFrame(heroRef, hero => () => {
    const y = Math.min(window.scrollY, window.innerHeight * 1.5);
    hero.style.setProperty("--hero-rise", `${-y * 0.35}px`);
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion()) return;
    video.muted = true;
    let frame = 0;
    const onTimeUpdate = () => {
      if (video.currentTime === 0) return;
      video.removeEventListener("timeupdate", onTimeUpdate);
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => setPlaying(true));
      });
    };
    video.addEventListener("timeupdate", onTimeUpdate);
    import("stacked-alpha-video").then(() => video.play()).catch(() => {});
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="landing relative flex flex-col flex-1 overflow-clip">
      <div ref={heroRef} className="relative flex flex-col min-h-svh">
        <div className="heroSky" aria-hidden="true" />
        <h1 ref={titleRef} className="heroTitle">
          <span className="heroLine">Software, made</span>
          <span className="heroLine">in the open</span>
        </h1>
        {/* no-js fallback for the hero title!! */}
        <noscript>
          <style>{".heroLine { opacity: 1; }"}</style>
        </noscript>
        <div className="heroMountain">
          <img
            src="/videos/hero-poster.webp"
            alt=""
            className={`absolute inset-0 w-full h-full object-cover ${playing ? "invisible" : ""}`}
          />
          <stacked-alpha-video className="absolute inset-0 w-full h-full object-cover" aria-hidden="true">
            <video ref={videoRef} className="hidden" muted loop playsInline preload="auto">
              <source src="/videos/hero-av1.mp4" type='video/mp4; codecs="av01.0.12M.08"' />
              <source src="/videos/hero-hevc.mp4" type='video/mp4; codecs="hvc1.1.6.L150.B0"' />
            </video>
          </stacked-alpha-video>
          <div className="absolute inset-0 bg-linear-to-b from-transparent from-60% via-vantern-800/50 via-80% to-vantern-800" />
        </div>
        {/* product section here after pl acq */}
        <header className="relative z-10 flex justify-center pt-6">
          <Nav />
        </header>
      </div>
      <Story />
      <div className="mt-auto justify-end">
        <Footer />
      </div>
    </div>
  );
}
