import {
	type BoxProps,
	type CompoundStylesApiProps,
	type ElementProps,
	type Factory,
	type StyleProp,
} from '@mantine/core';

import { type BaseGridProps, type ClipSpan, type GridPosition, type RestrictedResponsiveProp } from '../grid.types';
import { type GridCellProps } from '../grid-cell';

/**
 * Properties for grid guides.
 */
export interface GridGuidesContainerProps {
	/**
	 * Number of columns in the grid guides.
	 */
	columns: RestrictedResponsiveProp;

	/**
	 * Number of rows in the grid guides.
	 */
	rows: RestrictedResponsiveProp;

	/**
	 * Option to hide guides.
	 */
	hideGuides?: StyleProp<boolean | 'column' | 'row'>;

	/**
	 * Responsive clip spans for the grid guides.
	 */
	responsiveClipSpans: ClipSpan;
}

export type GridGuidesStylesNames = 'guides';

export type GridGuidesFactory = Factory<{
	props: GridGuidesProps;
	ref: HTMLDivElement;
	stylesNames: GridGuidesStylesNames;
	compound: true;
}>;

/**
 * Properties for a grid guide.
 */
export interface GridGuidesProps extends BoxProps, CompoundStylesApiProps<GridGuidesFactory>, ElementProps<'div'> {
	/**
	 * Number of columns in the grid guide.
	 */
	columns: number;

	/**
	 * Number of rows in the grid guide.
	 */
	rows: number;

	/**
	 * Option to hide guides.
	 */
	hideGuides?: StyleProp<boolean | 'column' | 'row'>;

	/**
	 * Clip spans for the grid guide.
	 */
	clipSpans: GridPosition[];

	/**
	 * Class name for the grid guide.
	 */
	className?: string;
}

/**
 * Props for a grid guide variables component.
 */
export interface GridGuidesVariablesProps extends BaseGridProps, GridCellProps {
	/**
	 * Selector for the grid guide variables.
	 */
	selector: string;

	/**
	 * Index of the grid guide.
	 */
	index: number;
}

export type GridGuideStylesNames = 'guide';

export type GridGuideFactory = Factory<{
	props: GridGuideProps;
	ref: HTMLDivElement;
	stylesNames: GridGuideStylesNames;
	compound: true;
}>;

/**
 * Properties for a grid guide block.
 */
export interface GridGuideProps extends BoxProps, CompoundStylesApiProps<GridGuideFactory>, ElementProps<'div'> {
	/**
	 * Index of the grid guide block.
	 */
	index: number;

	/**
	 * Column index of the grid guide block.
	 */
	columnIndex: number;

	/**
	 * Row index of the grid guide block.
	 */
	rowIndex: number;

	/**
	 * Option to hide the right border.
	 */
	hideRightBorder: boolean;

	/**
	 * Option to hide the bottom border.
	 */
	hideBottomBorder: boolean;
}
