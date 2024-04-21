import { useEffect, useContext} from 'react';
import {ThemeContext} from "../providers/theme-provider";
import {Moon, Sun} from "lucide-react";

export function ModeToggleButton() {

    const { darkMode, toggleDarkMode, theme } = useContext(ThemeContext);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('dark', JSON.stringify(true));
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.removeItem('dark');
        }
    }, [darkMode]);

    return (
        <button
            className={`mb-1.5 mt-1.5 w-fit ${theme.text.myHover.tertiary}`}
            onClick={() => toggleDarkMode()}>
            {
                darkMode ? <Moon size={20} /> : <Sun size={20} />
            }
        </button>
    )
}

