import React, { memo } from 'react'

type propsType = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const Tab = memo(({ className = '', ...rest_props }: propsType) =>
	<div
		{...rest_props}
		className={className+`
			flex
			flex-row
			items-center
			cursor-pointer
			p-2
			h-full
			rounded-tl-md
			rounded-tr-md
			text-text_passive
			hover:bg-gray-500
			hover:bg-opacity-20
		`}
	/>)