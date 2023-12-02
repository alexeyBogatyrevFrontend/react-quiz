import { useEffect, useReducer } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Loader from './components/Loader'
import Error from './components/Error'
import StartScreen from './components/StartScreen'
import Question from './components/Question'
import NextButton from './components/NextButton'
import Progress from './components/Progress'
import FinishScreen from './components/FinishScreen'
import Timer from './components/Timer'

export type QuestionsType = {
	question: string
	options: string[]
	correctOption: number
	points: number
}

const initialState = {
	questions: [],
	// loading, error, ready, active, finished
	status: 'ready',
	index: 0,
	answer: null,
	points: 0,
	highscore: 0,
	secondsRemaining: 300,
}
const reducer = (state, action) => {
	switch (action.type) {
		case 'dataReceived':
			return { ...state, questions: action.payload, status: 'ready' }

		case 'dataFailed':
			return { ...state, status: 'error' }

		case 'start':
			return { ...state, status: 'active' }

		case 'newAnswer': {
			const question = state.questions[state.index]

			return {
				...state,
				answer: action.payload,
				points:
					action.payload === question.correctOption
						? state.points + question.points
						: state.points,
			}
		}

		case 'nextQuestion':
			return { ...state, index: state.index + 1, answer: null }

		case 'finished':
			return {
				...state,
				status: 'finished',
				highscore:
					state.points > state.highscore ? state.points : state.highscore,
			}

		case 'restart':
			return {
				...initialState,
				highscore: state.highscore,
				questions: state.questions,
				status: 'ready',
			}

		case 'timer':
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status: state.secondsRemaining === 0 ? 'finished' : state.status,
			}

		default:
			return 'Action unknown'
	}
}

const App = () => {
	const [
		{ questions, status, index, answer, points, highscore, secondsRemaining },
		dispatch,
	] = useReducer(reducer, initialState)

	useEffect(() => {
		const fetchingData = async () => {
			try {
				const res = await fetch('http://localhost:8000/questions')
				const data = await res.json()

				dispatch({ type: 'dataReceived', payload: data })
			} catch (err) {
				dispatch({ type: 'dataFailed' })
			}
		}
		fetchingData()
	}, [])

	const numPoints = questions.reduce(
		(accum: number, item: QuestionsType) => (accum += item.points),
		0
	)

	return (
		<div className='app'>
			<Header />
			<Main>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && (
					<StartScreen numQuestions={questions.length} dispatch={dispatch} />
				)}
				{status === 'active' && (
					<>
						<Progress
							index={index}
							numQuestions={questions.length}
							points={points}
							numPoints={numPoints}
							answer={answer}
						/>
						<Question
							question={questions[index]}
							dispatch={dispatch}
							answer={answer}
						/>
						<footer>
							<Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
							<NextButton
								dispatch={dispatch}
								answer={answer}
								index={index}
								numQuestions={questions.length}
							/>
						</footer>
					</>
				)}
				{status === 'finished' && (
					<FinishScreen
						points={points}
						numPoints={numPoints}
						highscore={highscore}
						dispatch={dispatch}
					/>
				)}
			</Main>
		</div>
	)
}

export default App
