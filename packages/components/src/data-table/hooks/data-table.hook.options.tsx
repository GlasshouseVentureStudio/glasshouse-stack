'use client';

import { useMemo } from 'react';
import { cn } from '@glasshouse/utils';
import { type CSSProperties } from '@mantine/core';
import {
	IconCaretDownFilled,
	IconCaretUpDownFilled,
	IconCaretUpFilled,
	IconGripHorizontal,
	IconSettings,
} from '@tabler/icons-react';
import isFunction from 'lodash.isfunction';
import omit from 'lodash.omit';
import {
	type MRT_ColumnDef,
	type MRT_Icons,
	type MRT_RowData,
	type MRT_TableOptions,
	type MRT_TableState,
} from 'mantine-react-table';

import { type DataTableBaseProps, type DataTableOptions } from '../data-table.types';
import { resolveComponentProps } from '../data-table.utils';
import { DataTableActionsHeader } from '../data-table-actions-header';
import { BottomToolbar } from '../toolbar/bottom-toolbar';
import { TopToolbar } from '../toolbar/top-toolbar';

import styles from '../data-table.module.css';

export type UseDataTableBaseOptions<TData extends MRT_RowData> = DataTableBaseProps<TData>;

const customIcons: Partial<MRT_Icons> = {
	IconSortAscending: options => <IconCaretUpFilled {...options} />,
	IconSortDescending: options => <IconCaretDownFilled {...options} />,
	IconArrowsSort: options => <IconCaretUpDownFilled {...options} />,
	IconColumns: options => (
		<IconSettings
			{...options}
			size={18}
		/>
	),
	IconGripHorizontal: options => (
		<IconGripHorizontal
			{...options}
			size={16}
		/>
	),
};

export const useDataTableOptions = <TData extends MRT_RowData>({
	columnDragHandleDisplayMode = 'button',
	columnFilterDisplayMode = 'popover',
	columns: columnsFromProps,
	displayColumnDefOptions: displayColumnDefOptionsFromProps,
	enableBottomToolbar = false,
	enableColumnActions = false,
	enableColumnPinning = true,
	enableFilters = false,
	enablePagination = false,
	enableSorting = false,
	enableTableActionsColumn,
	enableTopToolbar = false,
	icons: iconsFromProps,
	initialState: initialStateFromProps,
	mantineColumnDragHandleProps: mantineColumnDragHandlePropsFromProps,
	mantineExpandAllButtonProps: mantineExpandAllButtonPropsFromProps,
	mantineExpandButtonProps: mantineExpandButtonPropsFromProps,
	mantinePaginationProps: mantinePaginationPropsFromProps,
	mantineRowDragHandleProps: mantineRowDragHandlePropsFromProps,
	mantineSelectAllCheckboxProps: mantineSelectAllCheckboxPropsFromProps,
	mantineSelectCheckboxProps: mantineSelectCheckboxPropsFromProps,
	mantineTableProps: mantineTablePropsFromProps,
	renderTopToolbar: renderTopToolbarFromProps,
	paginationDisplayMode,
	positionActionsColumn = 'last',
	renderBottomToolbar: renderBottomToolbarFromProps,
	statesStorageProvider,
	statesStorageKey,
	...options
}: UseDataTableBaseOptions<TData>): MRT_TableOptions<TData> => {
	const displayColumnDefOptions: DataTableBaseProps<TData>['displayColumnDefOptions'] = {
		...omit(displayColumnDefOptionsFromProps, 'mrt-table-actions'),
		'mrt-row-drag': {
			header: '',
			size: 46,
			...displayColumnDefOptionsFromProps?.['mrt-row-drag'],
		},
		'mrt-row-expand': {
			header: '',
			size: 46,
			...displayColumnDefOptionsFromProps?.['mrt-row-expand'],
		},
		'mrt-row-select': {
			visibleInShowHideMenu: false,
			maxSize: 32,
			size: 32,
			...displayColumnDefOptionsFromProps?.['mrt-row-select'],
		},
	};

	const tableActionColumnDef = displayColumnDefOptionsFromProps?.['mrt-table-actions'];

	const columns = useMemo<MRT_ColumnDef<TData>[]>(
		() => [
			...columnsFromProps,
			...(enableTableActionsColumn
				? [
						{
							header: '',
							id: 'mrt-table-actions',
							enableColumnDragging: false,
							enableColumnOrdering: false,
							enableResizing: false,
							enableEditing: false,
							enableColumnActions: false,
							enableColumnFilter: false,
							enableHiding: false,
							enableSorting: false,
							Header: DataTableActionsHeader,
							maxSize: 96,
							...tableActionColumnDef,
							mantineTableHeadCellProps: options => {
								const resolvedProps = resolveComponentProps(options, tableActionColumnDef?.mantineTableHeadCellProps);
								const classNames = resolvedProps?.classNames;

								return {
									...resolvedProps,
									classNames: (theme, options, ctx) => {
										const finalClassNames = isFunction(classNames) ? classNames(theme, options, ctx) : classNames;

										return {
											...finalClassNames,
											th: cn(styles['th-actions'], finalClassNames?.th),
										};
									},
								};
							},
						} as MRT_ColumnDef<TData>,
					]
				: []),
		],
		[columnsFromProps, enableTableActionsColumn, tableActionColumnDef]
	);

	const icons = {
		...customIcons,
		...iconsFromProps,
	};

	const mantineColumnDragHandleProps: DataTableOptions<TData>['mantineColumnDragHandleProps'] = options => {
		const resolvedProps = resolveComponentProps(options, mantineColumnDragHandlePropsFromProps);

		const resolvedStyle = resolvedProps?.style as CSSProperties;

		return {
			size: 'xs',
			'data-size': 'xs',
			...resolvedProps,
			style:
				columnDragHandleDisplayMode === 'button'
					? {
							width: 18,
							height: 18,
							minWidth: 18,
							minHeight: 18,
							...resolvedStyle,
						}
					: undefined,
		};
	};

	const mantineExpandAllButtonProps: DataTableOptions<TData>['mantineExpandAllButtonProps'] = options => {
		const resolvedProps = resolveComponentProps(options, mantineExpandAllButtonPropsFromProps);
		const classNames = resolvedProps?.classNames;

		return {
			size: 'xs',
			...resolvedProps,
			classNames: (theme, options, ctx) => {
				const finalClassNames = isFunction(classNames) ? classNames(theme, options, ctx) : classNames;

				return {
					icon: finalClassNames?.icon,
					loader: finalClassNames?.loader,
					root: cn(styles['expand-button-root'], finalClassNames?.root),
				};
			},
		};
	};

	const mantineExpandButtonProps: DataTableOptions<TData>['mantineExpandButtonProps'] = options => {
		const resolvedProps = resolveComponentProps(options, mantineExpandButtonPropsFromProps);
		const classNames = resolvedProps?.classNames;

		return {
			size: 'xs',
			...resolvedProps,
			classNames: (theme, options, ctx) => {
				const finalClassNames = isFunction(classNames) ? classNames(theme, options, ctx) : classNames;

				return {
					icon: finalClassNames?.icon,
					loader: finalClassNames?.loader,
					root: cn(styles['expand-button-root'], finalClassNames?.root),
				};
			},
		};
	};

	const mantinePaginationProps: DataTableOptions<TData>['mantinePaginationProps'] = options => {
		const resolvedProps = resolveComponentProps(options, mantinePaginationPropsFromProps);

		return {
			...resolvedProps,
		};
	};

	const mantineRowDragHandleProps: DataTableOptions<TData>['mantineRowDragHandleProps'] = options => {
		const resolvedProps = resolveComponentProps(options, mantineRowDragHandlePropsFromProps);

		return {
			size: 'xs',
			style: {
				width: 18,
				height: 18,
			},
			...resolvedProps,
		};
	};

	const mantineSelectAllCheckboxProps: DataTableOptions<TData>['mantineSelectAllCheckboxProps'] = options => {
		const resolvedProps = resolveComponentProps(options, mantineSelectAllCheckboxPropsFromProps);

		return {
			size: 'xs',
			...resolvedProps,
		};
	};

	const mantineSelectCheckboxProps: DataTableOptions<TData>['mantineSelectCheckboxProps'] = options => {
		const resolvedProps = resolveComponentProps(options, mantineSelectCheckboxPropsFromProps);

		return {
			size: 'xs',
			...resolvedProps,
		};
	};

	const mantineTableProps: DataTableOptions<TData>['mantineTableProps'] = options => {
		const resolvedProps = resolveComponentProps(options, mantineTablePropsFromProps);
		const classNames = resolvedProps?.classNames;

		return {
			...resolvedProps,
			'data-column-drag-handle-display': columnDragHandleDisplayMode,
			classNames: (theme, options, ctx) => {
				const finalClassNames = isFunction(classNames) ? classNames(theme, options, ctx) : classNames;

				return {
					caption: cn(styles.caption, finalClassNames?.caption),
					table: cn(styles.table, finalClassNames?.table),
					tbody: cn(styles.tbody, finalClassNames?.tbody),
					td: cn(styles.td, finalClassNames?.td),
					tfoot: cn(styles.tfoot, finalClassNames?.tfoot),
					th: cn(styles.th, finalClassNames?.th),
					thead: cn(styles.thead, finalClassNames?.thead),
					tr: cn(styles.tr, finalClassNames?.tr),
				};
			},
		};
	};

	const renderBottomToolbar: DataTableOptions<TData>['renderBottomToolbar'] = options => {
		const resolvedProps = resolveComponentProps(options, renderBottomToolbarFromProps);

		return resolvedProps ?? <BottomToolbar table={options.table} />;
	};

	const renderTopToolbar: DataTableOptions<TData>['renderTopToolbar'] = options => {
		const resolvedProps = resolveComponentProps(options, renderTopToolbarFromProps);

		return resolvedProps ?? <TopToolbar table={options.table} />;
	};

	const stateFromStorage = statesStorageProvider?.get(statesStorageKey);

	const initialState: Partial<MRT_TableState<TData>> = {
		density: 'xs',
		showSkeletons: false,
		...stateFromStorage,
		...initialStateFromProps,
		columnPinning: {
			right: enableTableActionsColumn ? ['mrt-row-actions', 'mrt-table-actions'] : ['mrt-row-actions'],
			...stateFromStorage?.columnPinning,
			...initialStateFromProps?.columnPinning,
		},
	};

	return {
		columns,
		columnFilterDisplayMode,
		displayColumnDefOptions,
		enableBottomToolbar,
		enableColumnActions,
		enableColumnPinning,
		enableFilters,
		enablePagination,
		enableSorting,
		enableTopToolbar,
		icons,
		initialState,
		mantineColumnDragHandleProps,
		mantineExpandAllButtonProps,
		mantineExpandButtonProps,
		mantinePaginationProps,
		mantineRowDragHandleProps,
		mantineSelectAllCheckboxProps,
		mantineSelectCheckboxProps,
		mantineTableProps,
		paginationDisplayMode: paginationDisplayMode as MRT_TableOptions<TData>['paginationDisplayMode'],
		positionActionsColumn,
		renderBottomToolbar,
		renderTopToolbar,
		...options,
	};
};
