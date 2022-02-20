import { writable, derived } from 'svelte/store';

let storedAnswers = JSON.parse(localStorage.getItem('answers'));

// Initialization if not exist
if (!storedAnswers) {
	storedAnswers = [{ select: '', result: 0 }];
	localStorage.setItem('answers', JSON.stringify(storedAnswers));
}
export const answers = writable<Array<Record<string, unknown>>>(storedAnswers);

export const correctRate = derived(answers, ($answers) => {
	return (
		$answers.reduce(function (a, b) {
			return { result: a.result + b.result };
		}).result +
		'/' +
		$answers.length
	);
});
