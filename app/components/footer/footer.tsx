// Vantern's Site
// Copyright(C) 2026 Vantern
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowUpIcon, ArrowUpRightIcon } from 'lucide-react';
import { prefersReducedMotion } from '~/a11y';
import { Gradient } from './gradient';
import './footer.css';

type FooterLink = { label: string; to: string; external?: boolean };

const columns: FooterLink[][] = [
    [
        { label: 'Discord', to: '/discord' },
        { label: 'GitHub', to: '/github' },
        { label: 'Sponsors', to: '/sponsors' },
    ],
    [
        { label: 'Home', to: '/' },
        { label: 'Brand kit', to: '/brand' },
        { label: 'Status', to: 'https://vantern.statuspage.io/', external: true },
    ],
];

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
        <footer className={webkit ? 'footer footerPlain' : 'footer'}>
            <div className="footerTop">
                <div className="footerBrand">
                    <img src="/brand-assets/vantern-wordmark-white.svg" alt="Vantern" width={157} height={24} />
                    <p className="footerTagline">FOSS organization, creating open-source software for others.</p>
                </div>
                <nav className="footerNav" aria-label="Footer">
                    {columns.map((links, i) => (
                        <ul key={i}>
                            {links.map(({ label, to, external }) => (
                                <li key={to}>
                                    {external ? (
                                        <a href={to} target="_blank" rel="noreferrer" className="footerLink">
                                            {label}
                                            <ArrowUpRightIcon aria-hidden="true" className="footerIcon" />
                                        </a>
                                    ) : (
                                        <Link to={to} className="footerLink">{label}</Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ))}
                </nav>
            </div>
            <div className="footerBar">
                <p className="footerCopy">© 2026 Vantern</p>
                <button type="button" className="footerLink" onClick={toTop}>
                    Back to top
                    <ArrowUpIcon aria-hidden="true" className="footerIcon" />
                </button>
            </div>
            {!webkit && <Gradient />}
        </footer>
    );
}
