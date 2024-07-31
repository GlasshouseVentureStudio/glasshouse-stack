import { type ForwardedRef, forwardRef, useState } from 'react';
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
	const { data, isFetching } = useQuery({
		...queryOptions,
		queryKey: [...queryOptions.queryKey, search] as unknown as TQueryKey,
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
