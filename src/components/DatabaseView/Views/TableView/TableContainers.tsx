import React from 'react'
import { Checkbox, CheckboxProps } from '@material-tailwind/react'

type propsType = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
type propsType2 = React.DetailedHTMLProps<React.HTMLAttributes<HTMLOListElement>, HTMLOListElement>

export const TableContainer = ({ className = '', ...rest_props }: propsType) =>
	<div
		{...rest_props}
		className={className+`
			table
			h-1
			min-w-full
		`}
	/>


export const TableRowContainer = ({ className = '', ...rest_props }: propsType) =>
	<div
		{...rest_props}
		className={className+`
			table-row
			h-full
		`}
	/>

export const TableCell = ({ className = '', ...rest_props }: propsType2) =>
	React.createElement('ol', {
		...rest_props,
		className: className+
			`
				table-cell
				border-b
				border-r
				border-border_line
				cursor-pointer
				h-full
				align-top
			`
})

export const TableCellItem = ({ className = '', ...rest_props }: propsType) =>
	<div
		{...rest_props}
		className={className+`
			flex
			flex-row
			items-center
			gap-2
			h-full
		  min-h-[24px]
		  px-2
		`}
	/>

export const TableCheckbox = ({ className = '', ...rest_props }: CheckboxProps) =>
	<Checkbox
		{...rest_props}
		ref={null}
		ripple={false}
		className={className+'h-4 w-4 hover:before:rounded-md before:w-8 before:h-8'}
		crossOrigin={undefined}
	/>