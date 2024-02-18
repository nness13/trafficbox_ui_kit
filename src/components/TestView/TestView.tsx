import React, { FC, memo } from 'react'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export type initValueType = {
	counter1: number
	counter2: number
	set_counter1: () => void
	set_counter2: () => void
}
export const useDatabaseViewStore = create<initValueType>()(devtools(immer(
	(set, getState, store) => ({
		counter1: 0,
		set_counter1: () => set(state => {
			state.counter1++
		}),
		counter2: 0,
		set_counter2: () => set(state => {
			state.counter2++
		}),
	})
), {
	name: "TestStore",
}))


export const TestView: FC<any> = () => {
	const set_counter2 = useDatabaseViewStore(state => state.set_counter2)
	return (
		<div>

			<Counter1Container/>

			<div>
				<div onClick={() => set_counter2()}>
					Збільшити 2
				</div>
				<Counter2/>
			</div>

		</div>
	)
}

export const Counter1Container: FC<any> = memo(() => {
	const set_counter1 = useDatabaseViewStore(state => state.set_counter1)
	console.log("Counter1Container")

	return (
		<div>
			<div onClick={() => set_counter1()}>
				Збільшити 1
			</div>
			<Counter1/>
		</div>
	)
})

export const Counter1: FC<any> = memo(() => {
	const counter1 = useDatabaseViewStore(state => state.counter1)
	console.log("counter 1")
	return (
		<div>
			Лічильник 1: {counter1}
		</div>
	)
})

export const Counter2: FC<any> = () => {
	const counter2 = useDatabaseViewStore(state => state.counter2)
	console.log("counter 2")
	return (
		<div>
			Лічильник 2: {counter2}
		</div>
	)
}