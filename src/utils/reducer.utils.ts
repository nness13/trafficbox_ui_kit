import { Dispatch } from 'react'

export const action_dispatcher = <T, D>(action_handler_list: Record<string, any>, dispatch: Dispatch<any>, view_name?: string) =>
	Object.fromEntries(
		( Object.keys(action_handler_list) as Array<keyof T> )
			.map( (type) => ([
				type,
				(payload: any) => {
					// console.log(payload)
					dispatch({ type, payload, view_name: view_name })
				}
			]) )
	)