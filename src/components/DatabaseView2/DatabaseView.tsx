import React, {FC} from 'react'
import {DatabaseViewProps} from '@/components/DatabaseView2/DatabaseViewTypes'
import {ViewSwitcherPanel} from '@/components/DatabaseView2/ViewPanel/ViewSwitcherPanel'
import {views} from "@/components/DatabaseView2/Views/views";
import {ActiveViewState} from "@/components/DatabaseView2/DatabaseViewStore";
import {observer} from "mobx-react-lite";


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