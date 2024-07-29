import { type ForwardedRef, forwardRef } from 'react';
import { type QueryKey, useQuery } from '@tanstack/react-query';

import { SelectBase } from './select.base';
import { type SelectWithQueryProps } from './select.types';

function SelectWithQueryComponent<TQueryFnData = unknown, TError = Error, TQueryKey extends QueryKey = QueryKey>(
	{ queryOptions, getData, ...props }: SelectWithQueryProps<TQueryFnData, TError, TQueryKey>,
	ref: ForwardedRef<HTMLInputElement>
) {
	const { data, isFetching } = useQuery({ ...queryOptions, queryFn: getData });

	return (
		<SelectBase
			{...props}
			ref={ref}
			data={data}
			loading={isFetching}
		/>
	);
}

export const SelectWithQuery = forwardRef(SelectWithQueryComponent);
