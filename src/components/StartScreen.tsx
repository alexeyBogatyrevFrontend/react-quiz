import { FC } from 'react'

type StartScreenProps = {
	numQuestions: number
}

const StartScreen: FC<StartScreenProps> = ({ numQuestions }) => {
	return (
		<div className='start'>
			<h2>Welcome to The React Quiz!</h2>
			<h3>{numQuestions} questions to test your React mastery</h3>
			<button className='btn btn-ui'>Let's start</button>
		</div>
	)
}

export default StartScreen
