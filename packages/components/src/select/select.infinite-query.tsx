import { type ForwardedRef, forwardRef, useCallback, useMemo, useState } from 'react';
import { type ComboboxItem, getOptionsLockup, getParsedComboboxData, type OptionsFilter } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
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
		getData,
		loading,
		onOptionSubmit,
		onSearchChange,
		queryOptions,
		searchValue,
		infinite,
		mod,
		searchable,
		filter,
		onDropdownEndReached,
		...props
	}: SelectWithInfiniteQueryProps<TQueryFnData, TError, TQueryKey, TPageParam>,
	ref: ForwardedRef<HTMLInputElement>
) {
	const [search, setSearch] = useState(defaultSearchValue ?? searchValue);
	const [debouncedSearch] = useDebouncedValue(search, 300);

	const [selectedOption, setSelectedOption] = useState<ComboboxItem>();

	/** Disable filter if search value equals selected option label. */
	const filterOptions = searchable && selectedOption?.label !== search;

	const {
		data: queryData,
		isLoading,
		isFetching,
		hasNextPage,
		fetchNextPage,
	} = useInfiniteQuery({
		...omit(queryOptions, 'select'),
		queryKey: [...queryOptions.queryKey, debouncedSearch] as unknown as TQueryKey,
		queryFn: context => getData(context, { search: filterOptions ? search : undefined }),
	});

	const options = queryData ? queryOptions.select?.(queryData as InfiniteData<TQueryFnData, TPageParam>) : undefined;

	const data = useMemo(() => options?.pages.flatMap(page => page) ?? [], [options?.pages]);

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

	/** Disable internal filtering when using query */
	const optionsFilter = useCallback<OptionsFilter>(({ options }) => {
		return options;
	}, []);

	const handleOnDropdownEndReached = useCallback(() => {
		onDropdownEndReached?.();

		if (hasNextPage) {
			void fetchNextPage();
		}
	}, [fetchNextPage, hasNextPage, onDropdownEndReached]);

	return (
		<SelectBase
			{...omit(props, ['dropdownLoadingType', 'dropdownLoading'])}
			ref={ref}
			data={data}
			defaultSearchValue={defaultSearchValue}
			filter={filter ? filter : optionsFilter}
			loading={loading ?? (isLoading || isFetching)}
			mod={[{ infinite }, mod]}
			onDropdownEndReached={handleOnDropdownEndReached}
			onOptionSubmit={handleOptionSubmit}
			onSearchChange={handleSearchChange}
			searchable={searchable}
			searchValue={searchValue ?? search}
		/>
	);
}

export const SelectWithInfiniteQuery = forwardRef(SelectWithInfiniteQueryComponent);
