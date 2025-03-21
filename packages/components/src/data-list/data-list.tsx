'use client';

import { useCallback, useEffect } from 'react';
import { type InfiniteData, type QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import omit from 'lodash.omit';

import { List } from '../list';
import { type DataListProps } from './data-list.types';

/**
 * A component that renders a list of items fetched from a query. This component uses the `useInfiniteQuery` hook from `react-query` to fetch data in pages. It also supports grouping items by a key. The list is rendered using the `List` component.
 */
export const DataList = <
	TData extends object,
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
>({
	queryOptions,
	queryClient,
	fetchFn,
	dataSelector,
	initialPageParam,
	onDataFetch,
	...props
}: DataListProps<TData, TQueryFnData, TError, TQueryKey, TPageParam>) => {
	const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery<
		TQueryFnData,
		TError,
		InfiniteData<TQueryFnData, TPageParam>,
		TQueryKey,
		TPageParam
	>(
		{
			...omit(queryOptions, 'select'),
			queryKey: [...queryOptions.queryKey] as unknown as TQueryKey,
			queryFn: ({ pageParam = initialPageParam }) => fetchFn(pageParam as TPageParam),
			initialPageParam,
		},
		queryClient
	);

	const selectedData = data ? dataSelector(data) : undefined;

	const items = selectedData?.pages.flat() ?? [];

	const onEndReached = useCallback(() => {
		if (hasNextPage) void fetchNextPage();
	}, [fetchNextPage, hasNextPage]);

	useEffect(() => {
		if (onDataFetch) onDataFetch(data);
	}, [onDataFetch, data]);

	return (
		<List
			{...props}
			bottomLoading={isFetchingNextPage}
			data={items as TData[]}
			loading={isLoading}
			onEndReached={onEndReached}
		/>
	);
};
