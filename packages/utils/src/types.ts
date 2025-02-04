import { type ClassValue } from 'tailwind-variants';

/**
 * This Typescript utility transform a list of slots into a list of `{ [slot]: classes }`
 */
export type SlotsToClasses<S extends string> = Partial<Record<S, ClassValue>>;

export type OmitComponentProps<C, O extends keyof Record<string, unknown> = never> = Omit<C, O>;

export type AnyObject = Record<PropertyKey, unknown>;

/* eslint-disable @typescript-eslint/no-explicit-any -- safe for generic helper types */

/**
 * Defines a type that ensures the input is a record with string keys.
 * If the input type `Input` extends `Record<string, any>`, it retains `Input`.
 * Otherwise, it defaults to an empty record with no properties.
 *
 * @template Input - The input type to be validated.
 */
export type StaticComponents<Input> = Input extends Record<string, any> ? Input : Record<string, never>;

/**
 * Represents the payload structure for a compound factory.
 * It includes properties and components necessary for creating compound components.
 *
 * @interface CompoundFactoryPayload
 * @property {Record<string, any>} props - The properties to be passed to the compound component.
 * @property {Record<string, any>} components - The sub-components that make up the compound component.
 */
export interface CompoundFactoryPayload {
	props: Record<string, any>;
	components: Record<string, any>;
}

/**
 * Type alias for a compound factory that adheres to the `CompoundFactoryPayload` structure.
 * Ensures that the `Payload` provided extends the `CompoundFactoryPayload` interface.
 *
 * @template Payload - The payload type that must extend `CompoundFactoryPayload`.
 */
export type CompoundFactory<Payload extends CompoundFactoryPayload> = Payload;
