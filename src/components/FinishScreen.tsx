import { FC } from 'react'

type FinishScreenProps = {
	points: number
	numPoints: number
	highscore: number
}

const FinishScreen: FC<FinishScreenProps> = ({
	points,
	numPoints,
	highscore,
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
		</>
	)
}

export default FinishScreen
