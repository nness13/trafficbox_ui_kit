import { signal } from '@preact/signals-react';
import React from 'react'

const count = signal(0)

export const TestSignal = () => {
	const value = count.value
	const increment = () => count.value++

	console.log("Render Comp");

	return (
		<div>
			<div
				className={"cursor-pointer"}
				onClick={increment}
			>Додати лічильник</div>
			<div>

				Кількість: {value}
			</div>
		</div>
	)
}