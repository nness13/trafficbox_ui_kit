import { FC } from 'react'
import { ViewStateType } from '@/components/DatabaseView/Views/TableView/TableViewTypes'
import { ViewStateActions } from '@/components/DatabaseView/Views/TableView/TableViewTypes'
import {views} from "@/components/DatabaseView/Views/views";
import {StoreApi, UseBoundStore} from "zustand";
import {useViewStore} from "@/components/DatabaseView/Views/ViewStore";

export type DatabaseViewProps = Partial<DatabaseViewStateType> & {
	rows: RowType[]
	columns: ColumnType[]
}

export type RowType = Record<string, any>
export type ColumnType = {
	key: string;
	label: string;
	type: {
		type: string;
		description: string;
	};
}

export type ViewTypesType = keyof typeof views


export type ColumnCase = Record<string, { Icon: FC<any> }>

export type DatabaseViewStateType = {
	selected_view: string,
	columns: ColumnType[],
	rows: RowType[],
	views: ReturnType<typeof useViewStore>[],
}
export type DatabaseViewActionsType = {
	on_select_view: (payload?: any) => void
	on_create_view: (type: ViewTypesType) => void
	on_edit_view: (payload: {name: string}) => void
	on_delete_view: (id: string) => void
}

export type DatabaseViewStateAndActionsType = DatabaseViewStateType & DatabaseViewActionsType