import { Dispatch, FC, useEffect } from 'react'

type TimerProps = {
	dispatch: Dispatch<{ type: string }>
	secondsRemaining: number
}

const Timer: FC<TimerProps> = ({ dispatch, secondsRemaining }) => {
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
