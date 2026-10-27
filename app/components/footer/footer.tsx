// Vantern's Site
// Copyright(C) 2026 Vantern
// SPDX-License-Identifier: AGPL-3.0-or-later

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

export function Footer() {
    const toTop = () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    };

    return (
        <footer className="footer">
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
            <Gradient />
        </footer>
    );
}
