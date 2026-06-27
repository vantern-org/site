import { Link } from 'react-router';
import './footer.css';

const links = [
    { label: 'Home', to: '/' },
    { label: 'GitHub', to: '/github' },
    { label: 'Kitzal', to: '/kitzal' },
    { label: 'Sponsors', to: '/sponsors' },
];

export function Footer() {
    return (
        <footer className="footer">
            <div className="footerLinks">
                {links.map(({ label, to }) => (
                    <Link key={to} to={to} className="footerLink">
                        {label}
                    </Link>
                ))}
            </div>
            <p className="footerCopy">© 2026 Duck Organization. All rights reserved.</p>
        </footer>
    );
}
