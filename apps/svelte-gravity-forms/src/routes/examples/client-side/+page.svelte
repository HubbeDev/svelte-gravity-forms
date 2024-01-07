<script lang="ts">
	import { SvelteGravityForm } from '$lib/index.js';
	import {
		PUBLIC_GF_API_URL,
		PUBLIC_GF_CONSUMER_KEY,
		PUBLIC_GF_CONSUMER_SECRECT
	} from '$env/static/public';
</script>

<SvelteGravityForm
	formId={1}
	backendUrl={PUBLIC_GF_API_URL}
	consumerKey={PUBLIC_GF_CONSUMER_KEY}
	consumerSecret={PUBLIC_GF_CONSUMER_SECRECT}
	ssr={false}
/>
