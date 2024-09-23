import { type ReactNode, type ReactPortal } from 'react';
import {
	type ComboboxData,
	type ComboboxParsedItem,
	type ComboboxStore,
	type MultiSelectProps as MantineMultiSelectProps,
	type TooltipProps,
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
 * Interface representing the base props for a multi-select component.
 *
 * @remarks
 * This interface extends the `MantineMultiSelectProps` interface and adds additional props for customizing the multi-select component.
 *
 * @public
 */
export interface MultiSelectBaseProps extends MantineMultiSelectProps {
	/**
	 * Indicates if new items can be created.
	 */
	creatable?: boolean;

	/**
	 * Validator function for the input value when creating a new item.
	 * @param value - The input value to validate.
	 * @returns A ReactNode excluding false, ReactPortal, or undefined.
	 */
	createInputValidator?: (value: string) => Exclude<ReactNode, false | ReactPortal | undefined>;
	/** Position where the creatable input should be rendered. Can be `header`, `footer`, or `inline`.
	 */
	creatablePosition?: 'header' | 'footer' | 'inline';
	/** Indicates if the dropdown is loading. */
	dropdownLoading?: boolean;
	/** Type of loading indicator to show in the dropdown. Can be `skeleton`, `overlay`, or `loader`. */
	dropdownLoadingType?: 'skeleton' | 'overlay' | 'loader';
	/** Indicates if the component is in a loading state. */
	loading?: boolean;
	/**
	 * Callback function when a new item is created.
	 * @param value - The value of the new item.
	 * @returns A ReactNode excluding false, ReactPortal, or undefined, or a Promise resolving to such a ReactNode.
	 */
	onCreate?: (
		value?: string
	) =>
		| Exclude<ReactNode, false | ReactPortal | undefined>
		| Promise<Exclude<ReactNode, false | ReactPortal | undefined>>;
	/**
	 * Callback function when there is an error creating a new item.
	 * @param value - The value of the new item.
	 * @param error - The error that occurred.
	 */
	onCreateError?: (value: string, error: Error) => void;
	/**
	 * Callback function when a new item is successfully created.
	 * @param value - The value of the new item.
	 */
	onCreateSuccess?: (value: string) => void;
	/**
	 * Function to render the dropdown.
	 * @param props - The properties for rendering the dropdown.
	 * @returns A ReactNode to render as the dropdown.
	 */
	renderDropdown?: (props: { data: ComboboxParsedItem[]; options: ReactNode }) => ReactNode;
	/**
	 * Function to render the footer of the dropdown.
	 * @param props - The properties for rendering the footer.
	 * @returns A ReactNode to render as the footer.
	 */
	renderFooter?: (props: { combobox: ComboboxStore; data: ComboboxParsedItem[] }) => ReactNode;
	/**
	 * Function to render the header of the dropdown.
	 * @param props - The properties for rendering the header.
	 * @returns A ReactNode to render as the header.
	 */
	renderHeader?: (props: { combobox: ComboboxStore; data: ComboboxParsedItem[] }) => ReactNode;
	/**
	 * Function to render the options in the dropdown.
	 * @param data - The parsed items to render.
	 * @param options - The ReactNode options to render.
	 * @returns A ReactNode to render as the options.
	 */
	renderOptions?: (data: ComboboxParsedItem[], options: ReactNode) => ReactNode;
	/**
	 * Indicates if the "select all" option is available.
	 * @deprecated Use `allowSelectAll` instead.
	 */
	canSelectAll?: boolean;
	/** Indicates if the "select all" option is available. */
	allowSelectAll?: boolean;
	/** Label for the "select all" option. */
	selectAllLabel?: string;
	/** Limit max number of values that can be displayed in input. Default `999`. */
	maxDisplayedValues?: number;
	/**
	 * Label for max displayed values. Default is blank.
	 *
	 * @example
	 * <Multiselect
	 *   maxDisplayedValues={2}
	 *   renderMaxDisplayedValuesLabel=' more' // will display '+2 more'
	 *   {...props}
	 * />
	 * @example
	 * <Multiselect
	 *  maxDisplayedValues={2}
	 *  renderMaxDisplayedValuesLabel={count => `+${count} more`} // will display '+2 more'
	 * {...props}
	 */
	renderMaxDisplayedValuesLabel?: (count: number) => React.ReactNode;
	/**
	 * The display mode of the component.
	 * - `pills`: Selected items are displayed as pills.
	 * - `texts`: Selected items are displayed as plain text.
	 */
	mode?: 'pills' | 'texts';
	/** Hide search when values are selected and hide values when search is focused. */
	floatingInput?: boolean;
	/**
	 * Only works when `floatingInput` is `true`.
	 *
	 * Limit number of plain text value lines when `mode` is `texts`.
	 *
	 * Limit number of pill lines when `mode` is `pills`, only works when `lineClamp` is `1`.
	 */
	lineClamp?: number;
	/** Whether to show tooltip with remaining values when maxDisplayedValues is specify */
	withMaxDisplayedValuesTooltip?: boolean;
	/** What to display inside remaining values tooltip */
	maxDisplayedValuesTooltipType?: 'pills' | 'texts';
	/** Tooltip props for max displayed values label. Default `true`. */
	tooltipProps?: TooltipProps;
}

export interface MultiSelectWithQueryProps<
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
> extends Omit<MultiSelectBaseProps, 'data'> {
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
	onOptionSubmit?: (value: string, options?: ComboboxData, data?: TQueryFnData) => void;
}

export interface MultiSelectWithInfiniteQueryProps<
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
> extends Omit<MultiSelectBaseProps, 'data'> {
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
	onOptionSubmit?: (value: string, options?: ComboboxData, data?: TQueryFnData) => void;
}

interface MultiSelectWithoutQueryProps extends MultiSelectBaseProps {
	getData?: undefined;
	infinite?: undefined;
	queryOptions?: undefined;
}

export type MultiSelectProps<
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
> =
	| MultiSelectWithQueryProps<TQueryFnData, TError, TQueryKey>
	| MultiSelectWithInfiniteQueryProps<TQueryFnData, TError, TQueryKey, TPageParam>
	| MultiSelectWithoutQueryProps;
