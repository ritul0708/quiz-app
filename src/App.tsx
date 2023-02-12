import React, {useState} from 'react';
import QuestionCard from './components/QuestionCard';
import fetchQuizQuestions from './API';
import { QuestionsState, Difficulty } from './API';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(true);

  console.log(questions);

  const startQuiz = async () => {
    setLoading(true);
    setQuizOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.Easy);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setQuestionNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!quizOver) {
      const answer = e.currentTarget.value;

      const correct = questions[questionNumber].correct_answer === answer;

      if(correct) setScore(prev => prev + 1);

      const answerObject = {
        question: questions[questionNumber].question,
        answer,
        correct,
        correctAnswer: questions[questionNumber].correct_answer,
      };
      setUserAnswers(prev => [...prev, answerObject])
    }

  }

  const nextQuestion = () => {
    const nextQuestionNumber = questionNumber + 1;
    if (nextQuestionNumber === TOTAL_QUESTIONS) {
      setQuizOver(true)
    } else {
      setQuestionNumber(nextQuestionNumber)
    }
  }

  return (
    <div className="App">
      <h1>Quiz App</h1>
      { quizOver || userAnswers.length === TOTAL_QUESTIONS 
        ? <button className='start' onClick={startQuiz}>Start Quiz</button> 
        : null }

      { !quizOver ? 
        <p className='score'> Score: {score}</p> : null
      }


      { loading ? <p>Loading Questions ...</p> : null }

      { !loading && !quizOver && (
      <QuestionCard
        questionNumber = {questionNumber + 1}
        totalQuestions = {TOTAL_QUESTIONS}
        question = {questions[questionNumber].question}
        answers = {questions[questionNumber].answers}
        userAnswer = {userAnswers ? userAnswers[questionNumber] : undefined}
        callback = {checkAnswer}
      />
      )}
      { !quizOver && !loading && userAnswers.length === questionNumber+1 && questionNumber !== TOTAL_QUESTIONS -1 ? (
        <button className='next' onClick={nextQuestion}>Next Question</button>
      ) : null }
    </div>
  );
}

export default App;
