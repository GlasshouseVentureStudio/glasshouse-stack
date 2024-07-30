import {
	filterProps,
	getBaseValue,
	getSortedBreakpoints,
	InlineStyles,
	keys,
	type MantineBreakpoint,
	useMantineTheme,
} from '@mantine/core';

import { type GridCellVariablesProps, type GridVariablesProps } from './grid.types';

/**
 * Inject responsive grid variables into the component styles.
 */
export const GridVariables = ({ columns, rows, selector }: GridVariablesProps) => {
	const theme = useMantineTheme();

	const baseStyles: Record<string, string | undefined> = filterProps({
		'--grid-columns': getBaseValue(columns)?.toString(),
		'--grid-rows': getBaseValue(rows)?.toString(),
	});

	const queries = keys(theme.breakpoints).reduce<Record<string, Record<string, unknown>>>((acc, breakpoint) => {
		if (!acc[breakpoint]) {
			acc[breakpoint] = {};
		}

		if (typeof columns === 'object' && columns[breakpoint] !== undefined) {
			acc[breakpoint]['--grid-columns'] = columns[breakpoint];
		}

		if (typeof rows === 'object' && rows[breakpoint] !== undefined) {
			acc[breakpoint]['--grid-rows'] = rows[breakpoint];
		}

		return acc;
	}, {});

	const sortedBreakpoints = getSortedBreakpoints(keys(queries), theme).filter(
		breakpoint => keys(queries[breakpoint.value] ?? {}).length > 0
	);

	const media = sortedBreakpoints.map(breakpoint => ({
		query: `(min-width: ${theme.breakpoints[breakpoint.value as MantineBreakpoint]})`,
		styles: queries[breakpoint.value] ?? {},
	}));

	return (
		<InlineStyles
			media={media}
			selector={selector}
			styles={baseStyles}
		/>
	);
};

/**
 * Inject responsive grid cell variables into the component styles.
 */
export const GridCellVariables = ({ column, row, selector }: GridCellVariablesProps) => {
	const theme = useMantineTheme();

	const baseStyles: Record<string, string | undefined> = filterProps({
		'--grid-column': getBaseValue(column)?.toString(),
		'--grid-row': getBaseValue(row)?.toString(),
	});

	const queries = keys(theme.breakpoints).reduce<Record<string, Record<string, unknown>>>((acc, breakpoint) => {
		if (!acc[breakpoint]) {
			acc[breakpoint] = {};
		}

		if (typeof column === 'object' && column[breakpoint] !== undefined) {
			acc[breakpoint]['--grid-column'] = column[breakpoint];
		}

		if (typeof row === 'object' && row[breakpoint] !== undefined) {
			acc[breakpoint]['--grid-row'] = row[breakpoint];
		}

		return acc;
	}, {});

	const sortedBreakpoints = getSortedBreakpoints(keys(queries), theme).filter(
		breakpoint => keys(queries[breakpoint.value] ?? {}).length > 0
	);

	const media = sortedBreakpoints.map(breakpoint => ({
		query: `(min-width: ${theme.breakpoints[breakpoint.value as MantineBreakpoint]})`,
		styles: queries[breakpoint.value] ?? {},
	}));

	return (
		<InlineStyles
			media={media}
			selector={selector}
			styles={baseStyles}
		/>
	);
};
