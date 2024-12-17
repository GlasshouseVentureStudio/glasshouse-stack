import { type ClassValue } from 'tailwind-variants';

/**
 * This Typescript utility transform a list of slots into a list of `{ [slot]: classes }`
 */
export type SlotsToClasses<S extends string> = Partial<Record<S, ClassValue>>;

export type OmitComponentProps<C, O extends keyof Record<string, unknown> = never> = Omit<C, O>;

export type AnyObject = Record<PropertyKey, unknown>;
