import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);

export const THEMES = {
    default: {
        accent: '#00c8ff',
        accentDim: 'rgba(0, 200, 255, 0.15)',
        accentBorder: 'rgba(0, 200, 255, 0.3)',
        bg: '#020812',
        navBg: 'rgba(2, 8, 18, 0.95)',
        label: 'DEFAULT',
    },
    sf3ba: {
        accent: '#39ff14',
        accentDim: 'rgba(57, 255, 20, 0.15)',
        accentBorder: 'rgba(57, 255, 20, 0.3)',
        bg: '#080808',
        navBg: 'rgba(8, 8, 8, 0.95)',
        label: 'BLACK ACE',
    },
    sf3rj: {
        accent: '#ff1a1a',
        accentDim: 'rgba(255, 26, 26, 0.15)',
        accentBorder: 'rgba(255, 26, 26, 0.3)',
        bg: '#0f0505',
        navBg: 'rgba(15, 5, 5, 0.95)',
        label: 'RED JOKER',
    },
};

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('default');
    return (
        <ThemeContext.Provider value={{ theme: THEMES[theme], setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}