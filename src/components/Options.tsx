import { Dispatch, FC } from 'react'
import { QuestionsType } from '../App'

type OptionsType = {
	question: QuestionsType
	dispatch: Dispatch<{ type: string; payload?: number }>
	answer: number | null
}

const Options: FC<OptionsType> = ({ question, dispatch, answer }) => {
	const hasAnswered = answer !== null

	return (
		<div className='options'>
			{question.options.map((option, index) => (
				<button
					className={`btn btn-option ${answer === index ? 'answer' : ''} ${
						hasAnswered
							? index === question.correctOption
								? 'correct'
								: 'wrong'
							: ''
					}`}
					disabled={hasAnswered}
					key={option}
					onClick={() => dispatch({ type: 'newAnswer', payload: index })}
				>
					{option}
				</button>
			))}
		</div>
	)
}

export default Options
