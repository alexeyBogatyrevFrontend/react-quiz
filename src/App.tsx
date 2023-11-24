import { useEffect, useReducer } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Loader from './components/Loader'
import Error from './components/Error'
import StartScreen from './components/StartScreen'
import Question from './components/Question'

export type QuestionType = {
	question: string
	options: string[]
	correctOption: number
	points: number
}

const initialState = {
	questions: [],
	// loading, error, ready, active, finished
	status: 'loading',
}
const reducer = (state, action) => {
	switch (action.type) {
		case 'dataReceived':
			return { ...state, questions: action.payload, status: 'ready' }
		case 'dataFailed':
			return { ...state, status: 'error' }
		case 'start':
			return { ...state, status: 'active' }
		default:
			throw new Error('Action unknown')
	}
}

const App = () => {
	const [{ questions, status }, dispatch] = useReducer(reducer, initialState)

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

	return (
		<div className='app'>
			<Header />
			<Main>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && (
					<StartScreen numQuestions={questions.length} dispatch={dispatch} />
				)}
				{status === 'active' && <Question />}
			</Main>
		</div>
	)
}

export default App
