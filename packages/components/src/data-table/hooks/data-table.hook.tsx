/* eslint-disable react-compiler/react-compiler -- should be safe for this hook */
/* eslint-disable react-hooks/rules-of-hooks -- should be safe for this hook */
'use client';

import { type QueryKey } from '@tanstack/react-query';
import { type MRT_RowData } from 'mantine-react-table';

import { type DataTableProps } from '../data-table.types';
import { useDataTableBase } from './data-table.hook.base';
import {
	useDataTableWithInfiniteQuery,
	type UseDataTableWithInfiniteQueryOptions,
} from './data-table.hook.infinite-query';
import { useDataTableWithQuery, type UseDataTableWithQueryOptions } from './data-table.hook.query';

export type UseDataTableOptions<
	TData extends MRT_RowData,
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
> = DataTableProps<TData, TQueryFnData, TError, TQueryKey, TPageParam>;

export const useDataTable = <
	TData extends MRT_RowData,
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
>(
	options: UseDataTableOptions<TData, TQueryFnData, TError, TQueryKey, TPageParam>
) => {
	// const infiniteDataTableInstance = useDataTableWithInfiniteQuery(
	// 	options as UseDataTableWithInfiniteQueryOptions<TData, TQueryFnData, TError, TQueryKey, TPageParam>
	// );
	// const dataTableInstance = useDataTableWithQuery(
	// 	options as UseDataTableWithQueryOptions<TData, TQueryFnData, TError, TQueryKey>
	// );

	if (options.queryOptions) {
		if (options.infinite) {
			return useDataTableWithInfiniteQuery(
				options as UseDataTableWithInfiniteQueryOptions<TData, TQueryFnData, TError, TQueryKey, TPageParam>
			);
		}

		return useDataTableWithQuery(options as UseDataTableWithQueryOptions<TData, TQueryFnData, TError, TQueryKey>);
	}

	return useDataTableBase(options);
};
