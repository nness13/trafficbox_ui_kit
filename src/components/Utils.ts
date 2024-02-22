import {Dispatch, useReducer} from "react";


type ActionType<S> = (...payload: any[]) => (state: S) => S
export type ActionsType<S> = Record<string, ActionType<S>>
export const useNsReducer = <S, A extends ActionsType<S> >(initialState: S, actions: A ): S & A => {
    const reducer = (state: S, {type, payload}: {type: string, payload: any}): S => {
        if(actions[type]) return actions[type](...payload)(state)
        return state
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    const dispatched_action = action_dispatcher(state, actions, dispatch)
    return {...state, ...dispatched_action}
}


export const action_dispatcher = <S, T extends ActionsType<S>, D extends Dispatch<any>>(state: S, actions: T, dispatch: D) => {
    return Object.fromEntries(
        (Object.keys(actions) as Array<keyof T>)
            .map((type) => ([
                type,
                (...payload: any[]) => {
                    // console.log(payload)
                    dispatch({type, payload})
                }
            ]))
    ) as T;
}