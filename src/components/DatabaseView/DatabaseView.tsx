import React, {FC, memo} from 'react'
import {DatabaseViewProps, DatabaseViewStateType} from '@/components/DatabaseView/DatabaseViewTypes'
import {ViewSwitcherPanel} from '@/components/DatabaseView/ViewPanel/ViewSwitcherPanel'
import {useDatabaseViewStore} from '@/components/DatabaseView/DatabaseViewStore'
import {TableView} from '@/components/DatabaseView/Views/TableView/TableView'


const views = {
	table: TableView,
	card: () => <div/>,
} satisfies Record<NonNullable<DatabaseViewStateType["selected_view"]>, any>

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