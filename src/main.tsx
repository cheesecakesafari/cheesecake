import { createRoot } from 'react-dom/client'
import './index.css'

// Dynamically import the app only in the browser to avoid evaluating modules
// that assume a browser environment at module scope.
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
	const root = document.getElementById('root')
	if (root) {
		import('./App').then((mod) => {
			const App = mod.default
			createRoot(root).render(<App />)
		}).catch((err) => {
			console.error('Failed to load App:', err)
			// show a visible error so user isn't faced with a white screen
			root.innerHTML = '<pre style="color: red; padding: 1rem;">Failed to load app: ' + (err && err.message ? err.message : String(err)) + '</pre>'
		})
	}
}
