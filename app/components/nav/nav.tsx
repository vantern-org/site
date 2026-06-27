import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import './nav.css';

const links = [
    { label: 'Home', to: '/' },
    { label: 'Sponsors', to: '/sponsors' },
    { label: 'GitHub', to: '/github' },
    { label: 'Kitzal', to: '/kitzal' },
    { label: 'Bot Invite', to: '/bot/invite' },
];

type Rect = { left: number; width: number };

function relativeRect(nav: HTMLElement, el: HTMLElement): Rect {
    const nr = nav.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    return { left: er.left - nr.left, width: er.width };
}

export function Nav() {
    const location = useLocation();
    const navRef = useRef<HTMLElement>(null);
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const [underline, setUnderline] = useState<Rect | null>(null);

    const snapToActive = () => {
        const nav = navRef.current;
        const i = links.findIndex(l => l.to === location.pathname);
        const el = linkRefs.current[i];
        setUnderline(nav && el ? relativeRect(nav, el) : null);
    };

    useEffect(snapToActive, [location.pathname]);

    return (
        <nav ref={navRef} className="nav" onMouseLeave={snapToActive}>
            {links.map(({ label, to }, i) => (
                <NavLink
                    key={to}
                    to={to}
                    ref={el => { linkRefs.current[i] = el; }}
                    className="navLink"
                    onMouseEnter={e => {
                        if (navRef.current) setUnderline(relativeRect(navRef.current, e.currentTarget));
                    }}
                >
                    {label}
                </NavLink>
            ))}
            {underline && (
                <span
                    className="navUnderline"
                    style={{ left: underline.left, width: underline.width }}
                />
            )}
        </nav>
    );
}
