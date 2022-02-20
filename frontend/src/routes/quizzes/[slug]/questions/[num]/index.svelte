<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params, fetch }) => {
		const res = await fetch(`/quizzes/${params.slug}/questions/${params.num}/JSON`);
		const data = await res.json();
		return { props: { quiz: data } };
	};
</script>

<script lang="ts">
	import { Button } from 'sveltestrap/src';
	import { Card, CardBody, Progress, Col, Container, Row } from 'sveltestrap';
	import Header from '$lib/components/Header.svelte';
	import type { Quiz } from '$lib/types/quiz';

	export let quiz: Quiz;
	$: progress = quiz.question.num * 10;
</script>

<Container>
	<Row>
		<Col><Header title={quiz.quizSet.name} /></Col>
	</Row>

	<Row class="my-2">
		<Col>
			<div>{progress}%</div>
			<Progress color="success" value={progress} />
		</Col>
	</Row>
	<Row class="my-2">
		<Col>
			<Card>
				<CardBody>
					<p>{quiz.question.title}</p>
					<p>{@html quiz.question.description}</p>
					<p>{quiz.question.hint}</p>
				</CardBody>
			</Card>
		</Col>
	</Row>

	<Row class="my-2" cols={{ sm: 1 }}>
		{#each quiz.choices as choice}
			<Col class="my-1" sm={{ size: 6 }}>
				<Button
					block
					color="success"
					href="/quizzes/{quiz.quizSet.slug}/answers/{quiz.question.num}?ans={choice.value}"
				>
					{choice.key}: {choice.value}
				</Button>
			</Col>
		{/each}
	</Row>
</Container>
