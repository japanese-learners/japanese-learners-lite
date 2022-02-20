export interface QuizSet {
	slug: string;
	name: string;
	quizLength: number;
}

export interface Question {
	num: number;
	title: string;
	description: string;
	hint: string;
}

export interface Choice {
	key: string;
	value: string;
}

export interface Answer {
	key: string;
	value: string;
	explanation: string;
}

export interface Quiz {
	id: number;
	quizSet: QuizSet;
	question: Question;
	choices: Choice[];
	answer: Answer;
}
