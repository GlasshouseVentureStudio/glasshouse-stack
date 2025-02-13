import {
	type BoxProps,
	type ElementProps,
	type MantineColor,
	type MantineRadius,
	type MantineSize,
	type PolymorphicFactory,
	type StyleProp,
	type StylesApiProps,
} from '@mantine/core';

import { type restrictResponsiveProp } from './grid.utils';
import { type GridCell } from './grid-cell/grid-cell';

/**
 * Base properties for the grid.
 */
export interface BaseGridProps {
	/**
	 * Number of columns in the grid.
	 */
	columns: StyleProp<number>;

	/**
	 * Number of rows in the grid.
	 */
	rows: StyleProp<number>;
}

export type GridStylesNames = 'root' | 'cell' | 'guides' | 'guide' | 'guideInner';

export interface GridCssVariables {
	root:
		| '--grid-column-width'
		| '--grid-row-height'
		| '--grid-width'
		| '--grid-height'
		| '--grid-horizontal-margin'
		| '--grid-max-width'
		| '--grid-min-width'
		| '--grid-guide-width'
		| '--grid-guide-color'
		| '--grid-radius'
		| '--grid-cell-padding-x'
		| '--grid-cell-padding-y';
}

export type GridCellPadding = MantineSize | (string & {}) | number;

/**
 * Base properties for the grid.
 */
export interface GridProps extends BaseGridProps, BoxProps, StylesApiProps<GridFactory>, ElementProps<'section'> {
	/**
	 * Option to hide guides.
	 */
	hideGuides?: StyleProp<boolean | 'column' | 'row'>;
	/**
	 * Width of the guide.
	 */
	guideWidth?: string | number;
	/**
	 * Key of `theme.colors` or any valid CSS color, `theme.primaryColor` by default
	 */
	guideColor?: MantineColor;
	/**
	 * Key of `theme.radius` or any valid CSS value to set `border-radius`, `theme.defaultRadius` by default
	 */
	radius?: MantineRadius;
	/**
	 * Padding for the grid cell, can be a `MantineSize`, `string`, `number`, or an object with `x` and `y` properties.
	 * Automatically converts to `rem` by default.
	 */
	cellPadding?: GridCellPadding | { x?: GridCellPadding; y?: GridCellPadding };
	/**
	 * Option to add border to the root element, default `true`.
	 */
	rootBorder?: boolean;
}

export type GridFactory = PolymorphicFactory<{
	props: GridProps;
	defaultRef: HTMLElement;
	defaultComponent: 'section';
	stylesNames: GridStylesNames;
	vars: GridCssVariables;
	staticComponents: {
		Cell: typeof GridCell;
	};
}>;

/**
 * Props for the grid variables component.
 */
export interface GridVariablesProps extends BaseGridProps {
	/**
	 * Selector for the grid variables.
	 */
	selector: string;
}

type GridValue = [number, number] | null | undefined;

/**
 * Position of a grid element.
 */
export interface GridPosition {
	/**
	 * Row position.
	 */
	row: GridValue;

	/**
	 * Column position.
	 */
	column: GridValue;
}

/**
 * Restricted responsive property type.
 */
export type RestrictedResponsiveProp = ReturnType<typeof restrictResponsiveProp>;

/**
 * Clip span type.
 */
export type ClipSpan = Record<
	MantineSize | 'base',
	{
		row: GridValue;
		column: GridValue;
	}[]
>;
