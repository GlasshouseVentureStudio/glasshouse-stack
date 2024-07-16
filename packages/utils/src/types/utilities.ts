import { type ClassValue } from 'tailwind-variants';

/**
 * This Typescript utility transform a list of slots into a list of `{ [slot]: classes }`
 */
export type SlotsToClasses<S extends string> = {
	[key in S]?: ClassValue;
};

export type OmitComponentProps<C, O extends keyof any = never> = Omit<C, O>;
