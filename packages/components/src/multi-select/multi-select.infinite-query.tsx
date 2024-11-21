import { type ForwardedRef, forwardRef, useCallback, useRef, useState } from 'react';
import { type ScrollAreaProps } from '@mantine/core';
import { useDebouncedValue, useMergedRef } from '@mantine/hooks';
import { type InfiniteData, keepPreviousData, type QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import omit from 'lodash.omit';

import { MultiSelectBase } from './multi-select.base';
import { type MultiSelectWithInfiniteQueryProps } from './multi-select.types';

function MultiSelectWithInfiniteQueryComponent<
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
>(
	{
		defaultSearchValue,
		getData,
		loading,
		onOptionSubmit,
		onSearchChange,
		queryOptions,
		scrollAreaProps,
		scrollThreshold = 0.25,
		searchValue,
		...props
	}: MultiSelectWithInfiniteQueryProps<TQueryFnData, TError, TQueryKey, TPageParam>,
	ref: ForwardedRef<HTMLInputElement>
) {
	const [search, setSearch] = useState(defaultSearchValue ?? searchValue);
	const [debouncedSearch] = useDebouncedValue(search, 300);
	const viewportRef = useRef<HTMLDivElement>(null);
	const mergedRef = useMergedRef(viewportRef, scrollAreaProps?.viewportRef);

	const {
		data: queryData,
		isLoading,
		isFetching,
		hasNextPage,
		fetchNextPage,
	} = useInfiniteQuery({
		placeholderData: keepPreviousData,
		...omit(queryOptions, 'select'),
		queryKey: [...queryOptions.queryKey, debouncedSearch] as unknown as TQueryKey,
		queryFn: context => getData(context, { search }),
	});

	const options = queryData ? queryOptions.select?.(queryData as InfiniteData<TQueryFnData, TPageParam>) : undefined;

	const data = options?.pages.flatMap(page => page);

	const handleScrollPositionChange: ScrollAreaProps['onScrollPositionChange'] = useCallback(
		(position: { x: number; y: number }) => {
			if (viewportRef.current) {
				const { scrollHeight, clientHeight } = viewportRef.current;
				const shouldFetch = scrollHeight - position.y - clientHeight < clientHeight * (1 - scrollThreshold);

				if (shouldFetch && (!isLoading || !isFetching) && hasNextPage) {
					void fetchNextPage();
				}
			}

			scrollAreaProps?.onScrollPositionChange?.(position);
		},
		[fetchNextPage, hasNextPage, isFetching, isLoading, scrollAreaProps, scrollThreshold]
	);

	return (
		<MultiSelectBase
			{...omit(props, ['dropdownLoadingType', 'dropdownLoading'])}
			ref={ref}
			data={data}
			defaultSearchValue={defaultSearchValue}
			loading={isLoading || loading}
			onOptionSubmit={value => onOptionSubmit?.(value, data)}
			onSearchChange={value => {
				setSearch(value);
				onSearchChange?.(value);
			}}
			scrollAreaProps={{
				...scrollAreaProps,
				onScrollPositionChange: handleScrollPositionChange,
				viewportRef: mergedRef,
			}}
			searchValue={searchValue}
		/>
	);
}

export const MultiSelectWithInfiniteQuery = forwardRef(MultiSelectWithInfiniteQueryComponent);
