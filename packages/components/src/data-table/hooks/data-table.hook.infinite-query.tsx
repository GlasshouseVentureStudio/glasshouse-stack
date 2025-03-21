'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@glasshouse/utils';
import { useInterval } from '@mantine/hooks';
import { type DefaultError, type InfiniteData, type QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import omit from 'lodash.omit';
import {
	type MRT_ColumnFiltersState,
	type MRT_PaginationState,
	type MRT_RowData,
	type MRT_RowVirtualizer,
	type MRT_SortingState,
} from 'mantine-react-table';

import {
	type DataTableOptions,
	type DataTableWithInfiniteQueryProps,
	type LoadMoreButtonProps,
	type MantineReactTableMantineProgressProps,
} from '../data-table.types';
import { resolveComponentProps } from '../data-table.utils';
import { LoadMoreButton } from '../toolbar/load-more-button';
import { useDataTableBase } from './data-table.hook.base';

import styles from '../data-table.module.css';

export type UseDataTableWithInfiniteQueryOptions<
	TData extends MRT_RowData,
	TQueryFnData = unknown,
	TError = DefaultError,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
> = DataTableWithInfiniteQueryProps<TData, TQueryFnData, TError, TQueryKey, TPageParam>;

export const useDataTableWithInfiniteQuery = <
	TData extends MRT_RowData,
	TQueryFnData = unknown,
	TError = DefaultError,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
>({
	getData,
	queryOptions,
	state,
	mantineTableContainerProps: mantineTableContainerPropsFromProps,
	mantineProgressProps: mantineProgressPropsFromProps,
	initialState,
	onColumnFiltersChange,
	onPaginationChange,
	onSortingChange,
	scrollThreshold = 0.25,
	enableLoadMoreButton = false,
	renderLoadMoreButton = (props: LoadMoreButtonProps) => <LoadMoreButton {...props} />,
	onDataFetch,
	...options
}: UseDataTableWithInfiniteQueryOptions<TData, TQueryFnData, TError, TQueryKey, TPageParam>) => {
	const tableContainerRef = useRef<HTMLDivElement>(null);
	const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);
	const [sorting, setSorting] = useState<MRT_SortingState>(initialState?.sorting ?? state?.sorting ?? []);
	const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
		initialState?.columnFilters ?? state?.columnFilters ?? []
	);
	const [pagination, setPagination] = useState<MRT_PaginationState>(
		initialState?.pagination ?? state?.pagination ?? { pageIndex: 0, pageSize: 10 }
	);

	const queryKey = [...queryOptions.queryKey] as unknown as TQueryKey;

	const {
		data: queryData,
		isLoading,
		isFetching,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery<TQueryFnData, TError, InfiniteData<TQueryFnData, TPageParam>, TQueryKey, TPageParam>({
		...omit(queryOptions, 'select'),
		queryKey,
		queryFn: context => getData(context, { columnFilters, pagination, sorting }),
	});

	const selectedQueryData = useMemo(() => queryData && queryOptions.select?.(queryData), [queryData, queryOptions]);

	const data = useMemo(() => selectedQueryData?.pages.flat() ?? [], [selectedQueryData?.pages]);

	useEffect(() => {
		if (onDataFetch) onDataFetch(queryData);
	}, [onDataFetch, queryData]);

	const mantineTableContainerProps: DataTableOptions<TData>['mantineTableContainerProps'] = props => {
		const resolvedProps = resolveComponentProps(props, mantineTableContainerPropsFromProps);

		return {
			...resolvedProps,
			ref: tableContainerRef,
			className: cn(styles.container, resolvedProps?.className),
			mod: [
				{
					'with-infinite-query': true,
				},
				resolvedProps?.mod,
			],
			onScroll: enableLoadMoreButton
				? undefined
				: e => {
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

	// Custom progress bar with random progress
	const [progress, setProgress] = useState(0);

	const interval = useInterval(() => {
		setProgress(prev => {
			const factor = prev < 90 ? 10 : 0;
			const newProgress = Math.random() * factor;

			return Math.min(prev + newProgress, 100);
		});
	}, 500);

	useEffect(() => {
		if (isFetchingNextPage) {
			interval.start();
		} else {
			setProgress(0);
			interval.stop();
		}

		return interval.stop;
	}, [interval, isFetchingNextPage]);

	const mantineProgressProps = useCallback<MantineReactTableMantineProgressProps<TData>>(
		props => {
			const resolvedProps = resolveComponentProps(props, mantineProgressPropsFromProps);

			return {
				variant: 'determinate',
				value: progress,
				transitionDuration: 500,
				animated: false,
				striped: false,
				...resolvedProps,
			};
		},
		[mantineProgressPropsFromProps, progress]
	);

	return useDataTableBase({
		data,
		editDisplayMode: 'cell',
		enableEditing: true,
		enablePagination: false,
		enableRowVirtualization: true,
		initialState,
		mantineProgressProps,
		mantineTableContainerProps,
		manualPagination: true,
		rowVirtualizerInstanceRef,
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
		rowVirtualizerOptions: {
			overscan: 20,
		},
		state: {
			showSkeletons: isLoading,
			showProgressBars: isFetchingNextPage,
			...state,
		},
		...(enableLoadMoreButton && {
			renderBottomToolbar: () =>
				renderLoadMoreButton({ onClick: () => void fetchNextPage(), isFetching: isFetchingNextPage, hasNextPage }),
		}),
		...options,
	});
};
