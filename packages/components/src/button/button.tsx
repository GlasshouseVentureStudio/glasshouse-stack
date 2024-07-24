import { Button as MantineButton, type ButtonProps as MantineButtonProps } from '@mantine/core';

/**
 * Props for the Button component.
 */
export interface ButtonProps
	extends Omit<React.ComponentPropsWithoutRef<'button'>, 'color' | 'style'>,
		MantineButtonProps {
	/**
	 * The children of the button component.
	 */
	children: React.ReactNode;
}

/**
 * Renders a button component.
 */
export function Button(props: ButtonProps) {
	return <MantineButton {...props}>{props.children}</MantineButton>;
}

Button.displayName = 'Button';
