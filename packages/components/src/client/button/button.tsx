import { Button as MantineButton } from '@mantine/core';

export interface ButtonProps {
	children: React.ReactNode;
}

export function Button(props: ButtonProps) {
	return <MantineButton {...props}>{props.children}</MantineButton>;
}

Button.displayName = 'Button';
