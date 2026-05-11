import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
    { to: '/', label: 'Home' },
    { to: '/cards', label: 'Cards' },
    { to: '/locations', label: 'Locations' },
    { to: '/progress', label: 'Progress' },
];

export default function Navbar() {
    const location = useLocation();

    return (
        <nav>
            <span>SF Tracker</span>
            <ul>
                {NAV_ITEMS.map(({ to, label }) => (
                    <li key={to}>
                        <Link
                            to={to}
                            style={{ fontWeight: location.pathname === to ? 'bold' : 'normal' }}
                        >
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}