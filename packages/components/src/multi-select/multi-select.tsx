import { type ForwardedRef, forwardRef } from 'react';
import { type QueryKey } from '@tanstack/react-query';

import { MultiSelectBase } from './multi-select.base';
import { MultiSelectWithInfiniteQuery } from './multi-select.infinite-query';
import { MultiSelectWithQuery } from './multi-select.query';
import { type MultiSelectProps } from './multi-select.types';

/**
 * Renders a multi-select component based on the provided props.
 *
 * @template TQueryFnData - The data type returned by the query function.
 * @template TError - The error type thrown by the query function.
 * @template TQueryKey - The type of the query key.
 * @template TPageParam - The type of the page parameter.
 *
 * @param props - The props for the multi-select component.
 * @param ref - The ref for the input element.
 *
 * @returns The rendered multi-select component.
 */
const MultiSelectComponent = <
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
>(
	props: MultiSelectProps<TQueryFnData, TError, TQueryKey, TPageParam>,
	ref: ForwardedRef<HTMLInputElement>
) => {
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
};

export const MultiSelect = forwardRef(MultiSelectComponent);
