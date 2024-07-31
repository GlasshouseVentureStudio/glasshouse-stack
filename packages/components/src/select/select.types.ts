import { type ReactNode, type ReactPortal } from 'react';
import {
	type ComboboxData,
	type ComboboxParsedItem,
	type ComboboxStore,
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

export interface SelectBaseProps extends MantineSelectProps {
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

export interface SelectWithQueryProps<TQueryFnData = unknown, TError = Error, TQueryKey extends QueryKey = QueryKey>
	extends Omit<SelectBaseProps, 'data'> {
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
	queryOptions: Omit<UseQueryOptions<TQueryFnData, TError, ComboboxData, TQueryKey>, 'queryFn'>;
}

export interface SelectWithInfiniteQueryProps<
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
> extends Omit<SelectBaseProps, 'data'> {
	getData: (
		context: QueryFunctionContext<TQueryKey, TPageParam>,
		params: { search?: string }
	) => TQueryFnData | Promise<TQueryFnData>;
	infinite: true;
	queryOptions: Omit<
		UndefinedInitialDataInfiniteOptions<TQueryFnData, TError, InfiniteData<ComboboxData>, TQueryKey, TPageParam>,
		'queryFn'
	>;
	scrollThreshold?: number;
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
