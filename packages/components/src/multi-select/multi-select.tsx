import { type ForwardedRef, forwardRef } from 'react';
import { type QueryKey } from '@tanstack/react-query';

import { MultiSelectBase } from './multi-select.base';
import { MultiSelectWithInfiniteQuery } from './multi-select.infinite-query';
import { MultiSelectWithQuery } from './multi-select.query';
import { type MultiSelectProps } from './multi-select.types';

function MultiSelectComponent<
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
>(props: MultiSelectProps<TQueryFnData, TError, TQueryKey, TPageParam>, ref: ForwardedRef<HTMLInputElement>) {
	if (props.queryOptions) {
		if (props.infinite) {
			return <MultiSelectWithInfiniteQuery {...props} />;
		}

		return <MultiSelectWithQuery {...props} />;
	}

	return (
		<MultiSelectBase
			{...props}
			ref={ref}
		/>
	);
}

export const MultiSelect = forwardRef(MultiSelectComponent);
