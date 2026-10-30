// Vantern's Site
// Copyright(C) 2026 Vantern
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '~/a11y';

type NavSection = { id: string; label: string };

export function SectionNav({ label, sections, className = '' }: { label: string; sections: NavSection[]; className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    const [bar, setBar] = useState<{ left: number; width: number } | null>(null);
    const links = useRef<Record<string, HTMLAnchorElement | null>>({});
    const activeId = useRef<string | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            for (const entry of entries) {
                if (entry.isIntersecting) setActive(entry.target.id);
                else if (entry.target.id === sections[0].id && entry.boundingClientRect.top > 0) setActive(null);
            }
        }, { rootMargin: '-30% 0px -65% 0px' });
        for (const { id } of sections) {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        }
        return () => observer.disconnect();
    }, [sections]);

    const measure = () => {
        const el = activeId.current ? links.current[activeId.current] : null;
        const next = el ? { left: el.offsetLeft, width: el.offsetWidth } : null;
        setBar(prev => (prev?.left === next?.left && prev?.width === next?.width ? prev : next));
    };

    useEffect(() => {
        activeId.current = active;
        measure();
    }, [active]);

    useEffect(() => {
        let live = true;
        document.fonts?.ready.then(() => { if (live) measure(); });
        window.addEventListener('resize', measure);
        return () => {
            live = false;
            window.removeEventListener('resize', measure);
        };
    }, []);

    const jump = (e: React.MouseEvent, id: string) => {
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
        target.querySelector('h2')?.focus({ preventScroll: true });
        history.replaceState(null, '', `#${id}`);
    };

    return (
        <nav aria-label={label} className={`sticky top-0 z-30 bg-vantern-800/85 backdrop-blur-md ${className}`}>
            <div className="mx-auto max-w-4xl overflow-x-auto px-4 [scrollbar-width:none]">
                <div className="relative mx-auto w-max">
                    <ul className="flex gap-4">
                        {sections.map(({ id, label }) => (
                            <li key={id}>
                                <a
                                    ref={el => { links.current[id] = el; }}
                                    href={`#${id}`}
                                    aria-current={active === id ? 'location' : undefined}
                                    onClick={e => jump(e, id)}
                                    className={`block whitespace-nowrap rounded-md px-1 py-3 text-small transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-vantern-300 ${active === id ? 'text-white' : 'text-vantern-300'}`}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    {bar && (
                        <span aria-hidden="true" className="pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-white transition-[left,width] duration-200 motion-reduce:transition-none" style={{ left: bar.left, width: bar.width }} />
                    )}
                </div>
            </div>
        </nav>
    );
}
