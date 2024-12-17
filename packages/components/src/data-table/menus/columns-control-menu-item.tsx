import { type Dispatch, type DragEvent, type SetStateAction, useRef, useState } from 'react';
import { Box, Menu, Switch, Text, Tooltip, useMantineTheme } from '@mantine/core';
import {
	dataVariable,
	getPrimaryColor,
	type MRT_CellValue,
	type MRT_Column,
	MRT_ColumnPinningButtons,
	MRT_GrabHandleButton,
	type MRT_RowData,
	reorderColumn,
} from 'mantine-react-table';

import { type DataTableInstance } from '../data-table.types';

import classes from './columns-control-menu-item.module.css';

interface ColumnsControlMenuItemsProps<TData extends MRT_RowData, TValue = MRT_CellValue> {
	allColumns: MRT_Column<TData>[];
	column: MRT_Column<TData, TValue>;
	hoveredColumn: MRT_Column<TData> | null;
	setHoveredColumn: Dispatch<SetStateAction<MRT_Column<TData> | null>>;
	table: DataTableInstance<TData>;
}

export const ColumnsControlMenuItems = <TData extends MRT_RowData>({
	allColumns,
	column,
	hoveredColumn,
	setHoveredColumn,
	table,
}: ColumnsControlMenuItemsProps<TData>) => {
	const theme = useMantineTheme();
	const {
		getState,
		options: { columnsControlMenuProps, enableColumnOrdering, enableColumnPinning, enableHiding, localization },
		setColumnOrder,
	} = table;
	const { columnOrder } = getState();
	const { columnDef } = column;
	const { columnDefType } = columnDef;

	const { withColumnDragHandles = true, withColumnPinningButtons = true } = columnsControlMenuProps ?? {};

	const switchChecked =
		(columnDefType !== 'group' && column.getIsVisible()) ||
		(columnDefType === 'group' && column.getLeafColumns().some(col => col.getIsVisible()));

	const handleToggleColumnHidden = (column: MRT_Column<TData>) => {
		if (columnDefType === 'group') {
			column.columns?.forEach((childColumn: MRT_Column<TData>) => {
				childColumn.toggleVisibility(!switchChecked);
			});
		} else {
			column.toggleVisibility();
		}
	};

	const menuItemRef = useRef<HTMLElement>(null);

	const [isDragging, setIsDragging] = useState(false);

	const handleDragStart = (e: DragEvent<HTMLButtonElement>) => {
		setIsDragging(true);

		if (menuItemRef.current) e.dataTransfer.setDragImage(menuItemRef.current, 0, 0);
	};

	const handleDragEnd = (_e: DragEvent<HTMLButtonElement>) => {
		setIsDragging(false);
		setHoveredColumn(null);

		if (hoveredColumn) {
			setColumnOrder(reorderColumn(column, hoveredColumn, columnOrder));
		}
	};

	const handleDragEnter = (_e: DragEvent) => {
		if (!isDragging && columnDef.enableColumnOrdering !== false) {
			setHoveredColumn(column);
		}
	};

	if (!columnDef.header || columnDef.visibleInShowHideMenu === false) {
		return null;
	}

	const grabHandle =
		columnDef.enableColumnOrdering !== false ? (
			<MRT_GrabHandleButton
				onDragEnd={handleDragEnd}
				onDragStart={handleDragStart}
				table={table}
			/>
		) : (
			<Box className={classes.grab} />
		);

	const columnPinningButtons = column.getCanPin() ? (
		<MRT_ColumnPinningButtons
			column={column}
			table={table}
		/>
	) : (
		<Box className={classes.pin} />
	);

	return (
		<>
			<Menu.Item
				ref={menuItemRef}
				className={classes.root}
				component='span'
				onDragEnter={handleDragEnter}
				style={{
					'--_column-depth': `${(column.depth + 0.5) * 2}rem`,
					'--_hover-color': getPrimaryColor(theme),
				}}
				{...dataVariable('dragging', isDragging)}
				{...dataVariable('order-hovered', hoveredColumn?.id === column.id)}
			>
				<Box className={classes.menu}>
					{columnDefType !== 'group' &&
					enableColumnOrdering &&
					withColumnDragHandles &&
					!allColumns.some(col => col.columnDef.columnDefType === 'group')
						? grabHandle
						: null}
					{enableColumnPinning && withColumnPinningButtons ? columnPinningButtons : null}
					{enableHiding ? (
						<Tooltip
							label={localization.toggleVisibility}
							openDelay={1000}
							withinPortal
						>
							<Switch
								checked={switchChecked}
								className={classes.switch}
								disabled={!column.getCanHide()}
								label={columnDef.header}
								onChange={() => {
									handleToggleColumnHidden(column);
								}}
							/>
						</Tooltip>
					) : (
						<Text className={classes.header}>{columnDef.header}</Text>
					)}
				</Box>
			</Menu.Item>
			{column.columns?.map((c: MRT_Column<TData>) => (
				<ColumnsControlMenuItems
					key={c.id}
					allColumns={allColumns}
					column={c}
					hoveredColumn={hoveredColumn}
					setHoveredColumn={setHoveredColumn}
					table={table}
				/>
			))}
		</>
	);
};
