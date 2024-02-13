import React, { FC, HTMLAttributes, ReactNode } from 'react';

type ButtonPropsType = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const Button: FC<ButtonPropsType> = ({ className, ...rest_props }) => {
	return (
		<button
			{...rest_props}
			className={className + `
				w-fit
				p-2
				rounded
				text-center
				text-base
				font-bold
				cursor-pointer
				bg-primary
				hover:bg-primary2
				text-btn_text
				flex flex-row items-center justify-center
			`}
		/>
	)
};
