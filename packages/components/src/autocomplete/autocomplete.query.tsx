import { type ForwardedRef, forwardRef, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { type QueryKey, useQuery } from '@tanstack/react-query';
import omit from 'lodash.omit';

import { AutocompleteBase } from './autocomplete.base';
import { type AutocompleteWithQueryProps } from './autocomplete.types';

const AutocompleteWithQueryComponent = <TQueryFnData = unknown, TError = Error, TQueryKey extends QueryKey = QueryKey>(
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
) => {
	const [search, setSearch] = useState(defaultValue ?? value);
	const [debouncedSearch] = useDebouncedValue(search, 300);
	const { data, isFetching } = useQuery({
		...omit(queryOptions, 'select'),
		queryKey: [...queryOptions.queryKey, debouncedSearch] as unknown as TQueryKey,
		queryFn: context => getData(context, { search }),
	});

	const options = data ? queryOptions.select?.(data) : [];

	return (
		<AutocompleteBase
			{...props}
			ref={ref}
			data={options}
			defaultValue={defaultValue}
			loading={isFetching || loading}
			onOptionSubmit={value => onOptionSubmit?.(value, options, data)}
			value={value}
			onChange={value => {
				setSearch(value);
				onChange?.(value);
			}}
		/>
	);
};

export const AutocompleteWithQuery = forwardRef(AutocompleteWithQueryComponent);
