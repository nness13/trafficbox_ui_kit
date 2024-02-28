import React, {FC} from 'react'
import {DatabaseViewProps} from '@/components/DatabaseView/DatabaseViewTypes'
import {ViewSwitcherPanel} from '@/components/DatabaseView/ViewPanel/ViewSwitcherPanel'
import {views} from "@/components/DatabaseView/Views/views";
import {ActiveViewState} from "@/components/DatabaseView/DatabaseViewStore";
import {observer} from "mobx-react-lite";
import '../../globals.css'

export const DatabaseView: FC<DatabaseViewProps> = observer((props) => {
	const view = ActiveViewState()
	const View = views[view?.type!]

	return (
		<>
			<ViewSwitcherPanel/>
			{view && View
				? <View
					key={view.id}
					store={view}
					rows={props.rows}
					columns={props.columns}
				/>
				: null
			}
		</>
	)
})