import { type ForwardedRef, forwardRef, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { type QueryKey, useQuery } from '@tanstack/react-query';
import omit from 'lodash.omit';

import { SelectBase } from './select.base';
import { type SelectWithQueryProps } from './select.types';

function SelectWithQueryComponent<TQueryFnData = unknown, TError = Error, TQueryKey extends QueryKey = QueryKey>(
	{
		defaultSearchValue,
		getData,
		loading,
		onOptionSubmit,
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
		...omit(queryOptions, 'select'),
		queryKey: [...queryOptions.queryKey, debouncedSearch] as unknown as TQueryKey,
		queryFn: context => getData(context, { search }),
	});

	const options = data ? (queryOptions.select?.(data) ?? []) : [];

	return (
		<SelectBase
			{...props}
			ref={ref}
			data={options}
			defaultSearchValue={defaultSearchValue}
			loading={isFetching || loading}
			onOptionSubmit={value => onOptionSubmit?.(value, options, data)}
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

export const SelectWithQuery = forwardRef(SelectWithQueryComponent);
