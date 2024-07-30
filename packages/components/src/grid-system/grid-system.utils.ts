import { keys, px, type StyleProp } from '@mantine/core';

import { type BaseGridSystemProps } from './grid-system.types';

export const getBreakpoints = (values: unknown) => {
	if (typeof values === 'object' && values !== null) {
		return keys(values);
	}

	return [];
};

const sortBreakpoints = (breakpoints: string[]) => {
	return breakpoints.sort((a, b) => (px(a) as number) - (px(b) as number));
};

export const getUniqueBreakpoints = ({ columns, rows }: BaseGridSystemProps) => {
	const breakpoints = Array.from(new Set([...getBreakpoints(columns), ...getBreakpoints(rows)]));

	return sortBreakpoints(breakpoints);
};

type GridPosition = number | string | [number, number];

export const convertToGridPositionString = (position: GridPosition): string => {
	if (typeof position === 'number') {
		return position < 0 ? `span 1 / ${position}` : `${position} / span 1`;
	}

	if (Array.isArray(position)) {
		return `${position[0]}/${position[1]}`;
	}

	if (!position) {
		throw new Error("Failed to convert 'GridPosition' to 'string'");
	}

	return position;
};

export const convertToGridPositionNumber = (position: GridPosition): number | 'auto' => {
	if (typeof position === 'number') {
		return 1;
	}

	if (Array.isArray(position)) {
		return position[1] - position[0];
	}

	if (!position) {
		throw new Error("Failed to convert 'GridPosition' to 'number'");
	}

	if (position === 'auto') {
		return 'auto';
	}

	const [start, end] = position.split('/');

	return Number(end) - Number(start);
};

export const convertToSpan = (
	position?: number | string | [number, number] | null,
	totalColumns?: string | number | null
): [number, number] | null | undefined => {
	if (typeof position === 'number') {
		return position < 0 ? [1, position] : [position, position + 1];
	}

	if (position === 'auto' || !position) {
		throw new Error("Failed to convert 'GridPosition' to 'Span', got auto or undefined");
	}

	if (typeof position === 'string') {
		const [start, end] = position.split('/');
		const startNum = Number(start);
		const endNum = Number(end);

		return (startNum > 0 || startNum < 0) && Number.isNaN(endNum)
			? convertToSpan(startNum, totalColumns)
			: convertToSpan([startNum, endNum], totalColumns);
	}

	let [start, end] = position;

	if (start < 0 && totalColumns) {
		start = (totalColumns as number) + start;
	}

	if (end < 0 && totalColumns) {
		end = (totalColumns as number) + 2 + end;
	}

	return [start, end];
};

export const formatGridSize = (size: string | number): string => {
	if (size === 'fit-content' || size === 'auto') {
		return 'fit-content';
	}

	if (typeof size === 'number') {
		return `${size}px`;
	}

	if (size.includes('var(') && size.includes(')')) {
		return size;
	}

	return 'calc(var(--width) / var(--grid-columns) * var(--grid-rows))';
};

export const mergeGridProps = (
	value: StyleProp<string | number>,
	mergeFn: typeof convertToSpan,
	values: StyleProp<number>
) => {
	const restricted1 = restrictResponsiveProp(value);
	const restricted2 = restrictResponsiveProp(values);

	const base = mergeFn(restricted1.base, restricted2.base);
	const xs = mergeFn(restricted1.xs, restricted2.xs);
	const sm = mergeFn(restricted1.sm, restricted2.sm);
	const md = mergeFn(restricted1.md, restricted2.md);
	const lg = mergeFn(restricted1.lg, restricted2.lg);
	const xl = mergeFn(restricted1.xl, restricted2.xl);

	const mergedProps = {
		base,
		xs: xs ?? base,
		sm: sm ?? xs ?? base,
		md: md ?? sm ?? xs,
		lg: lg ?? md ?? sm,
		xl: xl ?? lg ?? md,
	};

	if (Object.values(mergedProps).some(value => value === undefined)) {
		throw new Error('Invalid props passed to Grid.Cell');
	}

	return mergedProps;
};

export const restrictResponsiveProp = (prop?: StyleProp<string | number> | null) => {
	if (typeof prop === 'object' && prop !== null) {
		if (!('base' in prop)) {
			throw new Error('Failed to restrict responsive prop, an object was passed without an `base` key');
		}

		const restrictedProp = {
			base: prop.base ?? null,
			xs: prop.xs ?? prop.base ?? null,
			sm: prop.sm ?? prop.xs ?? prop.base ?? null,
			md: prop.md ?? prop.sm ?? prop.xs ?? null,
			lg: prop.lg ?? prop.md ?? prop.sm ?? null,
			xl: prop.xl ?? prop.lg ?? prop.md ?? null,
		};

		if (Object.values(restrictedProp).some(value => value === null)) {
			throw new Error('Failed to restrict responsive prop, an invalid value was passed to sm, md or lg');
		}

		return restrictedProp;
	}

	return {
		base: prop,
		xs: prop,
		sm: prop,
		md: prop,
		lg: prop,
		xl: prop,
	};
};

export type RestrictedResponsiveProp = ReturnType<typeof restrictResponsiveProp>;

export const areClipSpansEqual = (clipSpans1: unknown, clipSpans2: unknown): boolean => {
	return JSON.stringify(clipSpans1) === JSON.stringify(clipSpans2);
};
