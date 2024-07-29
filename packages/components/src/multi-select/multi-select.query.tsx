import { type ForwardedRef, forwardRef } from 'react';
import { type QueryKey, useQuery } from '@tanstack/react-query';

import { MultiSelectBase } from './multi-select.base';
import { type MultiSelectWithQueryProps } from './multi-select.types';

function MultiSelectWithQueryComponent<TQueryFnData = unknown, TError = Error, TQueryKey extends QueryKey = QueryKey>(
	{ queryOptions, getData, ...props }: MultiSelectWithQueryProps<TQueryFnData, TError, TQueryKey>,
	ref: ForwardedRef<HTMLInputElement>
) {
	const { data, isFetching } = useQuery({ ...queryOptions, queryFn: getData });

	return (
		<MultiSelectBase
			{...props}
			ref={ref}
			data={data}
			loading={isFetching}
		/>
	);
}

export const MultiSelectWithQuery = forwardRef(MultiSelectWithQueryComponent);
