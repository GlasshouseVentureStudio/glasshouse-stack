import { type SlotsToClasses } from '@glasshouse/utils';
import { type BoxProps, type MantineSize, type SimpleGridProps, type StyleProp } from '@mantine/core';

import { type GridSystemSlots, type GridSystemVariantProps } from './grid-system.styles';
import { type restrictResponsiveProp } from './grid-system.utils';

export interface BaseGridSystemProps {
	columns: StyleProp<number>;
	rows: StyleProp<number>;
}

export interface GridSystemProps
	extends BaseGridSystemProps,
		GridSystemVariantProps,
		Omit<SimpleGridProps, 'cols' | 'spacing' | 'classNames'> {
	classNames?: SlotsToClasses<GridSystemSlots>;
	hideGuides?: StyleProp<boolean | 'column' | 'row'>;
}

export interface GridSystemCellProps extends BoxProps, Omit<React.ComponentPropsWithoutRef<'div'>, 'style'> {
	column?: StyleProp<number | string>;
	row?: StyleProp<number | string>;
}

export interface GridSystemVariablesProps extends BaseGridSystemProps {
	selector: string;
}

export interface GridSystemCellVariablesProps extends GridSystemCellProps {
	selector: string;
}

export interface GridSystemGuideVariablesProps extends BaseGridSystemProps, GridSystemCellProps {
	selector: string;
	index: number;
}

export interface GridSystemGuideProps extends BoxProps {
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

export interface GridSystemGuidesProps {
	columns: RestrictedResponsiveProp;
	rows: RestrictedResponsiveProp;
	hideGuides?: StyleProp<boolean | 'column' | 'row'>;
	responsiveClipSpans: ClipSpan;
}

export interface GridSystemGuideBlockVariablesProps extends BoxProps {
	selector: string;
}

export interface GridSystemGuideBlockProps extends BoxProps {
	index: number;
	columnIndex: number;
	rowIndex: number;
	hideRightBorder: boolean;
	hideBottomBorder: boolean;
}
