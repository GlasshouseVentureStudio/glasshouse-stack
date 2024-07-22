'use client';

import { cn } from '@glasshouse/utils';
import { Box, type GridProps } from '@mantine/core';

interface GridSystemProps extends GridProps {
	columns: number;
	rows: number;
}

interface Coordinate {
	x: number;
	y: number;
}

const generateGrid = (columns: number, rows: number) => {
	const coordinates: Coordinate[] = [];

	for (let row = 1; row <= rows; row++) {
		for (let column = 1; column <= columns; column++) {
			coordinates.push({ x: column, y: row });
		}
	}

	return coordinates;
};

export const GridSystem = ({ columns, rows, ...props }: GridSystemProps) => {
	const coordinates = generateGrid(columns, rows);

	const clone = coordinates.map(coordinate => {
		const { x, y } = coordinate;

		return (
			<Box
				key={`${x}-${y}`}
				style={{ '--x': x, '--y': y }}
				className={cn(
					'absolute inset-0 col-start-[var(--x)] col-end-[span_1] row-start-[var(--y)] row-end-[span_1] border border-l-0 border-t-0',
					x === columns && 'border-r-0',
					y === rows && 'border-b-0'
				)}
			/>
		);
	});

	return (
		<Box
			className='relative grid h-[var(--height)] w-[var(--width)] grid-cols-[repeat(var(--grid-columns),_var(--column-width))] grid-rows-[var(--grid-rows)] border'
			data-grid
			style={{
				'--column-width': 'calc(var(--width) / var(--grid-columns))',
				'--grid-columns': columns,
				'--grid-rows': rows,
				'--grid-system-width': 'calc(100cqw)',
				'--guide-width': '1px',
				'--horizontal-margin': '0px',
				'--max-width': '600px',
				'--min-width': '300px',
				'--row-height': 'calc(var(--height) / var(--grid-rows))',
				// '--width':
				// 	'clamp(calc(var(--min-width) - var(--guide-width)),calc(var(--grid-system-width) - var(--guide-width) - (var(--horizontal-margin) * 2)),calc(var(--max-width) - var(--guide-width)))',
				'--width': '100%',
				'--height': 'var(--lg-height, var(--md-height, var(--smd-height, var(--sm-height))))',
				'--sm-height': 'fit-content',
			}}
			{...props}
		>
			{props.children}
			<Box
				className='pointer-events-none z-[1] contents'
				data-grid-guides
			>
				{clone}
			</Box>
		</Box>
	);
};

interface GridSystemCellProps {
	children: React.ReactNode;
	className?: string;
}

export const GridSystemCell = ({ children, className }: GridSystemCellProps) => {
	return (
		<Box
			data-grid-cell
			className={cn(
				'z-[2] col-[var(--grid-column)] row-[var(--grid-row)] mb-[var(--guide-width)] mr-[var(--guide-width)] overflow-hidden p-2',
				className
			)}
			style={{
				'--grid-row': 'auto',
				'--grid-column': 'auto',
			}}
		>
			{children}
		</Box>
	);
};
