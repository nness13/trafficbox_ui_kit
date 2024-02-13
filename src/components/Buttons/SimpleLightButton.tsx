import React from 'react'

type propsButtonType = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const SimpleLightButton = ({ className = '', ...rest_props }: propsButtonType) =>
	<button
		{...rest_props}
		className={className + `
	    flex
			flex-row
			items-center
			cursor-pointer
			p-2
			rounded-md
			text-text_passive
			hover:bg-gray-500
			hover:bg-opacity-20
		`}
	/>