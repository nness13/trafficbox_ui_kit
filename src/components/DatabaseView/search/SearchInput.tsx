import { HiMagnifyingGlass } from 'react-icons/hi2'
import React, { useContext, useState } from 'react'
import { Input } from '@material-tailwind/react'
import { DatabaseViewContext } from '@/components/DatabaseView/DatabaseView'
import { Tab } from '@/components/DatabaseView/DatabaseViewPanel'

export function SearchInput () {
	const context = useContext(DatabaseViewContext)
	const active_view = context.views.find(view => view.name === context.selected_view)!
	const [status, set_status] = useState(true)
	const on_search = (e: any) => {
		active_view.actions.set_search(active_view.search.value+e.currentTarget.value)
	}

	return (
		<div className={`transition-all flex items-center`} style={{width: status ? 40 : 230}}>
			{status
				? <Tab onClick={() => set_status(false)}>
					<HiMagnifyingGlass className="h-5 w-5"/>
				</Tab>
				: <div className="flex flex-row items-center gap-1 h-full">
					<Input
						type="search"
						label="Пошук"
						containerProps={{
							className: "h-9 flex flex-row items-center"
						}}
						value={active_view.search.value}
						onChange={on_search}
						autoFocus
						onBlur={() => active_view.search.value.length === 0 && set_status(true)}
						icon={
							<HiMagnifyingGlass className="h-5 w-5 cursor-pointer" onClick={() => set_status(true)}/>
						}
						crossOrigin={undefined}
					/>

				</div>
			}
		</div>
	)
}

export function useDatabaseSearch (rows: any[]) {
	const context = useContext(DatabaseViewContext)
	const active_view = context.views.find(view => view.name === context.selected_view)!

	return rows.filter((row ) =>
		Object.entries(row).find(([key, property]) => {
			return typeof property === 'string'
				? property.toLowerCase().includes(active_view.search.value.toLowerCase())
				: false
		})
	)
}