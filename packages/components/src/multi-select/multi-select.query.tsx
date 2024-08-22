import { type ForwardedRef, forwardRef, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { keepPreviousData, type QueryKey, useQuery } from '@tanstack/react-query';

import { MultiSelectBase } from './multi-select.base';
import { type MultiSelectWithQueryProps } from './multi-select.types';

function MultiSelectWithQueryComponent<TQueryFnData = unknown, TError = Error, TQueryKey extends QueryKey = QueryKey>(
	{
		defaultSearchValue,
		getData,
		loading,
		onSearchChange,
		queryOptions,
		searchValue,
		...props
	}: MultiSelectWithQueryProps<TQueryFnData, TError, TQueryKey>,
	ref: ForwardedRef<HTMLInputElement>
) {
	const [search, setSearch] = useState(defaultSearchValue ?? searchValue);
	const [debouncedSearch] = useDebouncedValue(search, 300);
	const { data, isFetching } = useQuery({
		placeholderData: keepPreviousData,
		...queryOptions,
		queryKey: [...queryOptions.queryKey, debouncedSearch] as unknown as TQueryKey,
		queryFn: context => getData(context, { search }),
	});

	return (
		<MultiSelectBase
			{...props}
			ref={ref}
			data={data}
			defaultSearchValue={defaultSearchValue}
			loading={isFetching || loading}
			onSearchChange={value => {
				if (props.searchable) {
					setSearch(value);
					onSearchChange?.(value);
				}
			}}
			searchValue={searchValue}
		/>
	);
}

export const MultiSelectWithQuery = forwardRef(MultiSelectWithQueryComponent);
