import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../../contexts/quiz-context';
import styles from './NicknameForm.module.css';

function NicknameForm() {
	const quizCtx = useContext(QuizContext);
	const navigate = useNavigate();

	const [nickname, setNickname] = useState('');
	const [formError, setFormError] = useState({ isActive: false, message: '' });

	function handleSubmit(e) {
		e.preventDefault();
		console.log(nickname);
		if (nickname === '' || nickname.length <= 3) {
			setFormError({ isActive: true, message: 'Write a valid name with at least 3 letters.' });
			return;
		}
		quizCtx.setNickname(nickname);
		navigate('/quiz');
	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="name">Your nickname:</label>
			<input type="text" name="name" id="name" onChange={e => setNickname(e.target.value)} />
			{formError.isActive && <p>{formError.message}</p>}
			<button type="submit">Start Quiz</button>
		</form>
	);
}

export default NicknameForm;
