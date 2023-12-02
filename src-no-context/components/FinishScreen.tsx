import { Dispatch, FC } from 'react'

type FinishScreenProps = {
	points: number
	numPoints: number
	highscore: number
	dispatch: Dispatch<{ type: string }>
}

const FinishScreen: FC<FinishScreenProps> = ({
	points,
	numPoints,
	highscore,
	dispatch,
}) => {
	const calculatePercentage = (points / numPoints) * 100

	let emoji

	if (calculatePercentage === 100) emoji = '🥇'
	if (calculatePercentage >= 80 && calculatePercentage < 100) emoji = '🎉'
	if (calculatePercentage >= 50 && calculatePercentage < 80) emoji = '🙃'
	if (calculatePercentage >= 0 && calculatePercentage < 50) emoji = '🤨'
	if (calculatePercentage === 0) emoji = '🤦‍♂️'

	return (
		<>
			<p className='result'>
				<span>{emoji}</span> You scored <strong>{points} </strong>
				out of {numPoints} ({Math.ceil(calculatePercentage)}%)
			</p>
			<p className='highscore'>(Highscore: {highscore} points)</p>
			<button
				className='btn btn-ui'
				onClick={() => dispatch({ type: 'restart' })}
			>
				Restart
			</button>
		</>
	)
}

export default FinishScreen
