<script lang="ts">
	const date = new Date();
	const year = date.getFullYear();
</script>

<footer class="mx-2 py-2 flex items-center justify-center">
	<p>All rights reserved.</p>
	<p>Copyright (c) {year} Japanese Learners</p>
</footer>

<style lang="postcss">
	p {
		@apply text-xs text-gray-900;
	}
</style>
