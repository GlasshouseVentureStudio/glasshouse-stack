export interface ButtonProps {
	children: React.ReactNode;
}

export function Button(props: ButtonProps) {
	return <button type='button'>{props.children}</button>;
}

Button.displayName = 'Button';
