import { Dispatch, FC } from 'react'

type NextButtonProps = {
	dispatch: Dispatch<{ type: string }>
	answer: number
}

const NextButton: FC<NextButtonProps> = ({ dispatch, answer }) => {
	return (
		<>
			{answer !== null ? (
				<button
					className='btn btn-ui'
					onClick={() => dispatch({ type: 'nextQuestion' })}
				>
					Next
				</button>
			) : (
				''
			)}
		</>
	)
}

export default NextButton
