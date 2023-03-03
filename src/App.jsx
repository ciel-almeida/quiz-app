import { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import './App.css';
import Container from './components/Container';
import IntroPage from './pages/IntroPage';
import ConclusionPage from './pages/ConclusionPage';
import QuestionPage from './pages/QuestionPage';
import { QuizContext, QuizProvider } from './contexts/quiz-context';

// function reducerMethod(state, action) {

//   switch(action.type) {
//     case 'ADD_ANSWER': {
//       return ...state,
//       break
//     }
//     case 'NEXT_ANSWER': {
//       break
//     }
//     case 'PREVIOUS_ANSWER': {
//       break
//     }
//     case '_ANSWER': {
//       break
//     }
//     default: {
//       return state;
//     }
//   }
// }

function App() {
	// const initialState = {
	//   currentID: 1,
	//   questionsInTotal: 5,
	//   currentQuestion: '',

	// }
	// const [state, dispatch] = useReducer(reducerMethod, initialValue)
	const quizCtx = useContext(QuizContext);
	const { page, nickname } = quizCtx;
	console.log('PAge: ', quizCtx.progress);
	const [currentPage, setCurrentPage] = useState(page);
	return (
		<div className="App">
			<Container>
				<QuizProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<IntroPage />} />
							<Route path="/quiz" element={<QuestionPage />} />
							<Route path="/finish" element={<ConclusionPage />} />
						</Routes>
					</BrowserRouter>
				</QuizProvider>
			</Container>
		</div>
	);
}

export default App;
