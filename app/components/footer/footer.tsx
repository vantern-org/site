// Vantern's Site
// Copyright(C) 2026 Vantern
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowUpIcon, ArrowUpRightIcon } from 'lucide-react';
import { focusRing, prefersReducedMotion } from '~/a11y';
import { Gradient } from './gradient';

type FooterLink = { label: string; to: string; external?: boolean };

const columns: FooterLink[][] = [
    [
        { label: 'Discord', to: '/discord' },
        { label: 'GitHub', to: '/github' },
        { label: 'Sponsor', to: '/sponsor' },
    ],
    [
        { label: 'Home', to: '/' },
        { label: 'Brand kit', to: '/brand' },
        { label: 'Status', to: 'https://status.vantern.org/', external: true },
    ],
];

const linkClass = `inline-flex cursor-pointer items-center gap-1 rounded-xs text-small text-vantern-300 transition-colors duration-150 hover:text-white motion-reduce:transition-none ${focusRing}`;

const isWebKit = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export function Footer() {
    const [webkit, setWebkit] = useState(false);

    useEffect(() => {
        setWebkit(isWebKit());
    }, []);

    const toTop = () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    };

    // footer completely breaks and lags on safari because of https://www2.webkit.org/show_bug.cgi?id=263848
    // earlier used scaleY but that also broke because of https://www2.webkit.org/show_bug.cgi?id=27684
    // never again, webkit.
    return (
        <footer className={`overflow-hidden bg-linear-to-b/srgb from-vantern-800 to-vantern-900 to-50% [--footer-gradient:40vh] [--footer-gutter:clamp(1.25rem,4vw,3rem)] ${webkit ? 'pb-[clamp(2.5rem,5vw,4rem)]' : 'pb-(--footer-gradient)'}`}>
            <div className="flex items-start justify-between gap-x-12 gap-y-10 px-(--footer-gutter) pt-[clamp(3rem,6vw,5rem)] max-[720px]:flex-col">
                <div className="flex flex-col items-start gap-4">
                    <img src="/brand-assets/vantern-wordmark-white.svg" alt="Vantern" width={157} height={24} />
                    <p className="max-w-88 text-small text-vantern-300">FOSS organization, creating open-source software for others.</p>
                </div>
                <nav className="grid grid-flow-col gap-x-[clamp(3rem,7vw,7rem)] gap-y-6 max-[720px]:w-full max-[720px]:justify-between max-[720px]:gap-x-4" aria-label="Footer">
                    {columns.map((links, i) => (
                        <ul key={i} className="flex flex-col gap-3">
                            {links.map(({ label, to, external }) => (
                                <li key={to}>
                                    {external ? (
                                        <a href={to} target="_blank" rel="noreferrer" className={linkClass}>
                                            {label}
                                            <ArrowUpRightIcon aria-hidden="true" className="size-3.5" />
                                        </a>
                                    ) : (
                                        <Link to={to} className={linkClass}>{label}</Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ))}
                </nav>
            </div>
            <div className="mx-(--footer-gutter) mt-[clamp(2.5rem,5vw,4rem)] flex items-center justify-between gap-4">
                <p className="text-caption text-vantern-400">© 2026 Vantern</p>
                <button type="button" className={linkClass} onClick={toTop}>
                    Back to top
                    <ArrowUpIcon aria-hidden="true" className="size-3.5" />
                </button>
            </div>
            {!webkit && <Gradient />}
        </footer>
    );
}
