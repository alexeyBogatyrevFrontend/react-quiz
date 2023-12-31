import { useQuiz } from '../context/QuizContext'

const NextButton = () => {
	const { questions, dispatch, answer, index } = useQuiz()
	const numQuestions = questions.length

	if (answer === null) return null

	if (index < numQuestions - 1) {
		return (
			<button
				className='btn btn-ui'
				onClick={() => dispatch({ type: 'nextQuestion' })}
			>
				Next
			</button>
		)
	} else {
		return (
			<button
				className='btn btn-ui'
				onClick={() => dispatch({ type: 'finished' })}
			>
				Finsih
			</button>
		)
	}
}

export default NextButton
