import { filterProps, useMantineTheme } from '@mantine/core';

export function useProps<T extends Record<string, any>, U extends Partial<T> = {}>(
	component: string,
	defaultProps: U,
	props: T
): T & {
	[Key in Extract<keyof T, keyof U>]-?: U[Key] | NonNullable<T[Key]>;
} {
	const theme = useMantineTheme();
	const contextPropsPayload = theme.components[component]?.defaultProps;
	const contextProps = typeof contextPropsPayload === 'function' ? contextPropsPayload(theme) : contextPropsPayload;

	return { ...defaultProps, ...contextProps, ...filterProps(props) };
}
