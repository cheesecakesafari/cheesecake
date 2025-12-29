import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Only run the Vite SPA bootstrap in a browser environment (avoid SSR runtime errors)
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
	const root = document.getElementById("root");
	if (root) {
		createRoot(root).render(<App />);
	}
}
