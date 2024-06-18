<script lang="ts">
	import { navigate } from '$lib'
	import { setStorageItem } from '$lib/storage'
	import type { PageData } from './$types'

	export let data: PageData

	if (data.spotify) {
		setStorageItem('spotify', data.spotify)

		navigate('/setup')
	}
</script>

<p>Redirecting...</p>
