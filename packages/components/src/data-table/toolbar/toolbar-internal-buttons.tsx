/* eslint-disable react/jsx-pascal-case -- 3rd party */
import React from 'react';
import { Flex, type FlexProps } from '@mantine/core';
import { clsx } from 'clsx';
import {
	type MRT_RowData,
	MRT_ToggleDensePaddingButton,
	MRT_ToggleFiltersButton,
	MRT_ToggleFullScreenButton,
	MRT_ToggleGlobalFilterButton,
} from 'mantine-react-table';

import { ColumnsControlButton } from '../buttons/columns-control-button';
import { type DataTableInstance } from '../data-table.types';

import classes from './toolbar-internal-buttons.module.css';

interface ToolbarInternalButtonsProps<TData extends MRT_RowData> extends FlexProps {
	table: DataTableInstance<TData>;
}

export const ToolbarInternalButtons = <TData extends MRT_RowData>({
	table,
	...rest
}: ToolbarInternalButtonsProps<TData>) => {
	const {
		options: {
			columnFilterDisplayMode,
			enableColumnFilters,
			enableColumnOrdering,
			enableColumnPinning,
			enableDensityToggle,
			enableFilters,
			enableFullScreenToggle,
			enableGlobalFilter,
			enableHiding,
			initialState,
			renderToolbarInternalActions,
		},
	} = table;

	const hiding = enableHiding ? enableHiding : false;
	const columnOrdering = enableColumnOrdering ? enableColumnOrdering : false;

	return (
		<Flex
			{...rest}
			className={clsx('mrt-toolbar-internal-buttons', classes.root, rest.className)}
		>
			{renderToolbarInternalActions?.({ table }) ?? (
				<>
					{enableFilters && enableGlobalFilter && !initialState?.showGlobalFilter ? (
						<MRT_ToggleGlobalFilterButton table={table} />
					) : null}
					{enableFilters && enableColumnFilters && columnFilterDisplayMode !== 'popover' ? (
						<MRT_ToggleFiltersButton table={table} />
					) : null}
					{hiding || columnOrdering || enableColumnPinning ? <ColumnsControlButton table={table} /> : null}
					{enableDensityToggle ? <MRT_ToggleDensePaddingButton table={table} /> : null}
					{enableFullScreenToggle ? <MRT_ToggleFullScreenButton table={table} /> : null}
				</>
			)}
		</Flex>
	);
};
