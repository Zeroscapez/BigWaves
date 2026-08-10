import { createContext, useContext, useState } from 'react';
import { THEMES } from './themes';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('default');
    return (
        <ThemeContext.Provider value={{ theme: THEMES[theme], setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components -- hook must live alongside its context/provider
export function useTheme() {
    return useContext(ThemeContext);
}