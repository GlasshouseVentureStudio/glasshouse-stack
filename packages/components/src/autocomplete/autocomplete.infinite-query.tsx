import { type ForwardedRef, forwardRef, useCallback, useRef, useState } from 'react';
import { type ScrollAreaProps } from '@mantine/core';
import { useDebouncedValue, useMergedRef } from '@mantine/hooks';
import { type InfiniteData, type QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import omit from 'lodash.omit';

import { AutocompleteBase } from './autocomplete.base';
import { type AutocompleteWithInfiniteQueryProps } from './autocomplete.types';

function AutocompleteWithInfiniteQueryComponent<
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
>(
	{
		defaultValue,
		dropdownLoading,
		getData,
		loading,
		onChange,
		onOptionSubmit,
		queryOptions,
		scrollAreaProps,
		scrollThreshold = 0.25,
		value,
		...props
	}: AutocompleteWithInfiniteQueryProps<TQueryFnData, TError, TQueryKey, TPageParam>,
	ref: ForwardedRef<HTMLInputElement>
) {
	const [search, setSearch] = useState(defaultValue ?? value);
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
		<AutocompleteBase
			{...props}
			ref={ref}
			data={data}
			defaultValue={defaultValue}
			dropdownLoading={isFetchingNextPage || dropdownLoading}
			loading={isFetching || loading}
			onChange={value => {
				setSearch(value);
				onChange?.(value);
			}}
			onOptionSubmit={value => onOptionSubmit?.(value, data)}
			scrollAreaProps={{
				...scrollAreaProps,
				onScrollPositionChange: handleScrollPositionChange,
				viewportRef: mergedRef,
			}}
			value={value}
		/>
	);
}

export const AutocompleteWithInfiniteQuery = forwardRef(AutocompleteWithInfiniteQueryComponent);
