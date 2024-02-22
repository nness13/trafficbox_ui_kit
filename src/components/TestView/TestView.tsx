import React, {FC, memo} from 'react'
import { createContext, useContextSelector } from 'use-context-selector';
import {useSimpleReducer} from "use_reducer_simple_syntax";
import {ViewReducerContext} from "@/components/DatabaseView/Views/ViewStoreContext";

const initialValues = {
	counter1: 0,
	counter2: 0,
}
type initType = typeof initialValues
type TestContextType = typeof initialValues & typeof actions
export const actions = {
	set_counter1: (value: number) => (state: initType) => state,
	set_counter2: (value: number) => (state: initType) => state,
}
export const useDatabaseViewReducer = () => useSimpleReducer(
	initialValues,
	actions
)

const Context = createContext({
	...initialValues,
	...actions
})

export const TestView: FC<any> = () => {
	const reducer = useDatabaseViewReducer()

	return (
		<Context.Provider value={reducer}>
			<div>
				<Counter1Container/>
				<Counter2/>
			</div>
		</Context.Provider>
	)
}

export const Counter1Container: FC<any> = memo(() => {
	const set_counter1 = useContextSelector(Context, state => state.set_counter1)
	console.log("Counter1Container")

	return (
		<div>
			<div onClick={() => set_counter1(1)}>
				Збільшити 1
			</div>
			<Counter1/>
		</div>
	)
})

export const Counter1: FC<any> = memo(() => {
	const counter1 = useContextSelector(Context, state => state.counter1)
	console.log("counter 1")
	return (
		<div>
			Лічильник 1: {counter1}
		</div>
	)
})

export const Counter2: FC<any> = () => {
	const counter2 = useContextSelector(Context, state => state.counter2)
	const set_counter2 = useContextSelector(Context, state => state.set_counter2)
	console.log("counter 2")
	return (
		<div>
			<div onClick={() => set_counter2(2)}>
				Збільшити 2
			</div>
			<div>
				Лічильник 2: {counter2}
			</div>
		</div>
	)
}