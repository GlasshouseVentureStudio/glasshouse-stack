import { type ForwardedRef, forwardRef } from 'react';
import { type QueryKey } from '@tanstack/react-query';

import { SelectBase } from './select.base';
import { SelectWithInfiniteQuery } from './select.infinite-query';
import { SelectWithQuery } from './select.query';
import { type SelectProps } from './select.types';

const SelectComponent = <
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
>(
	props: SelectProps<TQueryFnData, TError, TQueryKey, TPageParam>,
	ref: ForwardedRef<HTMLInputElement>
) => {
	if (props.queryOptions) {
		if (props.infinite) {
			return <SelectWithInfiniteQuery {...props} />;
		}

		return <SelectWithQuery {...props} />;
	}

	return (
		<SelectBase
			{...props}
			ref={ref}
		/>
	);
};

export const Select = forwardRef(SelectComponent);
