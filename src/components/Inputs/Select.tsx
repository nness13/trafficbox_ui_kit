import React, { useState } from 'react'
import { HiChevronDown, HiEllipsisHorizontal, HiEllipsisVertical, HiXMark } from 'react-icons/hi2'

export type select_option_type = { key: string | number, value: string | number, label: string | number, description?: string }
type propsType = {
	value: select_option_type[]
	options: select_option_type[],
	onSelect: ( data: select_option_type[] ) => any,
	label?: string
	multiply: boolean
}

export const SelectWithBorder = (props: propsType) => (
	<div className="border border-solid border-gray-500 rounded-lg flex items-center cursor-pointer">
		<Select {...props}/>
		<HiChevronDown className="h-5 w-5"/>
	</div>
)

export function Select( props: propsType ) {
	const [edit_mode, set_edit_mode] = useState( false )
	const options_default = getOptions(props)
	const [selected_options, set_selected_options] = useState(options_default)
	const onClick = (status: boolean) => () => set_edit_mode(status)
	const close_edit_mode = onClick(false)
	const label = props.label || "Empty"

	return (
		<div
			className="w-full h-full relative z-1 font-sans text-base"
			tabIndex={0}
			// onBlur={close_edit_mode}
		>
			<View
				{...props}
				edit_mode={edit_mode}
				set_edit_mode={set_edit_mode}
				label={label}
				selected_options={options_default}
				set_selected_options={set_selected_options}
			/>
			{edit_mode &&
				<EditView
					{...props}
					edit_mode={edit_mode}
					set_edit_mode={set_edit_mode}
					label={label}
					selected_options={selected_options}
					set_selected_options={set_selected_options}
				/>
			}
		</div>
	)
}
type view_props_type = {
	edit_mode: boolean,
	set_edit_mode:  React.Dispatch<React.SetStateAction<boolean>>,
	selected_options: select_option_type[]
	label?: string
	set_selected_options: Function
}
function View ( props: propsType & view_props_type ) {
	const onClick = (status: boolean) => (e: any) => !e.ctrlKey && props.set_edit_mode(status)
	const set_edit = onClick(true)
	return (
		<div className="p-2 w-full min-h-[24px] flex items-center gap-2 overflow-hidden" onClick={set_edit}>
			{props.selected_options.length === 0 &&
				<div>{"Empty"}</div>
			}
			{props.selected_options.map((option, key) => (
				<Tag key={key}>{ option?.label }</Tag>
			))}
		</div>
	)
}

function EditView ( props: propsType & view_props_type ) {
	const onClick = (status: boolean) => () => props.set_edit_mode(status)
	const onclick_icon = (e: any) => {
		e.preventDefault()
		e.stopPropagation()
	}

	const onSelect = ( values: select_option_type[] ) => () => {
		props.set_selected_options(values)
		props.onSelect(values)
		onClick(false)()
	}
	const onSelectOne = (option: select_option_type) => onSelect([option])
	const onSelectPush = (option: select_option_type) => onSelect([...props.selected_options, option])
	const onSelectRemove = (option: select_option_type) => {
		const filter_options = props.selected_options.filter(o => o.value !== option.value )
		return onSelect(filter_options)
	}

	return (
		<SelectList>
			<SelectEditableOptions>
				{props.selected_options.length === 0 &&
					<div>{"Empty"}</div>
				}
				{props.selected_options.map((option, key) => (
					<Tag key={key}>
						<div>{ option?.label }</div>
						<HiXMark className="h-5 w-5" onClick={onSelectRemove(option)}/>
					</Tag>
				))}
			</SelectEditableOptions>
			<OptionsContainer>
				{/*<Tip>Виберіть опцію або створіть її</Tip>*/}
				{props.options.map(option => (
					<SelectOption
						key={option.key}
						onClick={ props.multiply ? onSelectPush(option) : onSelectOne(option) }
					>
						<HiEllipsisVertical className="h-5 w-5" onClick={onclick_icon}/>
						<TagsRow>
							<Tag>{ option.label }</Tag>
						</TagsRow>
						<HiEllipsisHorizontal className="h-5 w-5" onClick={onclick_icon} />
					</SelectOption>
				))}
			</OptionsContainer>
		</SelectList>
	)
}



export type container_props_type = { children: React.ReactNode } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const SelectList = ({className = '', ...rest_props}: container_props_type) =>
	<div
		{...rest_props}
		className={className+`
			absolute
			z-10
			top-0
			left-0
			shadow-2xl
			bg-foreground
			min-w-[300px]
			w-full
			rounded-md
			overflow-hidden
		`}
	/>


const SelectEditableOptions = ({className = '', ...rest_props}: container_props_type) =>
	<div
		{...rest_props}
		className={className+`
			p-2
			w-full
			flex
			items-center
			gap-2
			overflow-hidden
			bg-gray-300
			bg-opacity-50
		`}
	/>

const OptionsContainer = ({className = '', ...rest_props}: container_props_type) =>
	<div
		{...rest_props}
		className={className+`
			
		`}
	/>

const SelectOption = ({className = '', ...rest_props}: container_props_type) =>
	<div
		{...rest_props}
		className={className+`
			flex
			my-1
			py-1
			px-2
			hover:bg-opacity-50
			hover:bg-gray-300
			cursor-grab
		`}
	/>

const TagsRow = ({className = '', ...rest_props}: container_props_type) =>
	<div
		{...rest_props}
		className={className+`
			w-full
			flex
			flex-row	
		`}
	/>
const Tag = ({className = '', ...rest_props}: container_props_type) =>
	<div
		{...rest_props}
		className={className+`
			w-auto
			bg-blue-500
			text-white
			px-2
			rounded-md
			whitespace-nowrap
			flex
			items-center
			overflow-hidden
			cursor-pointer
		`}
	/>

function getOptions (props: propsType ): select_option_type[] {
	return props.options.filter( option => props.value.find(val => option.value === val.value) )
}