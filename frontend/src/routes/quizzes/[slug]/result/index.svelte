<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params, fetch }) => {
		const res = await fetch(`/quizzes/${params.slug}/questions/0/JSON`);
		const data = await res.json();
		return { props: { quiz: data } };
	};
</script>

<script lang="ts">
	import { Button } from 'sveltestrap/src';
	import { Card, CardBody, Col, Container, Row, Spinner } from 'sveltestrap';
	import Header from '$lib/components/Header.svelte';
	import type { Quiz } from '$lib/types/quiz';
	import { correctRate } from '$lib/store/answerStore';

	export let quiz: Quiz;
</script>

<Container>
	<Row class="my-2">
		<Col><Header title={quiz.quizSet.name} /></Col>
	</Row>
	<Row class="my-2">
		<Col>
			<Card>
				<CardBody>
					<Row>
						<Col>
							<p class=".text-6xl">お疲れ様です！</p>
							{#if !$correctRate}
								<Spinner /> 計算中
							{:else}
								<p class=".text-6xl">正解率　<b>{$correctRate}</b></p>
							{/if}
						</Col>
					</Row>
				</CardBody>
			</Card>
		</Col>
	</Row>
	<Row>
		<Col>
			<Button block color="success" href="/">トップへ</Button>
		</Col>
	</Row>
</Container>
