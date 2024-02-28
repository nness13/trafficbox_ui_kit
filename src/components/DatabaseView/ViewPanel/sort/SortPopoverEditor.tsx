import React from 'react'
import {Popover, PopoverContent, PopoverHandler} from '@material-tailwind/react'
import {useViewContext} from "@/components/DatabaseView/Views/TableView/ViewContext";
import {observer} from "mobx-react-lite";
import {SelectWithBorder} from "@/components/Inputs/Select";
import {SimpleLightButton} from "@/components/Buttons/SimpleLightButton";
import {HiEllipsisVertical, HiTrash} from "react-icons/hi2";
import {sortType} from "@/components/DatabaseView/DatabaseViewTypes";

export const SortPopoverEditor = observer(( props: { children: React.ReactNode, sort: sortType } ) => {
	const active_view = useViewContext()

	return (
		<Popover placement="bottom-start">
			<PopoverHandler>
				<div>
					{props.children}
				</div>
			</PopoverHandler>
			<PopoverContent className="w-96 z-30 flex flex-col gap-5 p-2 bg-foreground border-none" placeholder={""}>
				<div className="flex flex-col gap-2">
					<div className="flex flex-row justify-between">
						<div className="flex flex-row gap-2 items-center">
							<div>{props.sort.column.label}</div>
							{/*<LightBlueTag>{props.sort.value}</LightBlueTag>*/}
							<SelectWithBorder
								multiply={false}
								value={[props.sort.value].map(el => ({key: el, value: el, label: el}))}
								options={["ascending", "descending"].map(el => ({key: el, value: el, label: el}))}
								onSelect={(data) => active_view.update_sort({
									id: props.sort.id,
									value: data[0]?.value as typeof props.sort.value
								})}
							/>
						</div>
						<div className="flex flex-row">
							<SimpleLightButton>
								<HiEllipsisVertical className="h-5 w-5"/>
							</SimpleLightButton>
							<SimpleLightButton onClick={() => active_view.remove_sort(props.sort.id)}>
								<HiTrash className="h-5 w-5"/>
							</SimpleLightButton>
						</div>
					</div>

				</div>
			</PopoverContent>
		</Popover>
	)
})