// Vantern's Site
// Copyright(C) 2026 Vantern
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useEffect, useId, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { ChevronDownIcon } from 'lucide-react';
import { focusRing, prefersReducedMotion } from '~/a11y';

export type DownloadOption = { format: string; detail: string; href: string };

export function DownloadMenu({ name, options }: { name: string; options: DownloadOption[] }) {
    const [open, setOpen] = useState(false);
    const root = useRef<HTMLDivElement>(null);
    const button = useRef<HTMLButtonElement>(null);
    const panel = useRef<HTMLDivElement>(null);
    const id = useId();

    useEffect(() => {
        if (!open || !panel.current) return;
        if (prefersReducedMotion()) return;
        const rows = animate(Array.from(panel.current.children), {
            opacity: [0, 1],
            translateX: [-20, 0],
            duration: 200,
            ease: 'outQuad',
            delay: stagger(30),
        });
        return () => { rows.revert(); };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onPointerDown = (e: PointerEvent) => {
            if (!root.current?.contains(e.target as Node)) setOpen(false);
        };
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') return;
            setOpen(false);
            button.current?.focus();
        };
        document.addEventListener('pointerdown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [open]);

    return (
        <div
            ref={root}
            className="relative"
            onBlur={e => {
                if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) setOpen(false);
            }}
        >
            <button
                ref={button}
                type="button"
                aria-label={`Download ${name}`}
                aria-expanded={open}
                aria-controls={id}
                onClick={() => setOpen(o => !o)}
                className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 ring-1 ring-vantern-700 transition-colors hover:bg-vantern-800 hover:text-white ${focusRing} ${open ? 'bg-vantern-800 text-white' : 'text-vantern-200'}`}
            >
                Download
                <ChevronDownIcon className={`size-4 transition-transform duration-200 ease-in-out motion-reduce:transition-none ${open ? 'rotate-180' : ''}`} />
            </button>
            <div
                ref={panel}
                id={id}
                className={`absolute right-0 top-[calc(100%+0.5rem)] z-20 w-40 origin-top-right overflow-hidden rounded-lg bg-vantern-900/55 shadow-lg shadow-black/30 ring-1 ring-white/10 backdrop-blur-xl backdrop-saturate-150 transition-[opacity,scale,translate,visibility] duration-200 ease-out motion-reduce:transition-none ${open ? 'visible translate-y-0 scale-100 opacity-100' : 'invisible -translate-y-2.5 scale-95 opacity-0'}`}
            >
                {options.map(({ format, detail, href }) => (
                    <a
                        key={href}
                        href={href}
                        download
                        aria-label={`Download ${name}, ${format} ${detail}`}
                        onClick={() => {
                            setOpen(false);
                            button.current?.focus();
                        }}
                        className="flex items-center border-b border-white/10 px-3 py-2 tabular-nums text-white transition-colors duration-150 last:border-b-0 hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none"
                    >
                        {detail}
                    </a>
                ))}
            </div>
        </div>
    );
}
