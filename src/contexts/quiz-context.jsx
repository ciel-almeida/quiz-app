import React, { createContext, useEffect, useState } from 'react';

// 1 Step - Creating a context with the default value
// 2 Step - Provider of the context that will wrapp the components that need the state
// 3 Step - State that will be shared

export const QuizContext = createContext({}); // Step 1
const questions = [
	{
		id: 1,
		question: 'Where CL would like to live?',
		options: [
			{ letter: 'A', answer: 'In a big city' },
			{ letter: 'B', answer: 'Somewhere near nature' },
			{ letter: 'C', answer: 'Near the beach' },
			{ letter: 'D', answer: 'Anywhere with a fast internet connection' },
		],
		correctAnswer: 'B',
	},
	{
		id: 2,
		question: 'What is CL favorite food?',
		options: [
			{ letter: 'A', answer: 'Falafel' },
			{ letter: 'B', answer: 'Peanut Butter' },
			{ letter: 'C', answer: 'Carrot Cake' },
			{ letter: 'D', answer: 'Smoothie' },
		],
		correctAnswer: 'B',
	},
	{
		id: 3,
		question: 'What is his favorite juice?',
		options: [
			{ letter: 'A', answer: 'Orange' },
			{ letter: 'B', answer: 'Acerola' },
			{ letter: 'C', answer: 'Grapefruit' },
			{ letter: 'D', answer: 'Passion fruit' },
		],
		correctAnswer: 'D',
	},
	{
		id: 4,
		question: 'Who is CL oshi (favorite idol member)?',
		options: [
			{ letter: 'A', answer: 'Mizuki Yamashita' },
			{ letter: 'B', answer: 'Sayaka Yamamoto' },
			{ letter: 'C', answer: 'Kanna Hashimoto' },
			{ letter: 'D', answer: 'Mayu Watanabe' },
		],
		correctAnswer: 'A',
	},
	{
		id: 5,
		question: 'What is his favorite idol group?',
		options: [
			{ letter: 'A', answer: 'Nogizaka46' },
			{ letter: 'B', answer: 'Morning Musume' },
			{ letter: 'C', answer: 'AKB48' },
			{ letter: 'D', answer: 'Nippon Wachacha' },
		],
		correctAnswer: 'A',
	},
	{
		id: 6,
		question: 'What is the thing that he dislikes the most?',
		options: [
			{ letter: 'A', answer: 'Government' },
			{ letter: 'B', answer: 'Correios' },
			{ letter: 'C', answer: 'Taxation' },
			{ letter: 'D', answer: 'All the answers above' },
		],
		correctAnswer: 'D',
	},
	{
		id: 7,
		question: 'If CL had to leave Brazil, to what country would he go?',
		options: [
			{ letter: 'A', answer: 'Panama' },
			{ letter: 'B', answer: 'Japan' },
			{ letter: 'C', answer: 'Philippines' },
			{ letter: 'D', answer: 'United States' },
		],
		correctAnswer: 'C',
	},
	{
		id: 8,
		question: 'What was his favorite movies as a child?',
		options: [
			{ letter: 'A', answer: 'Lord of the Rings' },
			{ letter: 'B', answer: 'Matrix' },
			{ letter: 'C', answer: 'Azumi' },
			{ letter: 'D', answer: 'Sleepy Hollow' },
		],
		correctAnswer: 'B',
	},
	{
		id: 9,
		question: 'What is CL favorite music genre?',
		options: [
			{ letter: 'A', answer: 'He does not have one' },
			{ letter: 'B', answer: 'Rock' },
			{ letter: 'C', answer: 'Japanese pop' },
			{ letter: 'D', answer: 'A blend of everything but mostly rock' },
		],
		correctAnswer: 'D',
	},
	{
		id: 10,
		question: 'What is CL favorite anime?',
		options: [
			{ letter: 'A', answer: 'Hunter x Hunter' },
			{ letter: 'B', answer: 'Rainbow' },
			{ letter: 'C', answer: 'Sakurasou pet no kanojo' },
			{ letter: 'D', answer: 'Even he does not know' },
		],
		correctAnswer: 'D',
	},
];
export function QuizProvider(props) {
	const [nickname, setNickname] = useState('');
	const [questionsInTotal, setQuestionsInTotal] = useState(questions.length);
	const [progress, setProgress] = useState(0);
	const [currentQuestion, setCurrentQuestion] = useState(questions[progress]);
	const [activeOption, setActiveOption] = useState(null);
	const [selectedOptions, setSelectedOptions] = useState([]);
	const [finalScore, setFinalScore] = useState();

	useEffect(() => {
		setCurrentQuestion(questions[progress]);
		console.log(selectedOptions);
		checkSelectedOption();
	}, [progress]);

	function nextQuestion() {
		if (activeOption === null) return;
		saveSelectedOption(currentQuestion.id, activeOption);
		if (questions.length - 1 === progress) return;
		setProgress(prevState => {
			return prevState + 1;
		});
	}

	function previousQuestion() {
		if (progress === 0) return;
		setProgress(prevState => {
			return prevState - 1;
		});
	}

	function quizResults() {
		const answers = selectedOptions.map((item, index) => {
			console.log('Index: ', index);
			console.log(item.option);
			console.log(questions[index].correctAnswer);
			if (item.option === questions[index].correctAnswer) {
				return true;
			} else {
				return false;
			}
		});
		return answers;
	}

	function saveSelectedOption(questionId, option) {
		if (selectedOptions.length === 0) {
			setSelectedOptions([{ questionId, option }]);
		} else {
			setSelectedOptions(prevState => {
				// Changing answered question
				const checker = prevState.filter(item => {
					if (item.questionId === questionId) return true;
				});
				if (checker.length !== 0) {
					const newArray = prevState.map(item => {
						if (item.questionId === questionId) {
							return { ...item, option: option };
						} else {
							return item;
						}
					});
					return [...newArray];
				} else {
					// Adding new answer
					return [...prevState, { questionId, option }];
				}
			});
		}
	}

	function checkSelectedOption() {
		if (!selectedOptions[progress]) {
			setActiveOption(null);
		} else {
			const answerObj = selectedOptions[progress].option;
			setActiveOption(answerObj);
		}
	}

	return (
		<QuizContext.Provider
			value={{
				nickname,
				progress,
				nextQuestion,
				previousQuestion,
				setNickname,
				currentQuestion,
				questionsInTotal,
				selectedOptions,
				activeOption,
				setActiveOption,
				quizResults,
				finalScore,
				setFinalScore,
			}}
		>
			{props.children}
		</QuizContext.Provider>
	);
}
