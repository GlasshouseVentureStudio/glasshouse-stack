import {
	type InfiniteData,
	type QueryClient,
	type QueryFunction,
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
	T extends object,
	TQueryFnData = T[] | undefined,
	TError = Error,
	TData = InfiniteData<TQueryFnData>,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
> extends Omit<ListProps<T>, 'data'> {
	/**
	 * The options parameter for `useInfiniteQuery` hook.
	 */
	queryOptions: Omit<
		UndefinedInitialDataInfiniteOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam>,
		'queryFn'
	>;

	/**
	 * The function that fetches the data for `@tanstack/react-query` query.
	 */
	fetchFn: QueryFunction<TQueryFnData, TQueryKey, TPageParam> | undefined;

	/**
	 * The query client parameter for `useInfiniteQuery` hook.
	 */
	queryClient?: QueryClient;
}
