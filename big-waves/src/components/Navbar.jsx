import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';
import styles from './css/Navbar.module.css';

const NAV_ITEMS = [
    { to: '/', label: 'Home' },
    {
        to: '/cards',
        label: 'Cards',
        dropdown: [
            { to: '/cards/sf3-black-ace', label: 'SF3 Black Ace' },
            { to: '/cards/sf3-red-joker', label: 'SF3 Red Joker' },
        ],
    },
    { to: '/locations', label: 'Locations' },
    { to: '/progress', label: 'Progress' },
];

export default function Navbar() {
    const location = useLocation();
    const { theme } = useTheme();
    const [activeDropdown, setActiveDropdown] = useState(null);

    return (
        <header
            className={styles.header}
            style={{
                '--accent': theme.accent,
                '--accent-dim': theme.accentDim,
                '--accent-border': theme.accentBorder,
                '--nav-bg': theme.navBg,
            }}
        >
            <nav className={styles.nav}>

                {/* Logo */}
                <Link to="/" className={styles.logo}>
                    <span className={styles.logoText}>SF</span>
                    <span className={styles.logoSeparator}>|</span>
                    <span className={styles.logoSub}>TRACKER</span>
                </Link>

                {/* Theme label */}
                <span className={styles.themeLabel}>{theme.label}</span>

                {/* Nav links */}
                <ul className={styles.navList}>
                    {NAV_ITEMS.map(({ to, label, dropdown }) => {
                        const isActive = location.pathname === to ||
                            (dropdown && dropdown.some(d => d.to === location.pathname));

                        return (
                            <li
                                key={to}
                                className={styles.navItem}
                                onMouseEnter={() => dropdown && setActiveDropdown(to)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    to={to}
                                    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                                >
                                    {label}
                                    {dropdown && <span className={styles.dropdownArrow}>▾</span>}
                                </Link>

                                {dropdown && activeDropdown === to && (
                                    <div className={styles.dropdown}>
                                        <div className={styles.dropdownInner}>
                                            {dropdown.map(item => (
                                                <Link
                                                    key={item.to}
                                                    to={item.to}
                                                    className={`${styles.dropdownLink} ${location.pathname === item.to ? styles.dropdownActive : ''}`}
                                                    onClick={() => setActiveDropdown(null)}
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
}