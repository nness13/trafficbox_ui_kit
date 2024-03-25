import React, {FC, useEffect} from 'react'
import {DatabaseViewProps} from '@/components/DatabaseView/DatabaseViewTypes'
import {ViewSwitcherPanel} from '@/components/DatabaseView/ViewPanel/ViewSwitcherPanel'
import {views} from "@/components/DatabaseView/Views/views";
import {ActiveViewState, DatabaseViewState, DatabaseViewStore} from "@/components/DatabaseView/DatabaseViewStore";
import {observer} from "mobx-react-lite";
import '../../globals.css'
import { ActionMenuProvider } from '@/components/DatabaseView/Views/ColumnCase/ActionMenuContext'

export const DatabaseView: FC<DatabaseViewProps> = observer((props) => {
	const view = ActiveViewState()
	const View = views[view?.type!]

	useEffect(() => {
		if(props.handleChange) props.handleChange(DatabaseViewState)
	}, [])

	useEffect(() => {
		if(view) {
			DatabaseViewState.set_init_values({
				columns: props.columns,
				rows: props.rows
			})
		}
	}, [props.columns, props.rows])

	return (
		<>
			<ActionMenuProvider store={{
				loadData: props.loadData,
				createRow: props.createRow,
				updateRow: props.updateRow,
				deleteRow: props.deleteRow,
			}}>
				<ViewSwitcherPanel/>
			</ActionMenuProvider>
			{view && View
				? <View
					key={view.id}
					store={view}
					{...props}
				/>
				: null
			}
		</>
	)
})