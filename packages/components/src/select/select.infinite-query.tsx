import { type ForwardedRef, forwardRef, useCallback, useRef, useState } from 'react';
import { type ScrollAreaProps } from '@mantine/core';
import { useDebouncedValue, useMergedRef } from '@mantine/hooks';
import { type QueryKey, useInfiniteQuery } from '@tanstack/react-query';

import { SelectBase } from './select.base';
import { type SelectWithInfiniteQueryProps } from './select.types';

function SelectWithInfiniteQueryComponent<
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
>(
	{
		defaultSearchValue,
		dropdownLoading,
		getData,
		loading,
		onSearchChange,
		queryOptions,
		scrollAreaProps,
		scrollThreshold = 0.25,
		searchValue,
		...props
	}: SelectWithInfiniteQueryProps<TQueryFnData, TError, TQueryKey, TPageParam>,
	ref: ForwardedRef<HTMLInputElement>
) {
	const [search, setSearch] = useState(defaultSearchValue ?? searchValue);
	const [debouncedSearch] = useDebouncedValue(search, 300);
	const viewportRef = useRef<HTMLDivElement>(null);
	const mergedRef = useMergedRef(viewportRef, scrollAreaProps?.viewportRef);
	const {
		data: queryData,
		isFetching,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
	} = useInfiniteQuery({
		...queryOptions,
		queryKey: [...queryOptions.queryKey, debouncedSearch] as unknown as TQueryKey,
		queryFn: context => getData(context, { search }),
	});

	const data = queryData?.pages.flatMap(page => page);

	const handleScrollPositionChange: ScrollAreaProps['onScrollPositionChange'] = useCallback(
		(position: { x: number; y: number }) => {
			if (viewportRef.current) {
				const { scrollHeight, clientHeight } = viewportRef.current;

				if (
					scrollHeight - position.y - clientHeight < clientHeight * (1 - scrollThreshold) &&
					!isFetching &&
					hasNextPage
				) {
					void fetchNextPage();
				}
			}

			scrollAreaProps?.onScrollPositionChange?.(position);
		},
		[fetchNextPage, hasNextPage, isFetching, scrollAreaProps, scrollThreshold]
	);

	return (
		<SelectBase
			{...props}
			ref={ref}
			data={data}
			defaultSearchValue={defaultSearchValue}
			dropdownLoading={isFetchingNextPage || dropdownLoading}
			loading={isFetching || loading}
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

export const SelectWithInfiniteQuery = forwardRef(SelectWithInfiniteQueryComponent);
