import { type ForwardedRef, forwardRef } from 'react';
import { type QueryKey, useQuery } from '@tanstack/react-query';

import { AutocompleteBase } from './autocomplete.base';
import { type AutocompleteWithQueryProps } from './autocomplete.types';

function AutocompleteWithQueryComponent<TQueryFnData = unknown, TError = Error, TQueryKey extends QueryKey = QueryKey>(
	{ queryOptions, getData, ...props }: AutocompleteWithQueryProps<TQueryFnData, TError, TQueryKey>,
	ref: ForwardedRef<HTMLInputElement>
) {
	const { data, isFetching } = useQuery({ ...queryOptions, queryFn: getData });

	return (
		<AutocompleteBase
			{...props}
			ref={ref}
			data={data}
			loading={isFetching}
		/>
	);
}

export const AutocompleteWithQuery = forwardRef(AutocompleteWithQueryComponent);
