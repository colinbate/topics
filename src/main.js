import App from './App.svelte';
import { topics } from './topics';

const app = new App({
	target: document.body,
	props: {
		topics
	}
});

export default app;