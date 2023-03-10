import {shuffleArray} from './utils';

export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export type QuestionsState = Question & {answers: string[]};

const fetchQuizQuestions = async (amount: number, difficulty: Difficulty): Promise<QuestionsState[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await(await fetch(endpoint)).json();
  return data.results.map((question: Question) => (
    {
      ...question,
      answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }
  ))
}

export default fetchQuizQuestions