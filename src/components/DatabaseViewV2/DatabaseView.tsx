import React, { FC, memo } from 'react'
import { DatabaseViewProps } from '@/components/DatabaseViewV2/DatabaseViewTypes'
import { ViewSwitcherPanel } from '@/components/DatabaseViewV2/ViewPanel/ViewSwitcherPanel'
import { useDatabaseViewStore } from '@/components/DatabaseViewV2/DatabaseViewStore'
import { TableView } from '@/components/DatabaseViewV2/Views/TableView/TableView'
import { CardView } from '@/components/DatabaseView/Views/CardView'
import { DatabaseViewStateType } from '@/components/DatabaseView/DatabaseViewTypes'


const views = {
	table: TableView,
	card: CardView,
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