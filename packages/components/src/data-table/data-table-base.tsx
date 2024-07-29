'use client';

import { cn } from '@glasshouse/utils';
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
	MantineReactTable,
	type MRT_ColumnDef,
	type MRT_Icons,
	type MRT_RowData,
	MRT_TableOptions,
	type MRT_TableState,
	useMantineReactTable,
} from 'mantine-react-table';
import { useEffect, useMemo } from 'react';

import { DataTableActionsHeader } from './data-table-actions-header';
import { type DataTableBaseProps, type DataTableOptions } from './data-table.types';
import { resolveComponentProps } from './data-table.utils';
import { BottomToolbar } from './toolbar/bottom-toolbar';
import { TopToolbar } from './toolbar/top-toolbar';

import styles from './data-table.module.css';

const customIcons: Partial<MRT_Icons> = {
	IconSortAscending: props => <IconCaretUpFilled {...props} />,
	IconSortDescending: props => <IconCaretDownFilled {...props} />,
	IconArrowsSort: props => <IconCaretUpDownFilled {...props} />,
	IconColumns: props => (
		<IconSettings
			{...props}
			size={18}
		/>
	),
	IconGripHorizontal: props => (
		<IconGripHorizontal
			{...props}
			size={16}
		/>
	),
};

export const DataTableBase = <TData extends MRT_RowData>({
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
	...props
}: DataTableBaseProps<TData>) => {
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
							mantineTableHeadCellProps: props => {
								const resolvedProps = resolveComponentProps(props, tableActionColumnDef?.mantineTableHeadCellProps);
								const classNames = resolvedProps?.classNames;

								return {
									...resolvedProps,
									classNames: (theme, props, ctx) => {
										const finalClassNames = isFunction(classNames) ? classNames(theme, props, ctx) : classNames;

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

	const mantineColumnDragHandleProps: DataTableOptions<TData>['mantineColumnDragHandleProps'] = props => {
		const resolvedProps = resolveComponentProps(props, mantineColumnDragHandlePropsFromProps);

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
							...resolvedProps?.style,
						}
					: undefined,
		};
	};

	const mantineExpandAllButtonProps: DataTableOptions<TData>['mantineExpandAllButtonProps'] = props => {
		const resolvedProps = resolveComponentProps(props, mantineExpandAllButtonPropsFromProps);
		const classNames = resolvedProps?.classNames;

		return {
			size: 'xs',
			...resolvedProps,
			classNames: (theme, props, ctx) => {
				const finalClassNames = isFunction(classNames) ? classNames(theme, props, ctx) : classNames;

				return {
					icon: finalClassNames?.icon,
					loader: finalClassNames?.loader,
					root: cn(styles['expand-button-root'], finalClassNames?.root),
				};
			},
		};
	};

	const mantineExpandButtonProps: DataTableOptions<TData>['mantineExpandButtonProps'] = props => {
		const resolvedProps = resolveComponentProps(props, mantineExpandButtonPropsFromProps);
		const classNames = resolvedProps?.classNames;

		return {
			size: 'xs',
			...resolvedProps,
			classNames: (theme, props, ctx) => {
				const finalClassNames = isFunction(classNames) ? classNames(theme, props, ctx) : classNames;

				return {
					icon: finalClassNames?.icon,
					loader: finalClassNames?.loader,
					root: cn(styles['expand-button-root'], finalClassNames?.root),
				};
			},
		};
	};

	const mantinePaginationProps: DataTableOptions<TData>['mantinePaginationProps'] = props => {
		const resolvedProps = resolveComponentProps(props, mantinePaginationPropsFromProps);

		return {
			...resolvedProps,
		};
	};

	const mantineRowDragHandleProps: DataTableOptions<TData>['mantineRowDragHandleProps'] = props => {
		const resolvedProps = resolveComponentProps(props, mantineRowDragHandlePropsFromProps);

		return {
			size: 'xs',
			style: {
				width: 18,
				height: 18,
			},
			...resolvedProps,
		};
	};

	const mantineSelectAllCheckboxProps: DataTableOptions<TData>['mantineSelectAllCheckboxProps'] = props => {
		const resolvedProps = resolveComponentProps(props, mantineSelectAllCheckboxPropsFromProps);

		return {
			size: 'xs',
			...resolvedProps,
		};
	};

	const mantineSelectCheckboxProps: DataTableOptions<TData>['mantineSelectCheckboxProps'] = props => {
		const resolvedProps = resolveComponentProps(props, mantineSelectCheckboxPropsFromProps);

		return {
			size: 'xs',
			...resolvedProps,
		};
	};

	const mantineTableProps: DataTableOptions<TData>['mantineTableProps'] = props => {
		const resolvedProps = resolveComponentProps(props, mantineTablePropsFromProps);
		const classNames = resolvedProps?.classNames;

		return {
			...resolvedProps,
			'data-column-drag-handle-display': columnDragHandleDisplayMode,
			classNames: (theme, props, ctx) => {
				const finalClassNames = isFunction(classNames) ? classNames(theme, props, ctx) : classNames;

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

	const renderBottomToolbar: DataTableOptions<TData>['renderBottomToolbar'] = props => {
		const resolvedProps = resolveComponentProps(props, renderBottomToolbarFromProps);

		return resolvedProps ?? <BottomToolbar table={props.table} />;
	};

	const renderTopToolbar: DataTableOptions<TData>['renderTopToolbar'] = props => {
		const resolvedProps = resolveComponentProps(props, renderTopToolbarFromProps);

		return resolvedProps ?? <TopToolbar table={props.table} />;
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

	const table = useMantineReactTable({
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
		...props,
	});

	const tableState = table.getState();

	useEffect(() => {
		if (statesStorageProvider) {
			const { set } = statesStorageProvider;

			set(tableState);
		}
	}, [statesStorageProvider, tableState]);

	return <MantineReactTable table={table} />;
};
