import { type ForwardedRef, forwardRef, useState } from 'react';
import { type QueryKey, useQuery } from '@tanstack/react-query';

import { AutocompleteBase } from './autocomplete.base';
import { type AutocompleteWithQueryProps } from './autocomplete.types';

function AutocompleteWithQueryComponent<TQueryFnData = unknown, TError = Error, TQueryKey extends QueryKey = QueryKey>(
	{
		defaultValue,
		getData,
		loading,
		onChange,
		onOptionSubmit,
		queryOptions,
		value,
		...props
	}: AutocompleteWithQueryProps<TQueryFnData, TError, TQueryKey>,
	ref: ForwardedRef<HTMLInputElement>
) {
	const [search, setSearch] = useState(defaultValue ?? value);
	const { data, isFetching } = useQuery({
		...queryOptions,
		queryKey: [...queryOptions.queryKey, search] as unknown as TQueryKey,
		queryFn: context => getData(context, { search }),
	});

	return (
		<AutocompleteBase
			{...props}
			ref={ref}
			data={data}
			defaultValue={defaultValue}
			loading={isFetching || loading}
			onChange={value => {
				setSearch(value);
				onChange?.(value);
			}}
			onOptionSubmit={value => onOptionSubmit?.(value, data)}
			value={value}
		/>
	);
}

export const AutocompleteWithQuery = forwardRef(AutocompleteWithQueryComponent);
