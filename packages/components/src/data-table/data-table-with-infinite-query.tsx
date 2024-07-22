'use client';

import { useEffect, useRef, useState } from 'react';
import { type DefaultError, type InfiniteData, type QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import omit from 'lodash.omit';
import {
	type MRT_RowData,
	type MRT_RowVirtualizer,
	type MRT_SortingState,
	type MRT_TableOptions,
} from 'mantine-react-table';

import { type DataTableWithInfiniteQueryProps } from './data-table.types';
import { resolveComponentProps } from './data-table.utils';
import { DataTableBase } from './data-table-base';

export const DataTableWithInfiniteQuery = <
	TData extends MRT_RowData,
	TQueryFnData = unknown,
	TError = DefaultError,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam extends number = number,
>({
	getData,
	queryOptions,
	state,
	mantineTableContainerProps: mantineTableContainerPropsFromProps,
	initialState,
	onSortingChange,
	scrollThreshold = 0.25,
	...props
}: DataTableWithInfiniteQueryProps<TData, TQueryFnData, TError, TQueryKey, TPageParam>) => {
	const tableContainerRef = useRef<HTMLDivElement>(null);
	const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);
	const [sorting, setSorting] = useState<MRT_SortingState>(initialState?.sorting ?? state?.sorting ?? []);

	const {
		data: queryData,
		isFetching,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery<TQueryFnData, TError, InfiniteData<TQueryFnData, TPageParam>, TQueryKey, TPageParam>({
		...omit(queryOptions, 'select'),
		queryKey: [...queryOptions.queryKey] as unknown as TQueryKey,
		queryFn: ({ pageParam }) =>
			getData({
				pageIndex: pageParam as number,
				pageSize: 20,
				orderBy: sorting[0]?.id,
				orderDirection: sorting[0]?.desc ? 'DESC' : 'ASC',
			}),
	});

	const selectedQueryData = queryData && queryOptions.select?.(queryData);

	const data = selectedQueryData?.pages.flat() ?? [];

	const mantineTableContainerProps: MRT_TableOptions<TData>['mantineTableContainerProps'] = props => {
		const resolvedProps = resolveComponentProps(props, mantineTableContainerPropsFromProps);

		return {
			...resolvedProps,
			ref: tableContainerRef,
			style: { maxHeight: 768, ...resolvedProps?.style },
			onScroll: e => {
				const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
				const threshold =
					typeof scrollThreshold === 'number' ? scrollThreshold : parseInt(scrollThreshold.replace('px', ''));

				if (
					scrollHeight - scrollTop - clientHeight <
						(typeof scrollThreshold === 'number' ? clientHeight * (1 - threshold) : threshold) &&
					!isFetching &&
					hasNextPage
				) {
					void fetchNextPage();
				}
			},
		};
	};

	useEffect(() => {
		if (rowVirtualizerInstanceRef.current) {
			try {
				rowVirtualizerInstanceRef.current.scrollToIndex(0);
			} catch (e) {
				console.error(e);
			}
		}
	}, [sorting]);

	return (
		<DataTableBase
			{...props}
			data={data}
			enablePagination={false}
			enableRowVirtualization
			initialState={initialState}
			mantineTableContainerProps={mantineTableContainerProps}
			rowVirtualizerInstanceRef={rowVirtualizerInstanceRef}
			onSortingChange={updater => {
				setSorting(updater);
				onSortingChange?.(updater);
			}}
			rowVirtualizerOptions={{
				overscan: 20,
			}}
			state={{
				isLoading: isFetching,
				showProgressBars: isFetchingNextPage,
				...state,
			}}
		/>
	);
};
