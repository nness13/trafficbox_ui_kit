import { HiMagnifyingGlass } from 'react-icons/hi2'
import React, { useContext, useState } from 'react'
import { Input } from '@material-tailwind/react'
import { TableViewContext, useTableViewContext } from '@/components/DatabaseView/Views/TableView/TableViewContext'
import { Tab } from '@/components/Buttons/Tab'
import { TableViewContextProps } from '@/components/DatabaseView/Views/TableView/TableViewTypes'
import { DatabaseViewContext } from '@/components/DatabaseView/DatabaseViewContext'

export function SearchInput () {
	const context = useTableViewContext()
	const [status, set_status] = useState(true)
	const on_search = (e: any) => {
		context.actions.set_search(e.currentTarget.value)
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
						value={context.search.value}
						onChange={on_search}
						autoFocus
						onBlur={() => context.search.value.length === 0 && set_status(true)}
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
	const context = useTableViewContext()

	return rows.filter((row ) =>
		Object.entries(row).find(([key, property]) => {
			return typeof property === 'string'
				? property.toLowerCase().includes(context.search.value.toLowerCase())
				: false
		})
	)
}