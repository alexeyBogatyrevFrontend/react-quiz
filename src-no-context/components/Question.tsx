import { Dispatch, FC } from 'react'
import { QuestionsType } from '../App'
import Options from './Options'

type QuestionType = {
	question: QuestionsType
	dispatch: Dispatch<{ type: string }>
	answer: number | null
}

const Question: FC<QuestionType> = ({ question, dispatch, answer }) => {
	return (
		<div>
			<h4>{question.question}</h4>

			<Options question={question} dispatch={dispatch} answer={answer} />
		</div>
	)
}

export default Question
