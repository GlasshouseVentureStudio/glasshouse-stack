import { type ForwardedRef, forwardRef } from 'react';
import { type QueryKey } from '@tanstack/react-query';

import { AutocompleteBase } from './autocomplete.base';
import { AutocompleteWithInfiniteQuery } from './autocomplete.infinite-query';
import { AutocompleteWithQuery } from './autocomplete.query';
import { type AutocompleteProps } from './autocomplete.types';

function AutocompleteComponent<
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
>(props: AutocompleteProps<TQueryFnData, TError, TQueryKey, TPageParam>, ref: ForwardedRef<HTMLInputElement>) {
	if (props.queryOptions) {
		if (props.infinite) {
			return <AutocompleteWithInfiniteQuery {...props} />;
		}

		return <AutocompleteWithQuery {...props} />;
	}

	return (
		<AutocompleteBase
			{...props}
			ref={ref}
		/>
	);
}

export const Autocomplete = forwardRef(AutocompleteComponent);
