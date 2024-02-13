import React from 'react'

type propsButtonType = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const LightBlueTag = ({ className = '', ...rest_props }: propsButtonType) =>
	<button
		{...rest_props}
		className={className + `
	    inline-flex
				items-center
				gap-1
				whitespace-nowrap
				select-none
				transition
				duration-200
				ease-in
				cursor-pointer
				text-blue-500
				bg-blue-300
				bg-opacity-10
				border
				border-blue-200
				rounded-2xl
				h-6
				leading-6
				px-2
		`}
	/>