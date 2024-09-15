'use client';

import { Children, type ForwardedRef, forwardRef, isValidElement, useMemo } from 'react';
import {
	Box,
	createPolymorphicComponent,
	createVarsResolver,
	getRadius,
	getSize,
	getThemeColor,
	rem,
	useProps,
	useRandomClassName,
	useStyles,
} from '@mantine/core';

import { GridProvider } from './grid.context';
import { type ClipSpan, type GridFactory, type GridProps } from './grid.types';
import { convertToSpan, mergeGridProps, restrictResponsiveProp } from './grid.utils';
import { GridVariables } from './grid.variables';
import { GridCell } from './grid-cell/grid-cell';
import { type GridCellProps } from './grid-cell/grid-cell.types';
import { GridGuidesContainer } from './grid-guides/grid-guides.container';
import { type GridGuidesVariablesProps } from './grid-guides/grid-guides.types';

import classes from './grid.module.css';

const defaultProps: Partial<GridProps> = {
	guideWidth: 1,
};

const varsResolver = createVarsResolver<GridFactory>((theme, { guideWidth, guideColor, radius, cellPadding }) => {
	return {
		root: {
			'--grid-guide-width': rem(guideWidth),
			'--grid-column-width': 'calc(var(--grid-width) / var(--grid-columns))',
			'--grid-row-height': 'calc(var(--grid-height) / var(--grid-rows))',
			'--grid-width': '100%',
			'--grid-height': 'fit-content',
			'--grid-horizontal-margin': '0px',
			'--grid-max-width': '600px',
			'--grid-min-width': '300px',
			'--grid-guide-color': guideColor ? getThemeColor(guideColor, theme) : undefined,
			'--grid-radius': radius ? getRadius(radius) : undefined,
			'--grid-cell-padding': getSize(cellPadding, 'grid-cell-padding'),
		},
	};
});

/**
 * Renders a grid system with customizable columns and rows. Built on top of Mantine's `SimpleGrid` component.
 *
 * This component is based from Vercel's Geist Design System `Grid` component.
 */
const GridInner = (_props: GridProps, ref: ForwardedRef<HTMLElement>) => {
	const props = useProps('GridSystem', defaultProps, _props);
	const {
		className,
		classNames,
		columns,
		rows,
		children,
		hideGuides,
		style,
		styles,
		guideColor,
		guideWidth,
		mod,
		rootBorder = true,
		...others
	} = props;

	const getStyles = useStyles<GridFactory>({
		name: 'GridSystem',
		classes,
		props,
		className,
		classNames,
		style,
		styles,
		varsResolver,
	});

	const responsiveClassName = useRandomClassName();

	const cells = Children.toArray(children)
		.filter(isValidElement)
		.filter(child => {
			const { column, row } = child.props as GridCellProps;

			return column && row;
		})
		.map(child => {
			const { row, column } = child.props as GridGuidesVariablesProps;

			if (!row || !column) {
				throw Error('Invalid props passed to Grid.Cell');
			}

			const r = mergeGridProps(row, convertToSpan, rows);
			const c = mergeGridProps(column, convertToSpan, columns);

			return {
				base: {
					row: r.base,
					column: c.base,
				},
				xs: {
					row: r.xs,
					column: c.xs,
				},
				sm: {
					row: r.sm,
					column: c.sm,
				},
				md: {
					row: r.md,
					column: c.md,
				},
				lg: {
					row: r.lg,
					column: c.lg,
				},
				xl: {
					row: r.xl,
					column: c.xl,
				},
			};
		});

	const responsiveClipSpans = useMemo<ClipSpan>(
		() => ({
			base: cells.map(cell => cell.base),
			xs: cells.map(cell => cell.xs),
			sm: cells.map(cell => cell.sm),
			md: cells.map(cell => cell.md),
			lg: cells.map(cell => cell.lg),
			xl: cells.map(cell => cell.xl),
		}),
		[cells]
	);

	const gridColumns = useMemo(() => restrictResponsiveProp(columns), [columns]);
	const gridRows = useMemo(() => restrictResponsiveProp(rows), [rows]);

	return (
		<GridProvider value={{ getStyles, columns, rows }}>
			<GridVariables
				columns={columns}
				rows={rows}
				selector={`.${responsiveClassName}`}
			/>
			<Box
				ref={ref}
				{...getStyles('root', { className: responsiveClassName })}
				{...others}
				component='section'
				mod={[
					{
						'guide-width': guideWidth,
						'guide-color': guideColor,
						'root-border': rootBorder,
					},
					mod,
				]}
			>
				{children}
				<GridGuidesContainer
					columns={gridColumns}
					hideGuides={hideGuides}
					responsiveClipSpans={responsiveClipSpans}
					rows={gridRows}
				/>
			</Box>
		</GridProvider>
	);
};

interface GridStaticComponents {
	Cell: typeof GridCell;
}

/**
 * Renders a grid system with customizable columns and rows. Built on top of Mantine's `SimpleGrid` component.
 *
 * This component is based from Vercel's Geist Design System `Grid` component.
 */
const Grid = createPolymorphicComponent<'section', GridProps, GridStaticComponents>(forwardRef(GridInner));

Grid.displayName = 'Grid';
Grid.Cell = GridCell;

export { Grid };
