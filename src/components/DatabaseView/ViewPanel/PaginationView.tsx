import React, {useEffect} from 'react'
import {HiChevronLeft, HiChevronRight} from 'react-icons/hi2'
import {Option, Select} from '@material-tailwind/react'
import {useViewContext} from "@/components/DatabaseView/Views/TableView/ViewContext";
import {observer} from "mobx-react-lite";

export const PaginationPanel = observer(() => {
	const viewContext = useViewContext()
	const allPages = Math.floor(viewContext.pagination.total / viewContext.pagination.pageSize) + 1
	const change_page_size = (value: any ) => {
		viewContext.set_pagination({ pageSize: Number.parseInt(value) })
	}
	const onChangePage = (value: number ) => {
		viewContext.set_pagination({ current: value })
	}

	useEffect(() => {
		// onLoad()
	}, [viewContext.pagination.current, viewContext.pagination.pageSize])

	return (
		<div className="flex flex-row items-center gap-4 m-2">
			<div className="flex flex-row text-sm">
				<BackButton
					current={viewContext.pagination.current}
					set_page={onChangePage}
				/>
				{[-2, -1].map(num =>
					<PrevPageNumButton
						key={num}
						num={num}
						current={viewContext.pagination.current}
						set_page={onChangePage}
					/>
				)}
				<div className="bg-primary text-white shadow-md rounded-lg py-2 px-4 cursor-pointer">
					{viewContext.pagination.current}
				</div>
				{[1, 2].map(num =>
					<NextPageNumButton
						key={num}
						num={num}
						current={viewContext.pagination.current}
						set_page={onChangePage} allPages={allPages}
					/>
				)}
				<NextButton
					current={viewContext.pagination.current}
					set_page={onChangePage}
					allPages={allPages}
				/>
			</div>
			<div className="flex flex-row items-center gap-2">
				<div>
					<Select
						label="PageSize"
						value={viewContext.pagination.pageSize.toString()}
						onChange={change_page_size}
						placeholder={""}
					>
						{viewContext.pagination.pageSizeOptions.map((option, key) =>
							<Option key={key} value={option.toString()}>
								{option}
							</Option>
						)}
					</Select>
				</div>
				<div>
					{viewContext.pagination.pageSize * (viewContext.pagination.current - 1)} - {viewContext.pagination.current * viewContext.pagination.pageSize} з {viewContext.pagination.total} |
				</div>
				<div>
					Selected: {viewContext.selected.length}
				</div>
			</div>
		</div>
	)
})


const BackButton = observer((props: { current: number, set_page: any }) => {
	const {current, set_page} = props
	const is_active = current > 1
	return (
		<div
			onClick={() => is_active ? set_page(current - 1) : null}
			className={`bg-border_line py-2 px-3 cursor-pointer rounded-l-lg text-silver ${is_active ? "text-black" : ""}`}
		>
			{/*{"<"}*/}
			<HiChevronLeft className="h-5 w-5"/>
		</div>
	)
})

const NextButton = observer((props: { allPages: number, current: number, set_page: any }) => {
	const {allPages, current, set_page} = props
	const is_active = allPages > current
	return (
		<div
			className={`bg-border_line py-2 px-3 cursor-pointer rounded-r-lg text-silver ${is_active ? "text-black" : ""}`}
			onClick={() => is_active ? set_page(current + 1) : null}
		>
			<HiChevronRight className="h-5 w-5"/>
		</div>
	)
})

const PrevPageNumButton = observer((props: { num: number, current: number, set_page: any }) => {
	const {num, current, set_page} = props
	if (0 < current + num)
		return (
			<div
				className="shadow-md rounded-lg py-2 px-4 cursor-pointer"
				onClick={() => set_page(current + num)}
			>
				{current + num}
			</div>
		)
	else return null
})

const NextPageNumButton = observer((props: { num: number, allPages: number, current: number, set_page: any }) => {
	const {num, current, set_page, allPages} = props
	if (allPages >= current + num)
		return (
			<div
				className="shadow-md rounded-lg py-2 px-4 cursor-pointer"
				onClick={() => set_page(current + num)}
			>
				{current + num}
			</div>
		)
	else return null
})