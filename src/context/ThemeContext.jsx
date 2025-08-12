import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [darkMode, setDarkMode] = useState(() => {
		// Detectar preferencia del sistema en localStorage
		if ( typeof window !== 'undefined' ) {
			return localStorage.getItem('theme') === 'dark' ||
				(!localStorage.getItem('theme') &&
				window.matchMedia('(prefers-color-scheme: dark)').matches);
		}
		return false;
	});

	useEffect(() => {
		const root = window.document.documentElement;

		if ( darkMode ) {
			root.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			root.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}, [ darkMode ]);

	return (
		<ThemeContext.Provider value={{ darkMode, setDarkMode }}>
			{children}
		</ThemeContext.Provider>
	);
};
