import { type ReactNode, type ReactPortal } from 'react';
import {
	type AutocompleteProps as MantineAutocompleteProps,
	type ComboboxData,
	type ComboboxParsedItem,
	type ComboboxStore,
} from '@mantine/core';
import {
	type InfiniteData,
	type QueryFunctionContext,
	type QueryKey,
	type QueryMeta,
	type UndefinedInitialDataInfiniteOptions,
	type UseQueryOptions,
} from '@tanstack/react-query';

export interface AutocompleteBaseProps extends MantineAutocompleteProps {
	creatable?: boolean;
	createInputValidator?: (value: string) => Exclude<ReactNode, false | ReactPortal | undefined>;
	creatablePosition?: 'header' | 'footer' | 'inline';
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
> extends Omit<AutocompleteBaseProps, 'data' | 'onOptionSubmit'> {
	getData: (
		context: {
			queryKey: TQueryKey;
			signal: AbortSignal;
			meta: QueryMeta | undefined;
			pageParam?: unknown;
			direction?: unknown;
		},
		params: { search?: string }
	) => TQueryFnData | Promise<TQueryFnData>;
	infinite?: false;
	onOptionSubmit?: (value: string, options?: ComboboxData, data?: TQueryFnData) => void;
	queryOptions: Omit<UseQueryOptions<TQueryFnData, TError, ComboboxData, TQueryKey>, 'queryFn'>;
}

export interface AutocompleteWithInfiniteQueryProps<
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
> extends Omit<AutocompleteBaseProps, 'data'> {
	getData: (
		context: QueryFunctionContext<TQueryKey, TPageParam>,
		params: { search?: string }
	) => TQueryFnData | Promise<TQueryFnData>;
	infinite: true;
	onOptionSubmit?: (value: string, options?: ComboboxData, data?: TQueryFnData) => void;
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
