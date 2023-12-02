import { Dispatch, FC } from 'react'

type NextButtonProps = {
	dispatch: Dispatch<{ type: string }>
	answer: number
	index: number
	numQuestions: number
}

const NextButton: FC<NextButtonProps> = ({
	dispatch,
	answer,
	index,
	numQuestions,
}) => {
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
