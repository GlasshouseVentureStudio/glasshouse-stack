'use client';

import { Children, isValidElement, useMemo } from 'react';
import { cn } from '@glasshouse/utils';
import { Box, SimpleGrid, useRandomClassName } from '@mantine/core';

import { gridSystem } from './grid-system.styles';
import {
	type ClipSpan,
	type GridSystemCellProps,
	type GridSystemGuideBlockProps,
	type GridSystemGuideProps,
	type GridSystemGuidesProps,
	type GridSystemGuideVariablesProps,
	type GridSystemProps,
} from './grid-system.types';
import { areClipSpansEqual, convertToSpan, mergeGridProps, restrictResponsiveProp } from './grid-system.utils';
import { GridSystemCellVariables, GridSystemVariables } from './grid-system.variables';

/**
 * Renders a grid system with customizable columns and rows.
 */
export const GridSystem = ({
	className,
	classNames,
	columns,
	rows,
	children,
	hideGuides,
	...props
}: GridSystemProps) => {
	const { root } = gridSystem();

	const responsiveClassName = useRandomClassName();

	const rootStyles = cn(classNames?.root, className, responsiveClassName);

	const cells = Children.toArray(children)
		.filter(isValidElement)
		.filter(child => {
			const { column, row } = child.props as GridSystemCellProps;

			return column && row;
		})
		.map(child => {
			const { row, column } = child.props as GridSystemGuideVariablesProps;

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
			<GridSystemVariables
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
					'--guide-width': '1px',
					'--horizontal-margin': '0px',
					'--max-width': '600px',
					'--min-width': '300px',
					'--row-height': 'calc(var(--height) / var(--grid-rows))',
					'--width': '100%',
					'--height': 'fit-content',
				}}
				{...props}
			>
				{children}
				<GridSystemGuides
					columns={gridColumns}
					hideGuides={hideGuides}
					responsiveClipSpans={responsiveClipSpans}
					rows={gridRows}
				/>
			</SimpleGrid>
		</>
	);
};

export const GridSystemCell = ({ children, className, column, row }: GridSystemCellProps) => {
	const responsiveClassName = useRandomClassName();

	return (
		<>
			<GridSystemCellVariables
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

const GridSystemGuides = ({ rows, columns, hideGuides, responsiveClipSpans }: GridSystemGuidesProps) => {
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
			<GridSystemGuide
				clipSpans={responsiveClipSpans.xs}
				columns={columns.xs as number}
				hideGuides={hideGuides}
				rows={rows.xs as number}
			/>
		);
	}

	return (
		<>
			<GridSystemGuide
				clipSpans={responsiveClipSpans.base}
				columns={columns.base as number}
				hiddenFrom='xs'
				hideGuides={hideGuides}
				rows={rows.base as number}
			/>
			<GridSystemGuide
				clipSpans={responsiveClipSpans.xs}
				columns={columns.xs as number}
				hiddenFrom='sm'
				hideGuides={hideGuides}
				rows={rows.xs as number}
				visibleFrom='xs'
			/>
			<GridSystemGuide
				clipSpans={responsiveClipSpans.sm}
				columns={columns.sm as number}
				hiddenFrom='md'
				hideGuides={hideGuides}
				rows={rows.sm as number}
				visibleFrom='sm'
			/>
			<GridSystemGuide
				clipSpans={responsiveClipSpans.md}
				columns={columns.md as number}
				hiddenFrom='lg'
				hideGuides={hideGuides}
				rows={rows.md as number}
				visibleFrom='md'
			/>
			<GridSystemGuide
				clipSpans={responsiveClipSpans.lg}
				columns={columns.lg as number}
				hiddenFrom='xl'
				hideGuides={hideGuides}
				rows={rows.lg as number}
				visibleFrom='lg'
			/>
			<GridSystemGuide
				clipSpans={responsiveClipSpans.xl}
				columns={columns.xl as number}
				hideGuides={hideGuides}
				rows={rows.xl as number}
				visibleFrom='xl'
			/>
		</>
	);
};

const GridSystemGuide = ({
	className,
	columns,
	rows,
	hideGuides,
	clipSpans,
	hiddenFrom,
	visibleFrom,
	...props
}: GridSystemGuideProps) => {
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
					<GridSystemGuideBlock
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

GridSystem.Cell = GridSystemCell;

const GridSystemGuideBlock = ({
	index,
	className,
	columnIndex,
	rowIndex,
	hideRightBorder,
	hideBottomBorder,
	...props
}: GridSystemGuideBlockProps) => {
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
