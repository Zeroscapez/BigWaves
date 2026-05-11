import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const GAMES = [
    { to: '/cards/sf3-black-ace', label: 'SF3 Black Ace' },
    { to: '/cards/sf3-red-joker', label: 'SF3 Red Joker' },
];

const NAV_ITEMS = [
    { to: '/', label: 'Home' },
    { to: '/cards', label: 'Cards', dropdown: GAMES },
    { to: '/locations', label: 'Locations' },
    { to: '/progress', label: 'Progress' },
];

export default function Navbar() {
    const location = useLocation();
    const [activeDropdown, setActiveDropdown] = useState(null);

    return (
        <nav>
            <span>SF Tracker</span>
            <ul style={{ display: 'flex', listStyle: 'none', gap: '16px' }}>
                {NAV_ITEMS.map(({ to, label, dropdown }) => (
                    <li
                        key={to}
                        style={{ position: 'relative' }}
                        onMouseEnter={() => dropdown && setActiveDropdown(to)}
                        onMouseLeave={() => dropdown && setActiveDropdown(null)}
                    >
                        <Link
                            to={to}
                            style={{ fontWeight: location.pathname === to ? 'bold' : 'normal' }}
                        >
                            {label}
                        </Link>
                        {dropdown && activeDropdown === to && (
                            <ul style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                background: 'white',
                                border: '1px solid gray',
                                listStyle: 'none',
                                padding: '8px 0',
                                minWidth: '160px',
                                zIndex: 100,
                            }}>
                                {dropdown.map(item => (
                                    <li key={item.to}>
                                        <Link
                                            to={item.to}
                                            style={{ display: 'block', padding: '6px 16px' }}
                                            onClick={() => setActiveDropdown(null)}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}