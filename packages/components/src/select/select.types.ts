import { type ReactNode, type ReactPortal } from 'react';
import {
	type ComboboxData,
	type ComboboxParsedItem,
	type ComboboxStore,
	type OptionsData,
	type SelectProps as MantineSelectProps,
} from '@mantine/core';
import {
	type InfiniteData,
	type QueryFunctionContext,
	type QueryKey,
	type QueryMeta,
	type UndefinedInitialDataInfiniteOptions,
	type UseQueryOptions,
} from '@tanstack/react-query';

/**
 * Interface representing the base properties for a Select component.
 * Extends the properties from MantineSelectProps.
 */
export interface SelectBaseProps extends MantineSelectProps {
	/** Indicates if new options can be created. */
	creatable?: boolean;
	/** Function to validate the input value when creating a new option. */
	createInputValidator?: (value: string, data: OptionsData) => Exclude<ReactNode, false | ReactPortal | undefined>;
	/** Position where the creatable input should be rendered. */
	creatablePosition?: 'header' | 'footer' | 'inline';
	/** @deprecated Use `loading` instead. Indicates if the dropdown is loading. */
	dropdownLoading?: boolean;
	/** @deprecated Use `loadingType` instead. Type of loading indicator for the dropdown. */
	dropdownLoadingType?: 'skeleton' | 'overlay' | 'loader';
	/** Type of loading indicator. */
	loadingType?: 'skeleton' | 'overlay' | 'loader';
	/** Indicates if the component is in a loading state. */
	loading?: boolean;
	/** Callback function triggered when a new option is created. */
	onCreate?: (
		value?: string
	) =>
		| Exclude<ReactNode, false | ReactPortal | undefined>
		| Promise<Exclude<ReactNode, false | ReactPortal | undefined>>;
	/** Callback function triggered when there is an error creating a new option. */
	onCreateError?: (value: string, error: Error) => void;
	/** Callback function triggered when a new option is successfully created. */
	onCreateSuccess?: (value: string) => void;
	/** Function to render the dropdown. */
	renderDropdown?: (props: { data: ComboboxParsedItem[]; options: ReactNode }) => ReactNode;
	/** Function to render the footer of the dropdown. */
	renderFooter?: (props: { combobox: ComboboxStore; data: ComboboxParsedItem[] }) => ReactNode;
	/** Function to render the header of the dropdown. */
	renderHeader?: (props: { combobox: ComboboxStore; data: ComboboxParsedItem[] }) => ReactNode;
	/** Function to render the options in the dropdown. */
	renderOptions?: (data: ComboboxParsedItem[], options: ReactNode) => ReactNode;
	onDropdownEndReached?: () => void;
}

export interface SelectWithQueryProps<TQueryFnData = unknown, TError = Error, TQueryKey extends QueryKey = QueryKey>
	extends Omit<SelectBaseProps, 'data' | 'onOptionSubmit'> {
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

export interface SelectWithInfiniteQueryProps<
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
> extends Omit<SelectBaseProps, 'data' | 'onOptionSubmit'> {
	getData: (
		context: QueryFunctionContext<TQueryKey, TPageParam>,
		params: { search?: string }
	) => TQueryFnData | Promise<TQueryFnData>;
	infinite: true;
	queryOptions: Omit<
		UndefinedInitialDataInfiniteOptions<TQueryFnData, TError, InfiniteData<ComboboxData>, TQueryKey, TPageParam>,
		'queryFn'
	>;
	onOptionSubmit?: (value: string, options?: ComboboxData, data?: TQueryFnData) => void;
}

interface SelectPropsWithoutQuery extends SelectBaseProps {
	getData?: undefined;
	infinite?: undefined;
	queryOptions?: undefined;
}

export type SelectProps<
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
> =
	| SelectWithQueryProps<TQueryFnData, TError, TQueryKey>
	| SelectWithInfiniteQueryProps<TQueryFnData, TError, TQueryKey, TPageParam>
	| SelectPropsWithoutQuery;
