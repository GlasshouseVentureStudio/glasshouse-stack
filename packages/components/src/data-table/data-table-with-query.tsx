'use client';

import { keepPreviousData, type QueryKey, useQuery } from '@tanstack/react-query';
import omit from 'lodash.omit';
import {
	type MRT_ColumnFiltersState,
	type MRT_PaginationState,
	type MRT_RowData,
	type MRT_SortingState,
} from 'mantine-react-table';
import { useMemo, useState } from 'react';

import { DataTableBase } from './data-table-base';
import { type DataTableWithQueryProps } from './data-table.types';

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
	const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
		initialState?.columnFilters ?? state?.columnFilters ?? []
	);
	const [pagination, setPagination] = useState<MRT_PaginationState>(
		initialState?.pagination ?? state?.pagination ?? { pageIndex: 0, pageSize: DEFAULT_PAGESIZE }
	);
	const [sorting, setSorting] = useState<MRT_SortingState>(initialState?.sorting ?? state?.sorting ?? []);

	const { data: queryData, isFetching } = useQuery({
		placeholderData: keepPreviousData,
		...omit(queryOptions, 'select'),
		queryKey: [...queryOptions.queryKey, columnFilters, pagination, sorting] as unknown as TQueryKey,
		queryFn: context => getData(context, { columnFilters, pagination, sorting }),
	});

	const data = useMemo(() => (queryData && queryOptions.select?.(queryData)) ?? [], [queryData, queryOptions]);

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
