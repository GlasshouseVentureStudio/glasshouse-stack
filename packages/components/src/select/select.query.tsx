import { type ForwardedRef, forwardRef, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { type QueryKey, useQuery } from '@tanstack/react-query';

import { SelectBase } from './select.base';
import { type SelectWithQueryProps } from './select.types';

function SelectWithQueryComponent<TQueryFnData = unknown, TError = Error, TQueryKey extends QueryKey = QueryKey>(
	{
		defaultSearchValue,
		getData,
		loading,
		onSearchChange,
		queryOptions,
		searchValue,
		...props
	}: SelectWithQueryProps<TQueryFnData, TError, TQueryKey>,
	ref: ForwardedRef<HTMLInputElement>
) {
	const [search, setSearch] = useState(defaultSearchValue ?? searchValue);
	const [debouncedSearch] = useDebouncedValue(search, 300);
	const { data, isFetching } = useQuery({
		...queryOptions,
		queryKey: [...queryOptions.queryKey, debouncedSearch] as unknown as TQueryKey,
		queryFn: context => getData(context, { search }),
	});

	return (
		<SelectBase
			{...props}
			ref={ref}
			data={data}
			defaultSearchValue={defaultSearchValue}
			loading={isFetching || loading}
			onSearchChange={value => {
				setSearch(value);
				onSearchChange?.(value);
			}}
			searchValue={searchValue}
		/>
	);
}

export const SelectWithQuery = forwardRef(SelectWithQueryComponent);
