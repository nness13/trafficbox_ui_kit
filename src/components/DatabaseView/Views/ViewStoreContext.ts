import {createContext, useContextSelector} from "use-context-selector";
import {ViewStateType} from "@/components/DatabaseView/Views/TableView/TableViewTypes";
import {v4 as uuid_v4} from "uuid";
import {DefaultColumnCase} from "@/components/DatabaseView/ColumnCase";
import {ViewTypesType} from "@/components/DatabaseView/DatabaseViewTypes";
import produce from "immer";
import {useSimpleReducer} from "use_reducer_simple_syntax";
import {ActionsType} from "@/components/Utils";


type viewType = ViewStateType & typeof actions
const initialState = (type: ViewTypesType = "table"): ViewStateType => ({
    id: uuid_v4(),  // unique property
    name: type,  // unique property
    type: type,
    column_case: DefaultColumnCase,
    columns: [],
    rows: [],
    actionMenu: "",
    search:  {
        value: ""
    },
    filters: [],
    sort: [],
    groups: [],
    selected: [],
    pagination: {
        total: 0,
        current: 1,
        position: "bottom",
        pageSize: 10,
        pageSizeOptions: [2, 10, 20, 50, 100, 200, 400, 500, 1000],
        showSizeChanger: false,
    },

    filter_panel_status: false,
    sort_panel_status: false,
    groups_panel_status: false,
})

const actions = {
    setStatus: (payload: boolean) => (state: ViewStateType) => produce(state, draft => {
        draft.name = state.name+"1"
    }),
    on_edit_view: ({name}: {name: string}) => (state: ViewStateType) => produce(state, draft => {
        draft.name = name
    }),
    onSelect: (selected: string[]) => (state: ViewStateType) => produce(state, draft => {
        draft.selected = selected
    }),
    toggle_filter_panel_status: (status: boolean) => (state: ViewStateType) => produce(state, draft => {
        draft.filter_panel_status = status
    }),
    toggle_group_panel_status: (status: boolean) => (state: ViewStateType) => produce(state, draft => {
        draft.groups_panel_status = status
    }),
    toggle_sort_panel_status: (status: boolean) => (state: ViewStateType) => produce(state, draft => {
        draft.sort_panel_status = status
    }),
    onEditRow: (data: any) => (state: ViewStateType) => produce(state, draft => {
        console.log(data)
    })
} satisfies ActionsType<ViewStateType>

export const useViewReducer = () => useSimpleReducer(
    initialState(),
    actions
)

export const ViewReducerContext = createContext<viewType>({
    ...initialState(),
    ...actions
})
export const  useViewContextReducer =
    <Selected>(selector: (state: viewType) => Selected) =>
        useContextSelector(ViewReducerContext, selector)