import {ViewPopoverEditor} from '@/components/DatabaseView/ViewPanel/ViewPopoverEditor'
import {Tab} from '@/components/Buttons/Tab'
import {ViewsIcon} from '@/components/DatabaseView/Views/ViewIcon'
import {ViewPopoverCreator} from '@/components/DatabaseView/ViewPanel/ViewPopoverCreator'
import {HiArrowPath, HiCheck, HiPlus} from 'react-icons/hi2'
import React, { memo, useEffect } from 'react'
import { ActiveViewState, DatabaseViewState } from '@/components/DatabaseView/DatabaseViewStore'
import {observer} from "mobx-react-lite";
import {Tooltip} from "@material-tailwind/react";
import {date_format, datetime_format} from "@/config/consts";
import moment from "moment";
import { useActionMenuContext } from '@/components/DatabaseView/Views/ColumnCase/ActionMenuContext'
import { paginationType } from '@/components/DatabaseView/DatabaseViewTypes'
import { toJS } from 'mobx'

export const ViewSwitcherPanel = observer(() => {
    const actionMenuContext = useActionMenuContext()
    const view = ActiveViewState()
    const onLoad = () => {
        if(actionMenuContext.loadData && view) {
            const pagination: paginationType = {
                current_page: view.pagination.current,
                page_size: view.pagination.pageSize,
                filters: view.filters,
                sort: view.sort
            }
            actionMenuContext.loadData(pagination)
        }
    }
    useEffect(() => {
        onLoad()
    }, [])

    return (
        <div className="flex justify-between">
            <div className="flex">
                {DatabaseViewState.views.map(view => {
                    const is_select = view.id === DatabaseViewState.selected_view
                    return (
                        <ViewPopoverEditor
                            key={view.id}
                            isActive={is_select}
                        >
                            <Tab
                                className={`${is_select ? 'text-text_passive border-b-2 border-solid border-gray-900 dark:border-[#4e4d4b]' : ''}`}
                                onClick={() => DatabaseViewState.on_select_view(view.id)}
                            >
                                <ViewsIcon type={view.type}/>
                                {view.name}
                            </Tab>
                        </ViewPopoverEditor>
                    )
                })}
                <ViewPopoverCreator>
                    <Tab>
                        <HiPlus className="h-5 w-5"/>
                    </Tab>
                </ViewPopoverCreator>
            </div>
			<div>
				<Tab
					onClick={onLoad}// onLoad
					className={DatabaseViewState.viewChanged ? "bg-light-green-600 hover:bg-light-green-700 hover:bg-opacity-100" : ""}
				>
					<Tooltip content={`Остання загрузка: ${moment(DatabaseViewState.last_load_database_datetime).format(datetime_format)}`}>
						<div className={"flex flex-row gap-2"}>
                            Остання загрузка: {moment(DatabaseViewState.last_load_database_datetime).format(datetime_format)}
                            {DatabaseViewState.viewChanged
                                ? <HiCheck className="h-5 w-5 text-white"/>
                                : <HiArrowPath className="h-5 w-5"/>
                            }
                        </div>

					</Tooltip>
				</Tab>
			</div>
        </div>
    )
})