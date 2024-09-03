import {
	type BoxProps,
	type CompoundStylesApiProps,
	type ElementProps,
	type Factory,
	type StyleProp,
} from '@mantine/core';

export type GridCellStylesNames = 'cell';

/**
 * Properties for a grid cell.
 */
export interface GridCellProps extends BoxProps, CompoundStylesApiProps<GridCellFactory>, ElementProps<'div'> {
	/**
	 * Column position of the cell.
	 */
	column?: StyleProp<number | string>;

	/**
	 * Row position of the cell.
	 */
	row?: StyleProp<number | string>;
}

export type GridCellFactory = Factory<{
	props: GridCellProps;
	ref: HTMLDivElement;
	stylesNames: GridCellStylesNames;
	compound: true;
}>;

/**
 * Props for a grid cell variables component.
 */
export interface GridCellVariablesProps extends GridCellProps {
	/**
	 * Selector for the grid cell variables.
	 */
	selector: string;
}
