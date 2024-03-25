import { Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react'
import React from 'react'
import cn from 'classnames'
import { HiArchiveBoxArrowDown, HiPlus, HiTrash } from 'react-icons/hi2'
import { observer } from 'mobx-react-lite'
import { useActionMenuContext } from '@/components/DatabaseView/Views/ColumnCase/ActionMenuContext'
import { useViewContext } from '@/components/DatabaseView/Views/TableView/ViewContext'

export const ActionMenuPopover = observer(( props: { children: React.ReactNode } ) => {
	const actionMenuContext = useActionMenuContext()
	const viewContext = useViewContext()
	const onArchive = () => {}
	const onDelete = () => {}


	return (
		<Popover placement="bottom-start">
			<PopoverHandler>
				<div className={'flex justify-center items-center'}>
					{props.children}
				</div>
			</PopoverHandler>
			<PopoverContent className="w-96 z-30 flex flex-col gap-5 p-2 bg-foreground border-none shadow-2xl shadow-gray-800" placeholder={""}>
				<div className="relative overflow-visible">
					{/*<CreateEntityPopover>*/}
						<ActionMenuItem>
							<HiPlus className="w-5 h-5"/>
							<div>Створити</div>
						</ActionMenuItem>
					{/*</CreateEntityPopover>*/}

					<ActionMenuItem onClick={onArchive}>
						<HiArchiveBoxArrowDown className="w-5 h-5"/>
						<div>Архівувати</div>
					</ActionMenuItem>

					<ActionMenuItem onClick={onDelete}>
						<HiTrash className="w-5 h-5"/>
						<div>Видалити</div>
					</ActionMenuItem>

					{actionMenuContext.actionMenu && actionMenuContext.actionMenu(viewContext) }
				</div>
			</PopoverContent>
		</Popover>
	)
})

export const ActionMenuLine = () => {
	return (
		<div className="border border-b-2 border-border_line"/>
	)
}

type propsType = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const ActionMenuItem = ({ className = '', ...rest_props }: propsType) =>
	<div
		{...rest_props}
		className={cn(
			className,
			`flex flex-row gap-2`,
			`py-1 px-2`,
			`rounded-md
			text-text_passive
			cursor-grab
			dark:hover:text-btn_text
			hover:bg-opacity-50
			hover:bg-gray-300
			`
		)}
	/>