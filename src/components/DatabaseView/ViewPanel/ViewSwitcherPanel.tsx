import {ViewPopoverEditor} from '@/components/DatabaseView/ViewPanel/ViewPopoverEditor'
import {Tab} from '@/components/Buttons/Tab'
import {ViewsIcon} from '@/components/DatabaseView/Views/ViewIcon'
import {ViewPopoverCreator} from '@/components/DatabaseView/ViewPanel/ViewPopoverCreator'
import {HiArrowPath, HiCheck, HiPlus} from 'react-icons/hi2'
import React, {memo} from 'react'
import {DatabaseViewState} from "@/components/DatabaseView/DatabaseViewStore";
import {observer} from "mobx-react-lite";
import {Tooltip} from "@material-tailwind/react";
import {date_format, datetime_format} from "@/config/consts";
import moment from "moment";

export const ViewSwitcherPanel = observer(() => {

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
					onClick={() => {} }// onLoad
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