import {
	FC,
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useReducer,
} from 'react'
import { QuestionsType } from '../App'

type QuizProviderProps = {
	children: ReactNode
}

type QuizContextProps = {
	questions: QuestionsType[]
	status: string
	index: number
	answer: number
	points: number
	highscore: number
	secondsRemaining: number
	numPoints: number
	dispatch: React.Dispatch<QuizAction>
}

type QuizState = {
	questions: QuestionsType[]
	status: string
	index: number
	answer: number
	points: number
	highscore: number
	secondsRemaining: number
}

type QuizAction =
	| { type: 'dataReceived'; payload: QuestionsType[] }
	| { type: 'dataFailed' }
	| { type: 'start' }
	| { type: 'newAnswer'; payload: number }
	| { type: 'nextQuestion' }
	| { type: 'finished' }
	| { type: 'restart' }
	| { type: 'timer' }

const QuizContext = createContext<QuizContextProps>({} as QuizContextProps)

const initialState: QuizState = {
	questions: [],
	// loading, error, ready, active, finished
	status: 'ready',
	index: 0,
	answer: null,
	points: 0,
	highscore: 0,
	secondsRemaining: 300,
}
const reducer = (state: QuizState, action: QuizAction): QuizState => {
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
			throw new Error('Action unknown')
	}
}

const QuizProvider: FC<QuizProviderProps> = ({ children }) => {
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
		<QuizContext.Provider
			value={{
				questions,
				status,
				index,
				answer,
				points,
				highscore,
				secondsRemaining,
				numPoints,
				dispatch,
			}}
		>
			{children}
		</QuizContext.Provider>
	)
}

const useQuiz = () => {
	const context = useContext(QuizContext)
	if (context === undefined) {
		throw new Error('AuthContext was used outside AuthProvider')
	}

	return context
}

export { QuizProvider, useQuiz }
