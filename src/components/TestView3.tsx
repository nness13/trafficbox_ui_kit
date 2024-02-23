import React, {createContext, FC, memo, useContext} from 'react'
import {create, StateCreator} from "zustand";
import {devtools} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {WritableDraft} from 'immer/dist/internal.js';


const initialValues = {
	counter1: 0,
	counter2: 0,
}
type initType = typeof initialValues
type TestContextType = typeof initialValues & ReturnType<typeof actions>
type stateCreate = StateCreator<TestContextType, [["zustand/devtools", never], ["zustand/immer", never]], []>

type setCallbackExampleType = (state: WritableDraft<initType>) => void
type setExampleType = (callback: setCallbackExampleType) => void
const actions = (set: setExampleType) => ({
	set_counter1: (value: number) => set(draft => {
		draft.counter1 = draft.counter1+value
	}),
	set_counter2: (value: number) => set(draft => {
		draft.counter2 = draft.counter2+value
	}),
})
const useZustandTestStore = () => create<TestContextType>()(devtools(immer(
	(set) => ({
		...initialValues,
		...actions(set),
	})
), {
	name: "TestViewStore1"
}))

console.log(useZustandTestStore)

const Context = createContext<ReturnType<typeof useZustandTestStore>>(useZustandTestStore())

export const TestView3: FC<any> = () => {

	return (
		<Context.Provider value={useZustandTestStore()}>
			<div>
				<Counter1Container/>
				<Counter2/>
			</div>
		</Context.Provider>
	)
}

const Counter1Container: FC<any> = () => {
	const useZustandTestStore = useContext(Context)
	const set_counter1 = useZustandTestStore( state => state.set_counter1)
	console.log("Counter1Container")

	return (
		<div>
			<div onClick={() => set_counter1(1)}>
				Збільшити 1
			</div>
			<Counter1/>
		</div>
	)
}

const Counter1: FC<any> = () => {
	const useZustandTestStore = useContext(Context)
	const counter1 = useZustandTestStore( state => state.counter1)
	console.log("counter 1")
	return (
		<div>
			Лічильник 1: {counter1}
		</div>
	)
}

const Counter2: FC<any> = () => {
	const useZustandTestStore = useContext(Context)
	const counter2 = useZustandTestStore( state => state.counter2)
	const set_counter2 = useZustandTestStore( state => state.set_counter2)

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