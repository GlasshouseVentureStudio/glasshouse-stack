import {
	type InfiniteData,
	type QueryClient,
	type QueryKey,
	type UndefinedInitialDataInfiniteOptions,
} from '@tanstack/react-query';

import { type ListProps } from '../list/list.types';

/**
 * Props for the DataList component.
 *
 * @template T - The type of the data items in the list.
 * @template TQueryFnData - The type of the data returned by the query function.
 * @template TError - The type of the error returned by the query function.
 * @template TData - The type of the data returned by the query.
 * @template TQueryKey - The type of the query key.
 * @template TPageParam - The type of the page parameter.
 */
export interface DataListProps<
	TData extends object,
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
> extends Omit<ListProps<TData>, 'data' | 'renderItem'> {
	/**
	 * The options parameter for `useInfiniteQuery` hook.
	 */
	queryOptions: Omit<
		UndefinedInitialDataInfiniteOptions<TQueryFnData, TError, InfiniteData<TData[]>, TQueryKey, TPageParam>,
		'queryFn' | 'initialPageParam'
	>;

	/**
	 * The function that fetches the data for `@tanstack/react-query` query.
	 */
	fetchFn: FetchFn<TQueryFnData, TPageParam>;

	/**
	 * The function that selects the data from the query result.
	 */
	dataSelector: ListDataSelectorFn<TQueryFnData, TData, TPageParam>;

	/**
	 * The query client parameter for `useInfiniteQuery` hook.
	 */
	queryClient?: QueryClient;

	/**
	 * The function that renders each item in the list.
	 */
	renderItem: (item: TData, index: number, active?: boolean) => React.ReactNode;

	initialPageParam: TPageParam;

	/**
	 * The callback function when data fetched.
	 */

	onDataFetch?: (data?: InfiniteData<TQueryFnData, TPageParam>) => void;
}

export type ListDataSelectorFn<TQueryFnData, TData, TPageParam> = (
	data: InfiniteData<TQueryFnData, TPageParam>
) => InfiniteData<TData, TPageParam>;

export type FetchFn<TQueryFnData, TPageParam> = (params: TPageParam) => Promise<TQueryFnData>;

export interface FetchFnParams {
	pageIndex: number;
	pageSize: number;
	orderBy?: string;
	orderDirection?: 'ASC' | 'DESC';
}
