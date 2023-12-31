import { useEffect } from 'react'
import { useQuiz } from '../context/QuizContext'

const Timer = () => {
	const { dispatch, secondsRemaining } = useQuiz()

	const minutes = Math.floor(secondsRemaining / 60)
	const remainingSeconds = secondsRemaining % 60

	useEffect(() => {
		const interval = setInterval(() => {
			dispatch({ type: 'timer' })
		}, 1000)

		return () => clearInterval(interval)
	}, [dispatch])

	return (
		<div className='timer'>
			{`${minutes}:${
				remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
			}`}
		</div>
	)
}

export default Timer
