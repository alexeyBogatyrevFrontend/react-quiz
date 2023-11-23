import { useEffect, useReducer } from 'react'
import Header from './components/Header'
import Main from './components/Main'

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

		default:
			throw new Error('Action unknown')
	}
}

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState)

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
				<p>0/15</p>
				<p>Question</p>
			</Main>
		</div>
	)
}

export default App
