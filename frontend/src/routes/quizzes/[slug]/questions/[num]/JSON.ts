import type { EndpointOutput, RequestEvent } from '@sveltejs/kit';
import path from 'path';
import fs from 'fs/promises';

const quizzesPath = path.resolve('static/questions');

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }: RequestEvent): Promise<EndpointOutput> {
	// const res = await fetch('http://localhost:1337/quizzes');
	// const data = await res.json();
	const filepath = path.join(quizzesPath, params.slug, 'quiz-' + params.num + '.json');
	const file = await fs.readFile(filepath);
	const data = JSON.parse(file.toString());
	return { body: data };
}
