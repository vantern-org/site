import { Link } from 'react-router';
import './footer.css';

const links = [
    { label: 'Home', to: '/' },
    { label: 'GitHub', to: '/github' },
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
            <p className="footerCopy">© 2026 Vantern. All rights reserved.</p>
        </footer>
    );
}
