import { Dispatch } from 'react'

export const action_dispatcher = <T, D>(action_handler_list: Record<keyof T, Function>, dispatch: Dispatch<any>, view_id?: string) =>
	Object.fromEntries(
		( Object.keys(action_handler_list) as Array<keyof T> )
			.map( (type) => ([
				type,
				(payload: any) => {
					// console.log(payload)
					dispatch({ type, payload, view_name: view_id })
				}
			]) )
	) as {
		[key in keyof T]: (payload: any) => void
	}