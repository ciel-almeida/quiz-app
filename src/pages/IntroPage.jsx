import React, { useState } from 'react';
import styles from './IntroPage.module.css';
import image from '../assets/monitor.svg';
import NicknameForm from '../components/NicknameForm/NicknameForm';

function IntroPage() {
	return (
		<div className={styles['intro-page']}>
			<h1>CL Quiz</h1>
			<p>
				Test your knowledge about CL answering 10 questions and in the end see how many points and
				you scored.
			</p>
			<img className={styles['intro__illustration']} src={image}></img>
			<NicknameForm />
		</div>
	);
}

export default IntroPage;
