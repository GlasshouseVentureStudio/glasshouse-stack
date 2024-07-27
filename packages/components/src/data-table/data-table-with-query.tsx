'use client';

import React, { useState } from 'react';
import { keepPreviousData, type QueryKey, useQuery } from '@tanstack/react-query';
import omit from 'lodash.omit';
import {
	type MRT_ColumnFiltersState,
	type MRT_PaginationState,
	type MRT_RowData,
	type MRT_SortingState,
} from 'mantine-react-table';

import { type DataTableWithQueryProps } from './data-table.types';
import { DataTableBase } from './data-table-base';

const DEFAULT_PAGESIZE = 10;

export const DataTableWithQuery = <
	TData extends MRT_RowData,
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
>({
	getData,
	getRowCount,
	initialState,
	onColumnFiltersChange,
	onPaginationChange,
	onSortingChange,
	queryOptions,
	state,
	...props
}: DataTableWithQueryProps<TData, TQueryFnData, TError, TQueryKey>) => {
	const [pagination, setPagination] = useState<MRT_PaginationState>(
		initialState?.pagination ?? state?.pagination ?? { pageIndex: 0, pageSize: DEFAULT_PAGESIZE }
	);
	const [sorting, setSorting] = useState<MRT_SortingState>(initialState?.sorting ?? state?.sorting ?? []);
	const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
		initialState?.columnFilters ?? state?.columnFilters ?? []
	);

	const { data: queryData, isFetching } = useQuery({
		placeholderData: keepPreviousData,
		...omit(queryOptions, 'select'),
		queryKey: [...queryOptions.queryKey, pagination, sorting, columnFilters] as unknown as TQueryKey,
		queryFn: () =>
			getData({
				...pagination,
				orderBy: sorting[0]?.id,
				orderDirection: sorting[0]?.desc ? 'DESC' : 'ASC',
				filters: columnFilters,
			}),
	});

	const data = (queryData && queryOptions.select?.(queryData)) ?? [];

	return (
		<DataTableBase
			{...props}
			data={data}
			initialState={initialState}
			onColumnFiltersChange={updater => {
				setColumnFilters(updater);
				onColumnFiltersChange?.(updater);
			}}
			onPaginationChange={updater => {
				setPagination(updater);
				onPaginationChange?.(updater);
			}}
			onSortingChange={updater => {
				setSorting(updater);
				onSortingChange?.(updater);
			}}
			rowCount={getRowCount ? getRowCount(queryData) : props.rowCount}
			state={{
				isLoading: isFetching,
				pagination,
				sorting,
				columnFilters,
				...state,
			}}
		/>
	);
};
