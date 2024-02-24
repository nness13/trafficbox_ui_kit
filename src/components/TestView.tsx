import React, {FC, memo, useContext, createContext} from 'react'
// import { , useContextSelector } from 'use-context-selector';
import {useSimpleReducer} from "use_reducer_simple_syntax";
import produce from "immer";

const initialValues = {
	counter1: 0,
	counter2: 0,
}
type initType = typeof initialValues
type TestContextType = typeof initialValues & typeof actions
export const actions = {
	set_counter1: (value: number) => (state: initType) => produce(state, draft => {
		draft.counter1 = draft.counter1+value
	}),
	set_counter2: (value: number) => (state: initType) => produce(state, draft => {
		draft.counter2 = draft.counter2+value
	}),
}
export const useDatabaseViewReducer = () => useSimpleReducer(
	initialValues,
	actions
)

const TextViewContext = createContext<TestContextType | null>(null)
const TextViewContextProvider = TextViewContext.Provider
const useTextViewContext = () => {
	const context = useContext(TextViewContext)
	
	if(!context) throw new Error("Can not 'useTextViewContext' outside of the 'TextViewContextProvider' ")
	
	return context
}

export const TestView: FC<any> = () => {

	return (
		<TextViewContextProvider value={useDatabaseViewReducer()}>
			<div>
				<Counter1Container/>
				<Counter2/>
			</div>
		</TextViewContextProvider>
	)
}

export const Counter1Container: FC<any> = memo(() => {
	const set_counter1 = useTextViewContext(TextViewContext, state => state.set_counter1)
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
	const counter1 = useContextSelector(TextViewContext, state => state.counter1)
	console.log("counter 1")
	return (
		<div>
			Лічильник 1: {counter1}
		</div>
	)
})

export const Counter2: FC<any> = () => {
	const counter2 = useContextSelector(TextViewContext, state => state.counter2)
	const set_counter2 = useContextSelector(TextViewContext, state => state.set_counter2)
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