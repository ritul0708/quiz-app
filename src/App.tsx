import React, {useState} from 'react';
import QuestionCard from './components/QuestionCard';
import fetchQuizQuestions from './API';
import { Difficulty } from './API';

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizOver, setquizOver] = useState(true);

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.Easy));

  const startQuiz = async () => {

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {

  }

  return (
    <div className="App">
      <h1>Quiz App</h1>
      <button className='start' onClick={startQuiz}>Start Quiz</button>
      <p className='score'> Score:</p>
      <p>Loading Questions ...</p>
      {/* <QuestionCard
        questionNumber = {questionNumber + 1}
        totalQuestions = {TOTAL_QUESTIONS}
        question = {questions[questionNumber].question}
        answers = {questions[questionNumber].answers}
        userAnswer = {userAnswers ? userAnswers[questionNumber] : undefined}
        callback = {checkAnswer}
      /> */}
      <button className='next' onClick={nextQuestion}>Next Question</button>
    </div>
  );
}

export default App;
