import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../contexts/quiz-context';
import styles from './QuestionPage.module.css';

function QuestionPage() {
	const navigate = useNavigate();

	const {
		progress,
		nextQuestion,
		previousQuestion,
		currentQuestion,
		activeOption,
		setActiveOption,
		questionsInTotal,
	} = useContext(QuizContext);

	function selectOptionHandler(e) {
		setActiveOption(e.target.dataset.letter);
	}

	async function finishHandler() {
		if (activeOption === null) return;

		await nextQuestion();
		navigate('/finish');
	}

	return (
		<div className={styles['question-page']}>
			<h3>
				Question {progress + 1} of {questionsInTotal}
			</h3>

			<div className={styles['question']}>
				<p className={styles['question__enunciate']}>{currentQuestion.question}</p>
				{currentQuestion.options.map(qtnOption => {
					return (
						<button
							onClick={selectOptionHandler}
							key={qtnOption.letter}
							data-letter={qtnOption.letter}
							className={
								styles['question__option'] +
								' ' +
								styles[activeOption === qtnOption.letter ? 'question__option--active' : '']
							}
						>
							<span>{qtnOption['letter']}</span> {qtnOption['answer']}
						</button>
					);
				})}
			</div>

			<div className={styles['nav-buttons']}>
				<button onClick={() => previousQuestion()}>Previous</button>
				{questionsInTotal - 1 !== progress ? (
					<button onClick={() => nextQuestion()}>Next</button>
				) : (
					<button onClick={finishHandler}>Finish</button>
				)}
			</div>
		</div>
	);
}

export default QuestionPage;
