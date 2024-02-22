import React, {FC, memo} from 'react'
import {DatabaseViewProps} from '@/components/DatabaseView/DatabaseViewTypes'
import {ViewSwitcherPanel} from '@/components/DatabaseView/ViewPanel/ViewSwitcherPanel'
import {useDatabaseViewStore} from '@/components/DatabaseView/DatabaseViewStore'
import {views} from "@/components/DatabaseView/Views/views";


export const DatabaseView: FC<DatabaseViewProps> = memo((props) => {
	const database_views = useDatabaseViewStore(state => state.views)
	console.log(database_views)

	return (
		<>
			<ViewSwitcherPanel/>
			{database_views.map(view => {
				const View = views[view.type]

				return (
					<View
						{...view}
						key={view.id}
						rows={props.rows}
						columns={props.columns}
					/>
				)
			})}
		</>
	)
})