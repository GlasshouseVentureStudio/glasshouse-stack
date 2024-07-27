/* eslint-disable react/jsx-pascal-case -- 3rd party */
import React from 'react';
import { Box, type BoxProps } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { clsx } from 'clsx';
import {
	MRT_ProgressBar,
	type MRT_RowData,
	MRT_TablePagination,
	MRT_ToolbarAlertBanner,
	MRT_ToolbarDropZone,
} from 'mantine-react-table';

import { type DataTableInstance } from '../data-table.types';
import { resolveComponentProps } from '../data-table.utils';
import { TablePaginationSimple } from './table-pagination-simple';

import classes from './bottom-toolbar.module.css';
import commonClasses from './common.module.css';

interface BottomToolbarProps<TData extends MRT_RowData> extends BoxProps {
	table: DataTableInstance<TData>;
}

export const BottomToolbar = <TData extends MRT_RowData>({ table, ...rest }: BottomToolbarProps<TData>) => {
	const {
		getState,
		options: {
			enablePagination,
			mantineBottomToolbarProps,
			positionPagination,
			positionToolbarAlertBanner,
			positionToolbarDropZone,
			renderBottomToolbarCustomActions,
		},
		refs: { bottomToolbarRef },
	} = table;
	const { isFullScreen } = getState();

	const isMobile = useMediaQuery('(max-width: 720px)') ?? false;

	const toolbarProps = {
		...resolveComponentProps(
			{
				table,
			},
			mantineBottomToolbarProps
		),
		...rest,
	};

	const stackAlertBanner = isMobile || Boolean(renderBottomToolbarCustomActions);

	const paginationComponent =
		table.options.paginationDisplayMode === 'custom' ? (
			<TablePaginationSimple table={table} />
		) : (
			<MRT_TablePagination
				position='bottom'
				table={table}
			/>
		);

	return (
		<Box
			{...toolbarProps}
			ref={node => {
				if (node) {
					bottomToolbarRef.current = node;

					if (toolbarProps.ref) {
						toolbarProps.ref.current = node;
					}
				}
			}}
			className={clsx(
				'mrt-bottom-toolbar',
				classes.root,
				commonClasses['common-toolbar-styles'],
				isFullScreen && classes['root-fullscreen'],
				toolbarProps.className
			)}
		>
			<MRT_ProgressBar
				isTopToolbar={false}
				table={table}
			/>
			{positionToolbarAlertBanner === 'bottom' && (
				<MRT_ToolbarAlertBanner
					stackAlertBanner={stackAlertBanner}
					table={table}
				/>
			)}
			{['both', 'bottom'].includes(positionToolbarDropZone ?? '') && <MRT_ToolbarDropZone table={table} />}
			<Box className={classes['custom-toolbar-container']}>
				{renderBottomToolbarCustomActions ? renderBottomToolbarCustomActions({ table }) : <span />}
				<Box
					className={clsx(
						classes['paginator-container'],
						stackAlertBanner && classes['paginator-container-alert-banner']
					)}
				>
					{enablePagination && ['both', 'bottom'].includes(positionPagination ?? '') ? paginationComponent : null}
				</Box>
			</Box>
		</Box>
	);
};
