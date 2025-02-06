'use client';

import { useEffect, useMemo, useState } from 'react';
import { keepPreviousData, type QueryKey, useQuery } from '@tanstack/react-query';
import omit from 'lodash.omit';
import {
	type MRT_ColumnFiltersState,
	type MRT_PaginationState,
	type MRT_RowData,
	type MRT_SortingState,
} from 'mantine-react-table';

import { type DataTableWithQueryProps } from '../data-table.types';
import { useDataTableBase } from './data-table.hook.base';

export type UseDataTableWithQueryOptions<
	TData extends MRT_RowData,
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
> = DataTableWithQueryProps<TData, TQueryFnData, TError, TQueryKey>;

const DEFAULT_PAGESIZE = 10;

export const useDataTableWithQuery = <
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
	onDataFetch,
	...options
}: UseDataTableWithQueryOptions<TData, TQueryFnData, TError, TQueryKey>) => {
	const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
		initialState?.columnFilters ?? state?.columnFilters ?? []
	);
	const [pagination, setPagination] = useState<MRT_PaginationState>(
		initialState?.pagination ?? state?.pagination ?? { pageIndex: 0, pageSize: DEFAULT_PAGESIZE }
	);
	const [sorting, setSorting] = useState<MRT_SortingState>(initialState?.sorting ?? state?.sorting ?? []);

	const queryKey = [...queryOptions.queryKey, columnFilters, pagination, sorting] as unknown as TQueryKey;

	const {
		data: queryData,
		isLoading,
		isFetching,
	} = useQuery({
		placeholderData: keepPreviousData,
		...omit(queryOptions, 'select'),
		queryKey,
		queryFn: context => getData(context, { columnFilters, pagination, sorting }),
	});

	useEffect(() => {
		if (onDataFetch) {
			onDataFetch(queryData);
		}
	}, [queryData, onDataFetch]);

	const data = useMemo(() => (queryData && queryOptions.select?.(queryData)) ?? [], [queryData, queryOptions]);

	return useDataTableBase({
		data,
		initialState,
		rowCount: getRowCount ? getRowCount(queryData) : options.rowCount,
		onColumnFiltersChange: updater => {
			setColumnFilters(updater);
			onColumnFiltersChange?.(updater);
		},
		onPaginationChange: updater => {
			setPagination(updater);
			onPaginationChange?.(updater);
		},
		onSortingChange: updater => {
			setSorting(updater);
			onSortingChange?.(updater);
		},
		state: {
			showSkeletons: isLoading,
			isLoading: isFetching && !isLoading,
			pagination,
			sorting,
			columnFilters,
			...state,
		},
		...options,
	});
};
