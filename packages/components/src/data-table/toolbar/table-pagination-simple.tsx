import React from 'react';
import { Box, Group, Pagination, type PaginationProps, Select, Text } from '@mantine/core';
import { clsx } from 'clsx';
import { type MRT_RowData } from 'mantine-react-table';

import { type DataTableInstance } from '../data-table.types';
import { resolveComponentProps } from '../data-table.utils';

import classes from './table-pagination-simple.module.css';

const defaultRowsPerPage = [5, 10, 15, 20, 25, 30, 50, 100].map(x => x.toString());

interface TablePaginationSimpleProps<TData extends MRT_RowData> extends Partial<PaginationProps> {
	position?: 'bottom' | 'top';
	table: DataTableInstance<TData>;
}

export const TablePaginationSimple = <TData extends MRT_RowData>({
	position = 'bottom',
	table,
	...props
}: TablePaginationSimpleProps<TData>) => {
	const {
		getPrePaginationRowModel,
		getState,
		options: {
			enableToolbarInternalActions,
			icons: { IconChevronLeft, IconChevronLeftPipe, IconChevronRight, IconChevronRightPipe },
			localization,
			mantinePaginationProps,
			rowCount,
		},
		setPageIndex,
		setPageSize,
	} = table;
	const {
		pagination: { pageIndex = 0, pageSize = 10 },
		showGlobalFilter,
	} = getState();

	const paginationProps = {
		...resolveComponentProps(
			{
				table,
			},
			mantinePaginationProps
		),
		...props,
	};

	const totalRowCount = rowCount ?? getPrePaginationRowModel().rows.length;
	const numberOfPages = Math.ceil(totalRowCount / pageSize);
	const showFirstLastPageButtons = numberOfPages > 2;

	const {
		rowsPerPageOptions = defaultRowsPerPage,
		showRowsPerPage = true,
		withEdges = showFirstLastPageButtons,
		...rest
	} = paginationProps;

	const needsTopMargin = position === 'top' && enableToolbarInternalActions && !showGlobalFilter;

	return (
		<Box className={clsx('mrt-table-pagination', classes.root, needsTopMargin && classes['with-top-margin'])}>
			{showRowsPerPage ? (
				<Group gap='xs'>
					<Text id='rpp-label'>{localization.rowsPerPage}</Text>
					<Select
						allowDeselect={false}
						aria-labelledby='rpp-label'
						className={classes.pagesize}
						data={rowsPerPageOptions}
						onChange={(value: null | string) => {
							setPageSize(Number(value ?? 10));
						}}
						value={pageSize.toString()}
					/>
				</Group>
			) : null}
			<Pagination.Root
				onChange={newPageIndex => {
					setPageIndex(newPageIndex - 1);
				}}
				total={numberOfPages}
				value={pageIndex + 1}
				{...rest}
			>
				<Group gap={2}>
					{withEdges ? (
						<Pagination.First
							bd='none'
							icon={IconChevronLeftPipe}
						/>
					) : null}
					<Pagination.Previous
						bd='none'
						icon={IconChevronLeft}
					/>
					<Pagination.Next
						bd='none'
						icon={IconChevronRight}
					/>
					{withEdges ? (
						<Pagination.Last
							bd='none'
							icon={IconChevronRightPipe}
						/>
					) : null}
				</Group>
			</Pagination.Root>
		</Box>
	);
};
