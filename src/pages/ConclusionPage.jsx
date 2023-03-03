import React, { useContext } from 'react';
import styles from './ConclusionPage.module.css';
import image from '../assets/medal.svg';
import { QuizContext } from '../contexts/quiz-context';

function ConclusionPage() {
	const { nickname, questionsInTotal, finalScore, quizResults } = useContext(QuizContext);
	const result = quizResults();
	const trueCount = result.filter(x => {
		if (x === true) {
			return true;
		}
	});
	const correctPercentage = (trueCount.length / questionsInTotal) * 100;
	console.log('trueCount: ', trueCount);

	return (
		<div className={styles['conclusion-page']}>
			<img className={styles['stats__illustration']} src={image}></img>
			<h3>{correctPercentage.toFixed(0)}% Score</h3>
			<p className={styles['score__message']}>
				Congratulations! {nickname}, you finished the quiz with {trueCount.length} of{' '}
				{questionsInTotal} points.
			</p>

			{/* <button className={styles['score__button']}>See All the Answers</button> */}
		</div>
	);
}

export default ConclusionPage;
