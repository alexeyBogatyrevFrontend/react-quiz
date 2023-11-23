import { useReducer, useState } from 'react'

const initialState = { count: 0, step: 1 }

const reducer = (state, action) => {
	console.log(state, action)

	switch (action.type) {
		case 'inc':
			return { ...state, count: state.count + action.payload }
			break
		case 'dec':
			return { ...state, count: state.count - action.payload }
			break
		case 'setCount':
			return { ...state, count: action.payload }
			break
		case 'setStep':
			return { ...state, step: action.payload }
			break
		case 'reset':
			return initialState
			break
		default:
			break
	}

	// if (action.type === 'inc') return state.count + action.payload
	// if (action.type === 'dec') return state.count - action.payload
	// if (action.type === 'setCount') return action.payload
}

function DateCounter() {
	const [state, dispatch] = useReducer(reducer, initialState)
	const { count, step } = state

	const date = new Date('june 21 2027')
	date.setDate(date.getDate() + count)

	const dec = function () {
		dispatch({ type: 'dec', payload: step })
	}

	const inc = function () {
		dispatch({ type: 'inc', payload: step })
	}

	const defineCount = function (e) {
		dispatch({ type: 'setCount', payload: Number(e.target.value) })
	}

	const defineStep = function (e) {
		dispatch({ type: 'setStep', payload: Number(e.target.value) })
	}

	const reset = function () {
		dispatch({ type: 'reset' })
	}

	return (
		<div className='counter'>
			<div>
				<input
					type='range'
					min='0'
					max='10'
					value={step}
					onChange={defineStep}
				/>
				<span>{step}</span>
			</div>

			<div>
				<button onClick={dec}>-</button>
				<input value={count} onChange={defineCount} />
				<button onClick={inc}>+</button>
			</div>

			<p>{date.toDateString()}</p>

			<div>
				<button onClick={reset}>Reset</button>
			</div>
		</div>
	)
}
export default DateCounter
