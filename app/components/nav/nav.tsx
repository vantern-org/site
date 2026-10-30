// Vantern's Site
// Copyright(C) 2026 Vantern
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { EqualIcon } from 'lucide-react';
import './nav.css';

const links = [
    { label: 'Home', to: '/' },
    { label: 'GitHub', to: '/github' },
    { label: 'Quest', to: '/bot/invite' },
];

const navFocus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-300';
type Rect = { left: number; width: number };

function relativeRect(nav: HTMLElement, el: HTMLElement): Rect {
    const nr = nav.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    return { left: er.left - nr.left, width: er.width };
}

export function Nav() {
    const location = useLocation();
    const barRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const [underline, setUnderline] = useState<Rect | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const snapToActive = () => {
        const nav = navRef.current;
        const i = links.findIndex(l => l.to === location.pathname);
        const el = linkRefs.current[i];
        setUnderline(nav && el ? relativeRect(nav, el) : null);
    };

    useEffect(snapToActive, [location.pathname]);
    useEffect(() => setMenuOpen(false), [location.pathname]);

    useEffect(() => {
        if (!menuOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMenuOpen(false);
            if (e.key !== 'Tab') return;

            // first and last item
            const first = barRef.current?.querySelector<HTMLElement>('a');
            const last = barRef.current?.querySelector<HTMLElement>('#navMenu a:last-child');

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last?.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first?.focus();
            }
        };
        const mobile = window.matchMedia('(width < 48rem)');
        const listeners = new AbortController();
        window.addEventListener('keydown', onKey, { signal: listeners.signal });
        mobile.addEventListener('change', () => {
            if (!mobile.matches) setMenuOpen(false);
        }, { signal: listeners.signal });
        return () => listeners.abort();
    }, [menuOpen]);

    return (
        <div ref={barRef} className="navBar grid w-full grid-cols-[1fr_auto_1fr] items-center px-[clamp(1.25rem,4vw,3rem)]" data-open={menuOpen}>
            <Link to="/" className={`relative z-1 mb-2 flex justify-self-start rounded-sm text-white ${navFocus}`}>
                <svg aria-hidden="true" className="h-6.5 w-auto" viewBox="74 65 109 126" fill="none" stroke="currentColor" strokeWidth="9.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M134.833 178.604L174.375 139.063C176.375 137.063 177.499 134.35 177.5 131.521V100.817C177.495 99.7649 177.179 98.7374 176.592 97.8639C176.005 96.9903 175.173 96.3094 174.201 95.9067C173.229 95.504 172.159 95.3974 171.126 95.6001C170.094 95.8029 169.144 96.3061 168.396 97.0466L128.289 137.154M128.289 137.154L88.104 96.9428C87.3562 96.2023 86.4063 95.6991 85.3736 95.4963C84.3409 95.2935 83.2713 95.4002 82.299 95.8029C81.3267 96.2056 80.4949 96.8864 79.908 97.76C79.3212 98.6336 79.0053 99.661 79 100.713V131.417C79.0006 134.246 80.1248 136.959 82.1253 138.959L127.667 185.75L152.278 161.159L128.289 137.154Z" />
                    <path d="M111.167 119.75V75.3333C111.167 73.9188 111.729 72.5623 112.729 71.5621C113.729 70.5619 115.085 70 116.5 70H150.084C151.173 70.0001 152.237 70.3339 153.131 70.9564C154.025 71.579 154.707 72.4604 155.085 73.4822C155.463 74.504 155.52 75.6171 155.246 76.6717C154.973 77.7263 154.383 78.672 153.556 79.3813L130.096 102.841M112.308 72.0319L141.667 122.883" />
                </svg>
            </Link>
            <nav ref={navRef} className="relative inline-flex gap-6 pb-2 max-md:hidden" onMouseLeave={snapToActive}>
                {links.map(({ label, to }, i) => (
                    <NavLink
                        key={to}
                        to={to}
                        ref={el => { linkRefs.current[i] = el; }}
                        className={({ isActive }) => `text-small transition-colors duration-150 hover:text-white motion-reduce:transition-none ${isActive ? 'text-white' : 'text-neutral-400'}`}
                        onMouseEnter={e => {
                            if (navRef.current) setUnderline(relativeRect(navRef.current, e.currentTarget));
                        }}
                    >
                        {label}
                    </NavLink>
                ))}
                {underline && (
                    <span
                        className="pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-white transition-[left,width] duration-200 motion-reduce:transition-none"
                        style={{ left: underline.left, width: underline.width }}
                    />
                )}
            </nav>
            <button
                type="button"
                className={`relative z-1 col-start-3 mb-2 hidden h-8 touch-manipulation items-center gap-2.5 justify-self-end rounded-sm text-base font-medium text-white max-md:flex ${navFocus}`}
                aria-expanded={menuOpen}
                aria-controls="navMenu"
                onClick={() => setMenuOpen(o => !o)}
            >
                <EqualIcon aria-hidden="true" className="navButtonIcon size-5" />
                Menu
            </button>
            <nav
                id="navMenu"
                aria-label="Menu"
                onClick={() => setMenuOpen(false)}
                className={`fixed inset-0 hidden flex-col gap-3 overflow-y-auto px-[clamp(1.25rem,4vw,3rem)] pt-24 pb-6 transition-[background-color,-webkit-backdrop-filter,backdrop-filter,visibility] duration-200 motion-reduce:transition-none max-md:flex ${menuOpen ? 'visible bg-vantern-800/90 backdrop-blur-sm' : 'invisible bg-transparent'}`}
            >
                {links.map(({ label, to }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) => `text-[1.5rem] font-medium transition-opacity duration-200 motion-reduce:transition-none ${menuOpen ? 'opacity-100' : 'opacity-0'} ${isActive ? 'text-white' : 'text-neutral-400'}`}
                    >
                        {label}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}
