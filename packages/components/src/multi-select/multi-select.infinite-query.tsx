import { type ForwardedRef, forwardRef, useCallback, useRef } from 'react';
import { type ScrollAreaProps } from '@mantine/core';
import { useMergedRef } from '@mantine/hooks';
import { type QueryKey, useInfiniteQuery } from '@tanstack/react-query';

import { MultiSelectBase } from './multi-select.base';
import { type MultiSelectWithInfiniteQueryProps } from './multi-select.types';

function MultiSelectWithInfiniteQueryComponent<
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
>(
	{
		queryOptions,
		getData,
		scrollThreshold = 0.25,
		scrollAreaProps,
		...props
	}: MultiSelectWithInfiniteQueryProps<TQueryFnData, TError, TQueryKey, TPageParam>,
	ref: ForwardedRef<HTMLInputElement>
) {
	const viewportRef = useRef<HTMLDivElement>(null);
	const mergedRef = useMergedRef(viewportRef, scrollAreaProps?.viewportRef);
	const {
		data: queryData,
		isFetching,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
	} = useInfiniteQuery({ ...queryOptions, queryFn: getData });

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
		<MultiSelectBase
			dropdownLoading={isFetchingNextPage}
			{...props}
			ref={ref}
			data={data}
			scrollAreaProps={{
				...scrollAreaProps,
				onScrollPositionChange: handleScrollPositionChange,
				viewportRef: mergedRef,
			}}
		/>
	);
}

export const MultiSelectWithInfiniteQuery = forwardRef(MultiSelectWithInfiniteQueryComponent);
