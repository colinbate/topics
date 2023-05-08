import App from './App.svelte';
import { topics } from './topics';

const THEME_KEY = 'dark-mode';
const theme = (() => {
	if (typeof localStorage !== 'undefined' && localStorage.getItem(THEME_KEY)) {
		return localStorage.getItem(THEME_KEY);
	}
	if (!window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return 'light';
	}
	return 'dark';
})();
document.documentElement.classList.toggle('dark', theme === 'dark');

const app = new App({
	target: document.body,
	props: {
		topics
	}
});

export default app;