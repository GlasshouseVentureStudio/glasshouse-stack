import { type CompoundFactoryPayload, type StaticComponents } from '../types';

/**
 * Creates a compound React component by attaching static components and properties.
 *
 * This factory function takes a base React functional component and augments it with additional static components and properties as defined in the `Payload['components']`. This allows for the creation of complex, compound components with nested sub-components.
 *
 * @template Payload - The payload type that extends `CompoundFactoryPayload`, containing `props` and `components`.
 * @param {React.FunctionComponent<Payload['props']>} component - The base React functional component to be enhanced.
 * @returns The augmented component type that includes both the base component functionality and the attached static components and properties.
 */
export const compoundFactory = <Payload extends CompoundFactoryPayload>(
	component: React.FunctionComponent<Payload['props']>
) => {
	type ComponentFunction = (props: Payload['props']) => React.ReactElement;

	type ComponentProperties = React.FunctionComponent<Payload['props']>;

	type ComponentType = ComponentFunction & ComponentProperties & StaticComponents<Payload['components']>;

	// Cast the component to ComponentType to include static components and properties
	const Component = component as ComponentType;

	return Component;
};
