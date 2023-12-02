import { FC } from 'react'

type ProgressProps = {
	index: number
	numQuestions: number
	points: number
	numPoints: number
	answer: number
}

const Progress: FC<ProgressProps> = ({
	index,
	numQuestions,
	points,
	numPoints,
	answer,
}) => {
	return (
		<header className='progress'>
			<progress max={numQuestions} value={index + Number(answer !== null)} />
			<p>
				Question <strong>{index + 1}</strong> / {numQuestions}
			</p>
			<p>
				<strong>{points}</strong> / {numPoints} points
			</p>
		</header>
	)
}

export default Progress
