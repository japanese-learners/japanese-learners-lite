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
	import { Image, Card, CardBody, Progress, Col, Container, Row } from 'sveltestrap';
	import Header from '$lib/components/Header.svelte';
	import type { Quiz } from '$lib/types/quiz';
	import { answers } from '$lib/store/answerStore';
	import { page } from '$app/stores';
	const userSelect = $page.url.searchParams.get('ans');
	import { browser } from '$app/env';

	export let quiz: Quiz;
	$: progress = quiz.question.num * 10;
	$: nextQuizNum = quiz.question.num + 1;

	// Put user select value and result into store
	if (browser) {
		$answers[quiz.question.num - 1] = {
			select: userSelect,
			result: quiz.answer.value == userSelect ? 1 : 0
		};
	}
</script>

<Container>
	<Row class="my-2">
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
					<Row cols={2}>
						<Col class="w-2/3">
							<p class=".text-6xl my-4">
								{quiz.answer.value == userSelect ? '正解です！' : '不正解です'}
							</p>
							<p class=".text-6xl">正解は 「<b>{quiz.answer.key}. {quiz.answer.value}</b>」</p>
						</Col>
						<Col class="w-1/3">
							<Image src={quiz.answer.value == userSelect ? '/maru.png' : '/batsu.png'} />
						</Col>
					</Row>
				</CardBody>
			</Card>
		</Col>
	</Row>
	<Row class="my-2">
		<Col>
			<Card>
				<CardBody>
					<p class=".text-4xl">解説</p>
					<p class=".text-lg">
						{@html quiz.answer.explanation}
					</p>
				</CardBody>
			</Card>
		</Col>
	</Row>
	<Row>
		<Col>
			{#if quiz.question.num !== quiz.quizSet.quizLength}
				<Button block color="success" href="/quizzes/{quiz.quizSet.slug}/questions/{nextQuizNum}"
					>次の問題へ</Button
				>
			{:else}
				<Button block color="success" href="/quizzes/{quiz.quizSet.slug}/result">結果へ</Button>
			{/if}
		</Col>
	</Row>
</Container>
