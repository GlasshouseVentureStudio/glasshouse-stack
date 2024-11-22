import { type ForwardedRef, forwardRef, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
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
		searchValue,
		onDropdownEndReached,
		...props
	}: MultiSelectWithInfiniteQueryProps<TQueryFnData, TError, TQueryKey, TPageParam>,
	ref: ForwardedRef<HTMLInputElement>
) {
	const [search, setSearch] = useState(defaultSearchValue ?? searchValue);
	const [debouncedSearch] = useDebouncedValue(search, 300);

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

	const handleDropdownEndReached = () => {
		onDropdownEndReached?.();

		if (hasNextPage) {
			void fetchNextPage();
		}
	};

	return (
		<MultiSelectBase
			{...omit(props, ['dropdownLoadingType', 'dropdownLoading'])}
			ref={ref}
			data={data}
			defaultSearchValue={defaultSearchValue}
			loading={loading ?? (isLoading || isFetching)}
			onDropdownEndReached={handleDropdownEndReached}
			onOptionSubmit={value => onOptionSubmit?.(value, data)}
			onSearchChange={value => {
				setSearch(value);
				onSearchChange?.(value);
			}}
			searchValue={searchValue}
		/>
	);
}

export const MultiSelectWithInfiniteQuery = forwardRef(MultiSelectWithInfiniteQueryComponent);
