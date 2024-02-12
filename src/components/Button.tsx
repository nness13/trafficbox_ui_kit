import React, { FC, HTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
}

export const Button: FC<ButtonProps> = ({ children }) => {
	return <div>{children}</div>;
};
