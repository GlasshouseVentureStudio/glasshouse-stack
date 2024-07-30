import { type SlotsToClasses } from '@glasshouse/utils';
import { type BoxProps, type MantineSize, type SimpleGridProps, type StyleProp } from '@mantine/core';

import { type GridSlots, type GridVariantProps } from './grid.styles';
import { type restrictResponsiveProp } from './grid.utils';

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

/**
 * Properties for the `Grid` component. Extended from `SimpleGridProps`.
 */
export interface GridProps
	extends BaseGridProps,
		GridVariantProps,
		Omit<SimpleGridProps, 'cols' | 'spacing' | 'classNames'> {
	/**
	 * Class names for the grid slots.
	 */
	classNames?: SlotsToClasses<GridSlots>;

	/**
	 * Option to hide guides.
	 */
	hideGuides?: StyleProp<boolean | 'column' | 'row'>;

	/**
	 * Width of the guide.
	 */
	guideWidth?: string | number;
}

/**
 * Properties for a grid cell.
 */
export interface GridCellProps extends BoxProps, Omit<React.ComponentPropsWithoutRef<'div'>, 'style'> {
	/**
	 * Column position of the cell.
	 */
	column?: StyleProp<number | string>;

	/**
	 * Row position of the cell.
	 */
	row?: StyleProp<number | string>;
}

/**
 * Props for the grid variables component.
 */
export interface GridVariablesProps extends BaseGridProps {
	/**
	 * Selector for the grid variables.
	 */
	selector: string;
}

/**
 * Props for a grid cell variables component.
 */
export interface GridCellVariablesProps extends GridCellProps {
	/**
	 * Selector for the grid cell variables.
	 */
	selector: string;
}

/**
 * Props for a grid guide variables component.
 */
export interface GridGuideVariablesProps extends BaseGridProps, GridCellProps {
	/**
	 * Selector for the grid guide variables.
	 */
	selector: string;

	/**
	 * Index of the grid guide.
	 */
	index: number;
}

/**
 * Properties for a grid guide.
 */
export interface GridGuideProps extends BoxProps {
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

/**
 * Properties for grid guides.
 */
export interface GridGuidesProps {
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

/**
 * Variables for a grid guide block.
 */
export interface GridGuideBlockVariablesProps extends BoxProps {
	/**
	 * Selector for the grid guide block.
	 */
	selector: string;
}

/**
 * Properties for a grid guide block.
 */
export interface GridGuideBlockProps extends BoxProps {
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

/**
 * Properties for the grid system.
 */
export interface GridSystemProps {
	/**
	 * Width of the guide.
	 */
	guideWidth?: string | number;

	/**
	 * Color of the guide.
	 */
	guideColor?: string;

	/**
	 * Color of the cross.
	 */
	crossColor?: string;

	/**
	 * Maximum width of the grid system.
	 */
	maxWidth?: string | number;

	/**
	 * Minimum width of the grid system.
	 */
	minWidth?: string | number;

	/**
	 * Option to enable debug mode.
	 */
	debug?: boolean;

	/**
	 * Class name for the grid system.
	 */
	className?: string;

	/**
	 * Option to enable lazy layout.
	 */
	lazyLayout?: boolean;

	/**
	 * Option to use container.
	 */
	unstable_useContainer?: boolean;

	/**
	 * Children elements of the grid system.
	 */
	children: React.ReactNode;
}
