'use client';

import { Children, isValidElement, useMemo } from 'react';
import { cn } from '@glasshouse/utils';
import { Box, SimpleGrid, useRandomClassName } from '@mantine/core';

import { gridSystem } from './grid.styles';
import {
	type ClipSpan,
	type GridCellProps,
	type GridGuideBlockProps,
	type GridGuideProps,
	type GridGuidesProps,
	type GridGuideVariablesProps,
	type GridProps,
	type GridSystemProps,
} from './grid.types';
import { areClipSpansEqual, convertToPx, convertToSpan, mergeGridProps, restrictResponsiveProp } from './grid.utils';
import { GridCellVariables, GridVariables } from './grid.variables';

import styles from './grid.module.css';

/**
 * Renders a grid system with customizable columns and rows. Built on top of Mantine's `SimpleGrid` component.
 *
 * This component is based from Vercel's Geist Design System `Grid` component.
 */
export const Grid = ({
	className,
	classNames,
	columns,
	rows,
	children,
	hideGuides,
	guideWidth = 1,
	...props
}: GridProps) => {
	const { root } = gridSystem();

	const responsiveClassName = useRandomClassName();

	const rootStyles = cn(classNames?.root, className, responsiveClassName);

	const cells = Children.toArray(children)
		.filter(isValidElement)
		.filter(child => {
			const { column, row } = child.props as GridCellProps;

			return column && row;
		})
		.map(child => {
			const { row, column } = child.props as GridGuideVariablesProps;

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
		<>
			<GridVariables
				columns={columns}
				rows={rows}
				selector={`.${responsiveClassName}`}
			/>
			<SimpleGrid
				className={root({ className: rootStyles })}
				cols={columns}
				data-grid
				spacing={0}
				style={{
					'--column-width': 'calc(var(--width) / var(--grid-columns))',
					'--grid-system-width': 'calc(100cqw)',
					'--horizontal-margin': '0px',
					'--max-width': '600px',
					'--min-width': '300px',
					'--row-height': 'calc(var(--height) / var(--grid-rows))',
					'--width': '100%',
					'--height': 'fit-content',
					'--guide-width': convertToPx(guideWidth),
				}}
				{...props}
			>
				{children}
				<GridGuides
					columns={gridColumns}
					hideGuides={hideGuides}
					responsiveClipSpans={responsiveClipSpans}
					rows={gridRows}
				/>
			</SimpleGrid>
		</>
	);
};

/**
 * Renders a grid cell component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the grid cell.
 * @param {string} props.className - The additional CSS class name for the grid cell.
 * @param {number} props.column - The column index of the grid cell.
 * @param {number} props.row - The row index of the grid cell.
 * @returns {JSX.Element} The rendered grid cell component.
 */
export const GridCell = ({ children, className, column, row }: GridCellProps): JSX.Element => {
	const responsiveClassName = useRandomClassName();

	return (
		<>
			<GridCellVariables
				column={column}
				row={row}
				selector={`.${responsiveClassName}`}
			/>
			<Box
				className={cn(
					'z-[2] col-[var(--grid-column)] row-[var(--grid-row)] mb-[var(--guide-width)] mr-[var(--guide-width)] overflow-hidden p-2',
					className,
					responsiveClassName
				)}
			>
				{children}
			</Box>
		</>
	);
};

/**
 * Renders a grid with guides based on the provided rows and columns configuration.
 *
 * @component
 * @param {GridGuidesProps} props - The props for the GridGuides component.
 * @returns {JSX.Element} The rendered GridGuides component.
 */
const GridGuides = ({ rows, columns, hideGuides, responsiveClipSpans }: GridGuidesProps) => {
	const areRowsEqual =
		typeof rows.base === rows.xs &&
		rows.xs === rows.sm &&
		rows.sm === rows.md &&
		rows.md === rows.lg &&
		rows.xl === rows.lg;

	const areColumnsEqual =
		columns.base === columns.xs &&
		columns.xs === columns.sm &&
		columns.sm === columns.md &&
		columns.md === columns.lg &&
		columns.xl === columns.lg;

	const areClipSpansEqualAcrossBreakpoints =
		areClipSpansEqual(responsiveClipSpans.base, responsiveClipSpans.xs) &&
		areClipSpansEqual(responsiveClipSpans.xs, responsiveClipSpans.sm) &&
		areClipSpansEqual(responsiveClipSpans.sm, responsiveClipSpans.md) &&
		areClipSpansEqual(responsiveClipSpans.md, responsiveClipSpans.lg) &&
		areClipSpansEqual(responsiveClipSpans.lg, responsiveClipSpans.xl);

	if (areRowsEqual && areColumnsEqual && areClipSpansEqualAcrossBreakpoints) {
		return (
			<GridGuide
				clipSpans={responsiveClipSpans.xs}
				columns={columns.xs as number}
				hideGuides={hideGuides}
				rows={rows.xs as number}
			/>
		);
	}

	return (
		<>
			<GridGuide
				clipSpans={responsiveClipSpans.base}
				columns={columns.base as number}
				hiddenFrom='xs'
				hideGuides={hideGuides}
				rows={rows.base as number}
			/>
			<GridGuide
				clipSpans={responsiveClipSpans.xs}
				columns={columns.xs as number}
				hiddenFrom='sm'
				hideGuides={hideGuides}
				rows={rows.xs as number}
				visibleFrom='xs'
			/>
			<GridGuide
				clipSpans={responsiveClipSpans.sm}
				columns={columns.sm as number}
				hiddenFrom='md'
				hideGuides={hideGuides}
				rows={rows.sm as number}
				visibleFrom='sm'
			/>
			<GridGuide
				clipSpans={responsiveClipSpans.md}
				columns={columns.md as number}
				hiddenFrom='lg'
				hideGuides={hideGuides}
				rows={rows.md as number}
				visibleFrom='md'
			/>
			<GridGuide
				clipSpans={responsiveClipSpans.lg}
				columns={columns.lg as number}
				hiddenFrom='xl'
				hideGuides={hideGuides}
				rows={rows.lg as number}
				visibleFrom='lg'
			/>
			<GridGuide
				clipSpans={responsiveClipSpans.xl}
				columns={columns.xl as number}
				hideGuides={hideGuides}
				rows={rows.xl as number}
				visibleFrom='xl'
			/>
		</>
	);
};

/**
 * Renders a grid guide component.
 */
const GridGuide = ({
	className,
	columns,
	rows,
	hideGuides,
	clipSpans,
	hiddenFrom,
	visibleFrom,
	...props
}: GridGuideProps) => {
	const hideAllGuides = typeof hideGuides === 'boolean' && hideGuides;
	const hideColumnGuides = hideAllGuides || hideGuides === 'column';
	const hideRowGuides = hideAllGuides || hideGuides === 'row';

	return (
		<Box
			className='pointer-events-none z-[1] contents'
			{...props}
		>
			{Array.from({ length: rows * columns }, (_, index) => {
				const columnIndex = index % columns;
				const rowIndex = Math.floor(index / columns);

				const hideRightBorder =
					columnIndex === columns - 1 ||
					hideColumnGuides ||
					clipSpans.some(span => {
						return (
							(span.column?.[0] ?? 1) <= columnIndex + 1 &&
							(span.column?.[1] ?? 1) > columnIndex + 2 &&
							(span.row?.[0] ?? 1) <= rowIndex + 1 &&
							(span.row?.[1] ?? 1) > rowIndex + 1
						);
					});
				const hideBottomBorder =
					rowIndex === rows - 1 ||
					hideRowGuides ||
					clipSpans.some(
						span =>
							(span.column?.[0] ?? 1) <= columnIndex + 1 &&
							(span.column?.[1] ?? 1) > columnIndex + 1 &&
							(span.row?.[0] ?? 1) <= rowIndex + 1 &&
							(span.row?.[1] ?? 1) > rowIndex + 2
					);

				return (
					<GridGuideBlock
						key={index}
						className={className}
						columnIndex={columnIndex}
						hiddenFrom={hiddenFrom}
						hideBottomBorder={hideBottomBorder}
						hideRightBorder={hideRightBorder}
						index={index}
						rowIndex={rowIndex}
						visibleFrom={visibleFrom}
					/>
				);
			})}
		</Box>
	);
};

/**
 * Renders a grid guide block.
 */
const GridGuideBlock = ({
	index,
	className,
	columnIndex,
	rowIndex,
	hideRightBorder,
	hideBottomBorder,
	...props
}: GridGuideBlockProps) => {
	return (
		<Box
			key={index}
			aria-hidden='true'
			className={cn(
				'absolute inset-0 col-start-[var(--x)] col-end-[span_1] row-start-[var(--y)] row-end-[span_1] border border-l-0 border-t-0',
				className
			)}
			style={{
				'--x': columnIndex + 1,
				'--y': rowIndex + 1,
				borderRight: hideRightBorder ? 'none' : undefined,
				borderBottom: hideBottomBorder ? 'none' : undefined,
			}}
			{...props}
		/>
	);
};

/**
 * Renders a grid system component. Wrap this outside of `Grid` components to enable grid system features.
 *
 * @param {Object} props - The component props.
 * @param {number} props.guideWidth - The width of the grid guide.
 * @param {string} props.guideColor - The color of the grid guide.
 * @param {string} props.crossColor - The color of the grid cross.
 * @param {number} props.maxWidth - The maximum width of the grid system.
 * @param {ReactNode} props.children - The child elements to render inside the grid system.
 * @param {number} props.minWidth - The minimum width of the grid system.
 * @param {string} props.className - The additional CSS class name for the grid system.
 * @param {boolean} props.lazyLayout - Whether to enable lazy layout for the grid system.
 * @param {boolean} props.unstable_useContainer - Whether to use the unstable container for the grid system.
 * @returns {ReactElement} The rendered grid system component.
 */
export const GridSystem = ({
	guideWidth = 1,
	guideColor,
	crossColor,
	maxWidth = 1080,
	children,
	minWidth = 368,
	className,
	lazyLayout,
	// eslint-disable-next-line camelcase -- safe to ignore
	unstable_useContainer,
}: GridSystemProps) => {
	// eslint-disable-next-line camelcase -- safe to ignore
	const containerClass = unstable_useContainer ? styles.unstable_gridSystemWrapper : styles.gridSystemContentWrapper;
	const gridSystemClass = cn(styles.gridSystem, className, {
		[styles.gridSystemLazyLayout ?? '']: lazyLayout,
	});

	return (
		<Box className={containerClass}>
			<Box
				className={gridSystemClass}
				style={{
					'--guide-width': convertToPx(guideWidth),
					'--max-width': convertToPx(maxWidth),
					'--min-width': convertToPx(minWidth),
					'--guide-color': guideColor,
					'--cross-color': crossColor,
				}}
			>
				{Children.toArray(children).slice(0, 2)}
				<div className={styles.gridSystemLazyContent}>{Children.toArray(children).slice(2)}</div>
			</Box>
		</Box>
	);
};

Grid.Cell = GridCell;
Grid.System = GridSystem;
