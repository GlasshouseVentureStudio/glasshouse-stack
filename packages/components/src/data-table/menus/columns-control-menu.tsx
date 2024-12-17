'use client';

import { useMemo, useState } from 'react';
import { Button, Flex, Menu } from '@mantine/core';
import { getDefaultColumnOrderIds, type MRT_Column, type MRT_RowData } from 'mantine-react-table';

import { type DataTableInstance } from '../data-table.types';
import { ColumnsControlMenuItems } from './columns-control-menu-item';

import classes from './columns-control-menu.module.css';

export const ColumnsControlMenu = <TData extends MRT_RowData>({ table }: { table: DataTableInstance<TData> }) => {
	const {
		getAllColumns,
		getAllLeafColumns,
		getCenterLeafColumns,
		getIsAllColumnsVisible,
		getIsSomeColumnsPinned,
		getIsSomeColumnsVisible,
		getLeftLeafColumns,
		getRightLeafColumns,
		getState,
		options: { columnsControlMenuProps, enableColumnOrdering, enableColumnPinning, enableHiding, localization },
	} = table;

	const { columnOrder } = getState();

	const {
		withColumnDragHandles = true,
		withColumnPinningButtons = true,
		withQuickActions = true,
	} = columnsControlMenuProps ?? {};

	const handleToggleAllColumns = (value?: boolean) => {
		getAllLeafColumns()
			.filter(col => col.columnDef.enableHiding !== false)
			.forEach(col => {
				col.toggleVisibility(value);
			});
	};

	const columns = getAllColumns();
	const centerLeafColumns = getCenterLeafColumns();
	const leftLeafColumns = getLeftLeafColumns();
	const rightLeafColumns = getRightLeafColumns();

	const allColumns = useMemo<MRT_Column<TData>[]>(() => {
		if (columnOrder.length > 0 && !columns.some(col => col.columnDef.columnDefType === 'group')) {
			return [
				...leftLeafColumns,
				...Array.from(new Set(columnOrder)).map(colId => centerLeafColumns.find(col => col.id === colId)),
				...rightLeafColumns,
			].filter(Boolean) as MRT_Column<TData>[];
		}

		return columns;
	}, [centerLeafColumns, columnOrder, columns, leftLeafColumns, rightLeafColumns]);

	const [hoveredColumn, setHoveredColumn] = useState<MRT_Column<TData> | null>(null);

	return (
		<Menu.Dropdown>
			{withQuickActions ? (
				<>
					<Flex className={classes.content}>
						{enableHiding ? (
							<Button
								disabled={!getIsSomeColumnsVisible()}
								variant='subtle'
								onClick={() => {
									handleToggleAllColumns(false);
								}}
							>
								{localization.hideAll}
							</Button>
						) : null}
						{enableColumnOrdering && withColumnDragHandles ? (
							<Button
								variant='subtle'
								onClick={() => {
									table.setColumnOrder(getDefaultColumnOrderIds(table.options));
								}}
							>
								{localization.resetOrder}
							</Button>
						) : null}
						{enableColumnPinning && withColumnPinningButtons ? (
							<Button
								disabled={!getIsSomeColumnsPinned()}
								variant='subtle'
								onClick={() => {
									table.resetColumnPinning(true);
								}}
							>
								{localization.unpinAll}
							</Button>
						) : null}
						{enableHiding ? (
							<Button
								disabled={getIsAllColumnsVisible()}
								variant='subtle'
								onClick={() => {
									handleToggleAllColumns(true);
								}}
							>
								{localization.showAll}
							</Button>
						) : null}
					</Flex>
					<Menu.Divider />
				</>
			) : null}
			{allColumns.map(column => (
				<ColumnsControlMenuItems
					key={column.id}
					allColumns={allColumns}
					column={column}
					hoveredColumn={hoveredColumn}
					setHoveredColumn={setHoveredColumn}
					table={table}
				/>
			))}
		</Menu.Dropdown>
	);
};
