import { type ReactNode, type ReactPortal } from 'react';
import {
	type AutocompleteProps as MantineAutocompleteProps,
	type ComboboxData,
	type ComboboxParsedItem,
	type ComboboxStore,
} from '@mantine/core';
import {
	type InfiniteData,
	type QueryFunction,
	type QueryKey,
	type UndefinedInitialDataInfiniteOptions,
	type UseQueryOptions,
} from '@tanstack/react-query';

export interface AutocompleteBaseProps extends MantineAutocompleteProps {
	creatable?: boolean;
	createInputValidator?: (value: string) => Exclude<ReactNode, false | ReactPortal | undefined>;
	creatablePosition?: 'header' | 'footer' | 'search';
	dropdownLoading?: boolean;
	dropdownLoadingType?: 'skeleton' | 'overlay' | 'loader';
	loading?: boolean;
	onCreate?: (
		value?: string
	) =>
		| Exclude<ReactNode, false | ReactPortal | undefined>
		| Promise<Exclude<ReactNode, false | ReactPortal | undefined>>;
	onCreateError?: (value: string, error: Error) => void;
	onCreateSuccess?: (value: string) => void;
	renderDropdown?: (props: { data: ComboboxParsedItem[]; options: ReactNode }) => ReactNode;
	renderFooter?: (props: { combobox: ComboboxStore; data: ComboboxParsedItem[] }) => ReactNode;
	renderHeader?: (props: { combobox: ComboboxStore; data: ComboboxParsedItem[] }) => ReactNode;
	renderOptions?: (data: ComboboxParsedItem[], options: ReactNode) => ReactNode;
}

export interface AutocompleteWithQueryProps<
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
> extends Omit<AutocompleteBaseProps, 'data'> {
	getData: QueryFunction<TQueryFnData, TQueryKey>;
	infinite?: false;
	queryOptions: Omit<UseQueryOptions<TQueryFnData, TError, ComboboxData, TQueryKey>, 'queryFn'>;
}

export interface AutocompleteWithInfiniteQueryProps<
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
> extends Omit<AutocompleteBaseProps, 'data'> {
	getData: QueryFunction<TQueryFnData, TQueryKey, TPageParam>;
	infinite: true;
	queryOptions: Omit<
		UndefinedInitialDataInfiniteOptions<TQueryFnData, TError, InfiniteData<ComboboxData>, TQueryKey, TPageParam>,
		'queryFn'
	>;
	scrollThreshold?: number;
}

interface AutocompleteWithoutQueryProps extends AutocompleteBaseProps {
	getData?: undefined;
	infinite?: undefined;
	queryOptions?: undefined;
}

export type AutocompleteProps<
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
> =
	| AutocompleteWithQueryProps<TQueryFnData, TError, TQueryKey>
	| AutocompleteWithInfiniteQueryProps<TQueryFnData, TError, TQueryKey, TPageParam>
	| AutocompleteWithoutQueryProps;
