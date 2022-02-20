<script lang="ts">
	import { Button, Col, Container, Row } from 'sveltestrap/src';
	import Header from '$lib/components/Header.svelte';
	import type { QuizSet } from '$lib/types/quiz';

	const quizSets: QuizSet[] = [
		{
			slug: 'advanced',
			name: '日本語問題　上級',
			quizLength: 10
		},
		{
			slug: 'intermediate',
			name: '日本語問題　中級',
			quizLength: 10
		},
		{
			slug: 'beginner',
			name: '日本語問題　初級',
			quizLength: 10
		}
	];
</script>

<Header title="Japanese Learners App - Lite" />

<Container>
	{#each quizSets as quizSet}
		<Row class="m-4">
			<Button color="success" href="/quizzes/{quizSet.slug}/questions/1">{quizSet.name}</Button>
		</Row>
	{/each}
</Container>
