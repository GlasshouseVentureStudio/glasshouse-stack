import { type ForwardedRef, forwardRef, useCallback, useMemo, useState } from 'react';
import { type ComboboxItem, getOptionsLockup, getParsedComboboxData, type OptionsFilter } from '@mantine/core';
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
		filter,
		searchable,
		...props
	}: SelectWithQueryProps<TQueryFnData, TError, TQueryKey>,
	ref: ForwardedRef<HTMLInputElement>
) {
	const [search, setSearch] = useState(defaultSearchValue ?? searchValue);
	const [debouncedSearch] = useDebouncedValue(search, 300);

	const [selectedOption, setSelectedOption] = useState<ComboboxItem>();

	/** Disable filter if search value equals selected option label. */
	const filterOptions = searchable && selectedOption?.label !== search;

	const { data: queryData, isLoading } = useQuery({
		...omit(queryOptions, 'select'),
		queryKey: [...queryOptions.queryKey, debouncedSearch] as unknown as TQueryKey,
		queryFn: context => getData(context, { search: filterOptions ? search : undefined }),
	});

	const options = useMemo(() => (queryData ? (queryOptions.select?.(queryData) ?? []) : []), [queryData, queryOptions]);

	/** Disable internal filtering when using query */
	const optionsFilter = useCallback<OptionsFilter>(({ options }) => {
		return options;
	}, []);

	const handleOptionSubmit = useCallback(
		(value: string) => {
			onOptionSubmit?.(value, options, queryData);

			const parsed = getParsedComboboxData(options);
			const optionLockup = getOptionsLockup(parsed);
			const selected = optionLockup[value];

			setSelectedOption(selected);
		},
		[queryData, onOptionSubmit, options]
	);

	const handleSearchChange = useCallback(
		(value: string) => {
			if (searchable) {
				setSearch(value);
				onSearchChange?.(value);
			}
		},
		[onSearchChange, searchable]
	);

	return (
		<SelectBase
			{...omit(props, ['dropdownLoadingType', 'dropdownLoading'])}
			ref={ref}
			data={options}
			defaultSearchValue={defaultSearchValue}
			filter={filter ? filter : optionsFilter}
			loading={isLoading || loading}
			onOptionSubmit={handleOptionSubmit}
			onSearchChange={handleSearchChange}
			searchable={searchable}
			searchValue={searchValue}
		/>
	);
}

export const SelectWithQuery = forwardRef(SelectWithQueryComponent);
