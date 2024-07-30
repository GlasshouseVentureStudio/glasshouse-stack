import {
	filterProps,
	getBaseValue,
	getSortedBreakpoints,
	InlineStyles,
	keys,
	type MantineBreakpoint,
	useMantineTheme,
} from '@mantine/core';

import {
	type GridSystemCellVariablesProps,
	type GridSystemGuideBlockVariablesProps,
	type GridSystemVariablesProps,
} from './grid-system.types';

export const GridSystemVariables = ({ columns, rows, selector }: GridSystemVariablesProps) => {
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

export const GridSystemCellVariables = ({ column, row, selector }: GridSystemCellVariablesProps) => {
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

export const GridSystemGuideBlockVariables = ({ display, selector, opacity }: GridSystemGuideBlockVariablesProps) => {
	const theme = useMantineTheme();

	const baseStyles: Record<string, string | undefined> = filterProps({
		'--guide-display': getBaseValue(display)?.toString(),
	});

	const queries = keys(theme.breakpoints).reduce<Record<string, Record<string, unknown>>>((acc, breakpoint) => {
		if (!acc[breakpoint]) {
			acc[breakpoint] = {};
		}

		if (typeof display === 'object' && display[breakpoint] !== undefined) {
			acc[breakpoint]['--guide-display'] = display[breakpoint];
		}

		if (typeof opacity === 'object' && opacity[breakpoint] !== undefined) {
			acc[breakpoint]['--guide-opacity'] = opacity[breakpoint];
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
