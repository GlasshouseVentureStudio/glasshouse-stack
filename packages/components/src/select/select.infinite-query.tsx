import { type ForwardedRef, forwardRef, useCallback, useRef, useState } from 'react';
import {
	type ComboboxItem,
	getOptionsLockup,
	getParsedComboboxData,
	type OptionsFilter,
	type ScrollAreaProps,
} from '@mantine/core';
import { useDebouncedValue, useMergedRef } from '@mantine/hooks';
import { type InfiniteData, type QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import omit from 'lodash.omit';

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
		onOptionSubmit,
		onSearchChange,
		queryOptions,
		scrollAreaProps,
		scrollThreshold = 0.25,
		searchValue,
		infinite,
		mod,
		searchable,
		filter,
		...props
	}: SelectWithInfiniteQueryProps<TQueryFnData, TError, TQueryKey, TPageParam>,
	ref: ForwardedRef<HTMLInputElement>
) {
	const [search, setSearch] = useState(defaultSearchValue ?? searchValue);
	const [debouncedSearch] = useDebouncedValue(search, 300);
	const viewportRef = useRef<HTMLDivElement>(null);
	const mergedRef = useMergedRef(viewportRef, scrollAreaProps?.viewportRef);

	const [selectedOption, setSelectedOption] = useState<ComboboxItem>();

	/** Disable filter if search value equals selected option label. */
	const filterOptions = searchable && selectedOption?.label !== search;

	const {
		data: queryData,
		isFetching,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
	} = useInfiniteQuery({
		...omit(queryOptions, 'select'),
		queryKey: [...queryOptions.queryKey, debouncedSearch] as unknown as TQueryKey,
		queryFn: context => getData(context, { search: filterOptions ? search : undefined }),
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

	const handleOptionSubmit = useCallback(
		(value: string) => {
			onOptionSubmit?.(value, data);

			const parsed = getParsedComboboxData(data);
			const optionLockup = getOptionsLockup(parsed);
			const selected = optionLockup[value];

			setSelectedOption(selected);
		},
		[data, onOptionSubmit]
	);

	const handleSearchChange = useCallback(
		(value: string) => {
			setSearch(value);
			onSearchChange?.(value);
		},
		[onSearchChange]
	);

	const optionsFilter = useCallback<OptionsFilter>(({ options }) => {
		return options;
	}, []);

	return (
		<SelectBase
			{...props}
			ref={ref}
			data={data}
			defaultSearchValue={defaultSearchValue}
			dropdownLoading={isFetchingNextPage || dropdownLoading}
			filter={filter ? filter : optionsFilter}
			loading={isFetching || loading}
			mod={[{ infinite }, mod]}
			onOptionSubmit={handleOptionSubmit}
			onSearchChange={handleSearchChange}
			scrollAreaProps={{
				...scrollAreaProps,
				onScrollPositionChange: handleScrollPositionChange,
				viewportRef: mergedRef,
			}}
			searchable={searchable}
			searchValue={searchValue ?? search}
		/>
	);
}

export const SelectWithInfiniteQuery = forwardRef(SelectWithInfiniteQueryComponent);
