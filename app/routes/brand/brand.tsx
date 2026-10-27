// Vantern's Site
// Copyright(C) 2026 Vantern
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useEffect, useRef, useState } from "react";
import { createScope, createTimeline, onScroll, stagger, utils } from "animejs";
import { CheckIcon, DownloadIcon, XIcon } from "lucide-react";
import { Nav } from "~/components/nav/nav";
import { Footer } from "~/components/footer/footer";
import { CodeBlock } from "~/components/codeBlock/codeBlock";
import { DownloadMenu } from "~/components/downloadMenu/downloadMenu";
import { SectionNav } from "~/components/sectionNav/sectionNav";
import "~/components/button/button.css";
import brandCss from "~/brand.css?raw";
import { ogImage } from "~/meta";
import { focusRing, prefersReducedMotion } from "~/a11y";

const sections = [
  { id: "usage", label: "Usage" },
  { id: "logo", label: "Logo" },
  { id: "colors", label: "Colors" },
  { id: "type", label: "Type" },
  { id: "applications", label: "Applications" },
];

type Surface = "dark" | "light" | "navy" | "black";

const surfaces: Record<Surface, string> = {
  dark: "bg-vantern-900 p-8",
  light: "bg-vantern-50 p-8",
  navy: "bg-vantern-800 ring-1 ring-vantern-700",
  black: "bg-black",
};

type Logo = { name: string; file: string; width: number; surface: Surface };

const marks: Logo[] = [
  { name: "White on navy", file: "vantern-mark-white-on-navy", width: 512, surface: "navy" },
  { name: "White on black", file: "vantern-mark-white-on-black", width: 512, surface: "black" },
  { name: "White", file: "vantern-mark-white", width: 512, surface: "dark" },
  { name: "Black", file: "vantern-mark-black", width: 512, surface: "light" },
];

const wordmarks: Logo[] = [
  { name: "White on navy", file: "vantern-wordmark-white-on-navy", width: 906, surface: "navy" },
  { name: "White", file: "vantern-wordmark-white", width: 786, surface: "dark" },
  { name: "Black", file: "vantern-wordmark-black", width: 786, surface: "light" },
  { name: "Navy", file: "vantern-wordmark-navy", width: 786, surface: "light" },
];

const colors = Array.from(brandCss.matchAll(/--color-vantern-(\d+):\s*(#[0-9a-f]{6})/gi), ([, step, hex]) => [step, hex]);

const pangram = "Sphinx of black quartz, judge my vow.";
const paragraph = `${pangram} The five boxing wizards jump quickly, and a quick brown fox jumps over the lazy dog.`;

const typeScale = [
  { name: "Display", className: "text-display", size: "72 / 79px", weight: "600", tracking: "-2%", sample: pangram },
  { name: "Heading 1", className: "text-h1", size: "48 / 55px", weight: "600", tracking: "-1.5%", sample: pangram },
  { name: "Heading 2", className: "text-h2", size: "36 / 43px", weight: "600", tracking: "-1%", sample: pangram },
  { name: "Heading 3", className: "text-h3", size: "24 / 31px", weight: "600", tracking: "-0.5%", sample: pangram },
  { name: "Lead", className: "text-lead", size: "22 / 32px", weight: "400", tracking: "0%", sample: paragraph },
  { name: "Body Large", className: "text-body-lg", size: "18 / 29px", weight: "400", tracking: "0%", sample: paragraph },
  { name: "Body", className: "text-body", size: "16 / 26px", weight: "400", tracking: "0%", sample: paragraph },
  { name: "Small", className: "text-small", size: "14 / 21px", weight: "500", tracking: "0%", sample: paragraph },
  { name: "Caption", className: "text-caption", size: "12 / 17px", weight: "500", tracking: "1%", sample: paragraph },
];

const codeSample = "git clone https://github.com/vantern-org/questbot\ncd questbot && pnpm install";
const codeSpec = { name: "Code", size: "14 / 22px", weight: "400", tracking: "0%" };

const weights = [
  { name: "Bold", weight: 700, className: "font-bold" },
  { name: "SemiBold", weight: 600, className: "font-semibold" },
  { name: "Medium", weight: 500, className: "font-medium" },
  { name: "Regular", weight: 400, className: "font-normal" },
];

const chars = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz", "0123456789", "!@#$%^&*()?/.,:;"];

const applications = [
  { name: "GitHub org avatar", detail: "500 x 500 PNG", src: "/brand-assets/github-org-avatar.png" },
  { name: "GitHub social preview", detail: "1280 x 640 PNG", src: "/github-social-preview.png" },
  { name: "Link preview image", detail: "1200 x 630 PNG", src: "/og-image.png" },
  { name: "Apple touch icon", detail: "180 x 180 PNG", src: "/apple-touch-icon.png" },
  { name: "Favicon", detail: "SVG", src: "/favicon.svg" },
  { name: "Favicon", detail: "16 and 32px ICO", src: "/favicon.ico" },
];

const subHeading = "text-body font-medium text-vantern-100";

const textLink = `rounded-sm text-white underline decoration-vantern-400 underline-offset-4 transition-colors hover:decoration-white ${focusRing}`;

const allowedUses = [
  "Press and news coverage",
  "Community projects that work with Vantern's projects, as long as they're clearly unofficial",
  "Buttons and badges that link to Vantern's site, GitHub or Discord",
];

const forbiddenUses = [
  "Suggest that Vantern sponsors, endorses or partners with you or others when it doesn't",
  "Use the Vantern name or logo in the name or domain of your own product, project or company",
  <>
    Put the logo on merchandise or anything else you sell, like shirts or stickers. Official merch is on{" "}
    <a href="https://www.stickermule.com/vantern" target="_blank" rel="noreferrer" className={textLink}>Sticker Mule</a>.
  </>,
  "Stretch, squash, recolor or crop the logo",
  "Combine the logo with other marks, or design your own logo to look like it",
  "Show the mark narrower than 16px (not counting the empty space in the file), or the wordmark narrower than 100px",
  "Put text or graphics closer to the logo than half its height",
];

export function meta() {
  return [
    { title: "Brand Kit | Vantern" },
    { name: "description", content: "Official Vantern logos, colors, typography and brand assets." },
    ...ogImage,
  ];
}

function Section({ id, title, note, children }: { id: string; title: string; note?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="flex scroll-mt-20 flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h2 tabIndex={-1} className="text-h2 text-white focus:outline-none">{title}</h2>
        {note && <p className="text-body-lg sm:text-lead text-vantern-300 max-w-prose">{note}</p>}
      </div>
      <div className="flex flex-col gap-10 min-w-0">{children}</div>
    </section>
  );
}

const formats = (file: string, width: number) => [
  { format: "SVG", detail: "Vector", href: `/brand-assets/${file}.svg` },
  ...[1, 2, 4].map(scale => ({
    format: "PNG",
    detail: `${width * scale} px`,
    href: `/brand-assets/${file}${scale === 1 ? "" : `@${scale}x`}.png`,
  })),
];

function Tile({ src, alt, surface, aspect }: { src: string; alt: string; surface: Surface; aspect: string }) {
  const type = src.split(".").pop()!.toUpperCase();
  return (
    <a
      href={src}
      download
      aria-label={`Download ${alt}, ${type}`}
      className={`group relative flex items-center justify-center overflow-hidden rounded-2xl ${focusRing} ${aspect} ${surfaces[surface]}`}
    >
      <img src={src} alt="" loading="lazy" decoding="async" className="max-h-full max-w-full transition-[filter] duration-300 ease-out group-hover:blur-sm group-focus-visible:blur-sm motion-reduce:transition-none" />
      <span aria-hidden="true" className={`absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none ${surface === "light" ? "text-vantern-950" : "text-white"}`}>
        <DownloadIcon className="size-7" />
      </span>
    </a>
  );
}

function LogoRow({ title, logos, columns, aspect }: { title: string; logos: Logo[]; columns: string; aspect: string }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className={subHeading}>{title}</h3>
      <div className={`grid gap-x-4 gap-y-6 ${columns}`}>
        {logos.map(({ name, file, width, surface }) => {
          const alt = `${title}, ${name.toLowerCase()}`;
          return (
            <figure key={file} className="flex flex-col gap-3">
              <Tile src={`/brand-assets/${file}.svg`} alt={alt} surface={surface} aspect={aspect} />
              <figcaption className="flex items-center justify-between gap-3 text-small">
                <span className="text-vantern-100">{name}</span>
                <DownloadMenu name={alt} options={formats(file, width)} />
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}

function Typeface() {
  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <div className="flex flex-col gap-6 border-t border-vantern-700 pt-6">
        <div className="flex flex-col gap-1 text-h3 text-white">
          {weights.map(({ name, className }) => (
            <p key={name} className={className}>Plus Jakarta Sans {name}</p>
          ))}
        </div>
        <p aria-hidden="true" className="text-[10rem] leading-none tracking-[-0.03em] text-white lg:text-[16rem]">Ag</p>
      </div>
      <div className="flex flex-col gap-10">
        {weights.map(({ name, weight, className }) => (
          <div key={name} className="grid grid-cols-[6rem_1fr] gap-4 border-t border-vantern-700 pt-4">
            <span className="text-caption text-vantern-300">Weight {weight}</span>
            <div className="flex flex-col gap-3 text-white">
              <p className={`text-body ${className}`}>Plus Jakarta Sans {name}</p>
              <p className={`text-small leading-[1.4] ${className}`}>
                {chars.map(line => <span key={line} className="block">{line}</span>)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpecHeader({ name, size, weight, tracking }: { name: string; size: string; weight: string; tracking: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-small">
      <span className="font-medium text-vantern-100">{name}</span>
      <span className="flex gap-5 tabular-nums text-vantern-300">
        <span>{size}</span>
        <span>{weight}</span>
        <span>{tracking}</span>
      </span>
    </div>
  );
}

function Verdict({ ok, className }: { ok: boolean; className: string }) {
  const Icon = ok ? CheckIcon : XIcon;
  return <Icon aria-hidden="true" strokeWidth={3} className={`size-5 ${ok ? "text-emerald-300" : "text-rose-300"} ${className}`} />;
}

function UsageTerms({ ok, title, items }: { ok: boolean; title: string; items: React.ReactNode[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className={subHeading}>{title}</h3>
      <ul className="flex flex-col gap-3">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-body-lg text-vantern-100">
            <Verdict ok={ok} className="mt-1 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const hidden = { opacity: 0, translateY: "-0.6em", filter: "blur(4px)" };
const shown = { opacity: 1, translateY: ["0.6em", "0em"], filter: "blur(0px)" };

function ColorRamp() {
  const hexRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const copiedRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const morphs = useRef<(ReturnType<typeof createTimeline> | undefined)[]>([]);
  const [announcement, setAnnouncement] = useState("");

  const copy = async (i: number, step: string, hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
    } catch {
      return;
    }
    setAnnouncement(`Copied vantern-${step}, ${hex}`);
    const hexEl = hexRefs.current[i];
    const copiedEl = copiedRefs.current[i];
    if (!hexEl || !copiedEl) return;

    const running = morphs.current[i];
    if (running && !running.completed) return;

    const reduce = prefersReducedMotion();
    morphs.current[i] = createTimeline({ defaults: { duration: reduce ? 0 : 380, ease: "outQuart" } })
      .add(hexEl, hidden, 0)
      .add(copiedEl, shown, reduce ? 0 : 70)
      .add(copiedEl, hidden, 1300)
      .add(hexEl, shown, reduce ? 1300 : 1370);
  };

  return (
    <>
      <div className="ramp group/ramp flex flex-col overflow-hidden rounded-2xl ring-1 ring-white/10 [--seam:0_1px_0_0] [--layer:0_-6px_14px_-6px_rgb(4_8_22/0.45)] lg:flex-row lg:[--seam:1px_0_0_0] lg:[--layer:-6px_0_14px_-6px_rgb(4_8_22/0.45)]">
        {colors.map(([step, hex], i) => (
          <button
            key={step}
            type="button"
            onClick={() => copy(i, step, hex)}
            aria-label={`Copy vantern-${step}, ${hex}`}
            className={`rampBand transition-[filter] duration-300 ease-out motion-reduce:transition-none group-hover/ramp:not-[&:hover]:blur-sm group-has-focus-visible/ramp:not-focus-visible:blur-sm relative flex flex-1 cursor-pointer items-center justify-between px-4 py-3.5 text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] lg:h-72 lg:flex-col lg:items-start lg:justify-end lg:gap-1 lg:px-3 lg:py-4 ${Number(step) < 500 ? "text-vantern-950 focus-visible:outline-vantern-950" : "text-white focus-visible:outline-white"}`}
            style={{ backgroundColor: hex, boxShadow: `var(--seam) ${hex}, var(--layer)`, zIndex: i + 1 }}
          >
            <span className="rampStep flex items-baseline gap-2 lg:flex-col lg:gap-0.5">
              <span className="text-body font-semibold">{step}</span>
              {step === "800" && <span className="text-caption opacity-80 lg:order-first">Primary</span>}
            </span>
            <span className="rampHex grid justify-items-end text-caption tabular-nums opacity-80 lg:justify-items-start">
              <span ref={el => { hexRefs.current[i] = el; }} className="col-start-1 row-start-1">{hex}</span>
              <span ref={el => { copiedRefs.current[i] = el; }} className="col-start-1 row-start-1 opacity-0" aria-hidden="true">Copied</span>
            </span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{announcement}</p>
    </>
  );
}

export default function Brand() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = createScope({
      root,
      mediaQueries: { reduce: "(prefers-reduced-motion: reduce)", wide: "(min-width: 1024px)" },
    }).add(self => {
      if (!self || self.matches.reduce) return;

      const axis = self.matches.wide ? "scaleY" : "scaleX";
      utils.set(".rampBand", { [axis]: 0, transformOrigin: self.matches.wide ? "50% 100%" : "0% 50%" });
      utils.set(".rampStep, .rampHex", { opacity: 0 });
      createTimeline({
        autoplay: onScroll({ target: ".ramp", repeat: false }),
        onComplete: () => {
          root.current?.querySelectorAll<HTMLElement>(".rampBand").forEach(el => {
            el.style.removeProperty("transform");
            el.style.removeProperty("transform-origin");
          });
        },
      })
        .add(".rampBand", { [axis]: [0, 1], duration: 1100, ease: "outExpo", delay: stagger(55) }, 0)
        .add(".rampStep", { opacity: [0, 1], duration: 400, delay: stagger(55) }, 300)
        .add(".rampHex", { opacity: [0, 0.8], duration: 400, delay: stagger(55) }, 380);
    });
    return () => scope.revert();
  }, []);

  return (
    <div ref={root} className="relative flex flex-col flex-1">
      <header className="relative z-10 flex flex-col items-center pt-6 gap-4 px-4">
        <Nav />
        <div className="pt-12">
          <img src="/logo.svg" alt="" className="h-20 w-auto" />
        </div>
        <h1 className="text-h1 text-center text-white">Brand Kit</h1>
        <a href="/brand-assets/vantern-brand-kit.zip" download className="buttonPrimary mt-2 flex items-center gap-2">
          <DownloadIcon className="size-4" />
          Download all
        </a>
      </header>
      <SectionNav label="Brand kit sections" sections={sections} className="mt-12" />
      <main className="relative z-10 flex flex-col gap-20 w-full max-w-4xl mx-auto px-4 pt-12 pb-20">
        <Section id="usage" title="Usage">
          <div className="grid gap-10 md:grid-cols-2">
            <UsageTerms ok title="Without asking, you can use the name and logos for" items={allowedUses} />
            <UsageTerms ok={false} title="You can't" items={forbiddenUses} />
          </div>
          <p className="text-body-lg text-vantern-100 max-w-[68ch]">
            Any other commercial use needs written permission first. Email{" "}
            <a href="mailto:contact@vantern.org" className={textLink}>contact@vantern.org</a>
            {" "}to ask, or with any question this page doesn't answer.
          </p>
        </Section>

        <Section id="logo" title="Logo" note="Use the mark where space is tight and the wordmark where the name needs to be read. Pick the version that contrasts with its background.">
          <LogoRow title="Mark" logos={marks} columns="grid-cols-2 md:grid-cols-4" aspect="aspect-square" />
          <LogoRow title="Wordmark" logos={wordmarks} columns="grid-cols-1 sm:grid-cols-2" aspect="aspect-[3/1]" />
        </Section>

        <Section id="colors" title="Colors" note="An 11-step navy scale, with 800 as the primary background. Click a color to copy its hex code.">
          <ColorRamp />
        </Section>

        <Section
          id="type"
          title="Typography"
          note={
            <>
              <a href="https://fonts.google.com/specimen/Plus+Jakarta+Sans" target="_blank" rel="noreferrer" className={textLink}>Plus Jakarta Sans</a>
              {" "}for everything,{" "}
              <a href="https://fonts.google.com/specimen/JetBrains+Mono" target="_blank" rel="noreferrer" className={textLink}>JetBrains Mono</a>
              {" "}for code. Both are free on Google Fonts.
            </>
          }
        >
          <Typeface />
          <div>
            {typeScale.map(({ className, sample, ...spec }) => (
              <div key={spec.name} className="flex flex-col gap-3 border-b border-vantern-700 py-6 first:pt-0">
                <SpecHeader {...spec} />
                <p className={`${className} text-white wrap-break-word max-w-[68ch]`}>{sample}</p>
              </div>
            ))}
            <div className="flex flex-col gap-3 pt-6">
              <SpecHeader {...codeSpec} />
              <CodeBlock code={codeSample} />
            </div>
          </div>
        </Section>

        <Section id="applications" title="Applications" note="Images for profile pictures, link previews and browser tabs.">
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            {applications.map(({ name, detail, src }) => (
              <figure key={src} className="flex flex-col gap-3">
                <Tile src={src} alt={name} surface="navy" aspect="aspect-[16/9]" />
                <figcaption className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-small">
                  <span className="text-vantern-100">{name}</span>
                  <span className="tabular-nums text-vantern-400">{detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      </main>
      <div className="mt-auto justify-end">
        <Footer />
      </div>
    </div>
  );
}
