import { type SlotsToClasses } from '@glasshouse/utils';
import { type BoxProps, type MantineSize, type SimpleGridProps, type StyleProp } from '@mantine/core';

import { type GridSlots, type GridVariantProps } from './grid.styles';
import { type restrictResponsiveProp } from './grid.utils';

export interface BaseGridProps {
	columns: StyleProp<number>;
	rows: StyleProp<number>;
}

export interface GridProps
	extends BaseGridProps,
		GridVariantProps,
		Omit<SimpleGridProps, 'cols' | 'spacing' | 'classNames'> {
	classNames?: SlotsToClasses<GridSlots>;
	hideGuides?: StyleProp<boolean | 'column' | 'row'>;
	guideWidth?: number;
}

export interface GridCellProps extends BoxProps, Omit<React.ComponentPropsWithoutRef<'div'>, 'style'> {
	column?: StyleProp<number | string>;
	row?: StyleProp<number | string>;
}

export interface GridVariablesProps extends BaseGridProps {
	selector: string;
}

export interface GridCellVariablesProps extends GridCellProps {
	selector: string;
}

export interface GridGuideVariablesProps extends BaseGridProps, GridCellProps {
	selector: string;
	index: number;
}

export interface GridGuideProps extends BoxProps {
	columns: number;
	rows: number;
	hideGuides?: StyleProp<boolean | 'column' | 'row'>;
	clipSpans: GridPosition[];
	className?: string;
}

type GridValue = [number, number] | null | undefined;

export interface GridPosition {
	row: GridValue;
	column: GridValue;
}

export type RestrictedResponsiveProp = ReturnType<typeof restrictResponsiveProp>;

export type ClipSpan = Record<
	MantineSize | 'base',
	{
		row: GridValue;
		column: GridValue;
	}[]
>;

export interface GridGuidesProps {
	columns: RestrictedResponsiveProp;
	rows: RestrictedResponsiveProp;
	hideGuides?: StyleProp<boolean | 'column' | 'row'>;
	responsiveClipSpans: ClipSpan;
}

export interface GridGuideBlockVariablesProps extends BoxProps {
	selector: string;
}

export interface GridGuideBlockProps extends BoxProps {
	index: number;
	columnIndex: number;
	rowIndex: number;
	hideRightBorder: boolean;
	hideBottomBorder: boolean;
}
