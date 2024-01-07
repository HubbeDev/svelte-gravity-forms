<script lang="ts">
	import { SvelteGravityForm } from '$lib/index.js';
	import { PUBLIC_GF_API_URL, PUBLIC_GF_FORM_URL } from '$env/static/public';
</script>

<SvelteGravityForm formId={1} backendUrl={PUBLIC_GF_API_URL} formUrl={PUBLIC_GF_FORM_URL} />
