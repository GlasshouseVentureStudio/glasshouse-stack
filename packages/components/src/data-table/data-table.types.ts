import { type FC } from 'react';
import { type ProgressProps } from '@mantine/core';
import {
	type DefaultError,
	type InfiniteData,
	type QueryFunctionContext,
	type QueryKey,
	type UndefinedInitialDataInfiniteOptions,
	type UseQueryOptions,
} from '@tanstack/react-query';
import {
	type HTMLPropsRef,
	type MRT_DisplayColumnDef,
	type MRT_DisplayColumnIds,
	type MRT_Icons,
	type MRT_Localization,
	type MRT_RowData,
	type MRT_TableInstance,
	type MRT_TableOptions,
	type MRT_TableState,
} from 'mantine-react-table';

export type DisplayColumnIds = MRT_DisplayColumnIds | 'mrt-table-actions';

export interface DataTableOptions<TData extends MRT_RowData> extends MRT_TableOptions<TData> {
	columnsControlMenuProps?: {
		withColumnDragHandles?: boolean;
		withColumnPinningButtons?: boolean;
		withQuickActions?: boolean;
	};
}

export type GetDataFn<
	TData extends MRT_RowData,
	TQueryFnData,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = never,
> = (
	context: QueryFunctionContext<TQueryKey, TPageParam>,
	tableState: Pick<MRT_TableState<TData>, 'columnFilters' | 'pagination' | 'sorting'>
) => Promise<TQueryFnData>;

export interface StateStorageProvider<TData extends MRT_RowData> {
	get: (statesStorageKey?: string) => Partial<MRT_TableState<TData>> | undefined;
	set: (state: MRT_TableState<TData>, statesStorageKey?: string) => void;
	clear: (statesStorageKey?: string) => void;
}

export interface StatefulDataTableOptions<TData extends MRT_RowData> extends DefinedDataTableOptions<TData> {
	state: Pick<
		MRT_TableState<TData>,
		| 'columnFilterFns'
		| 'columnOrder'
		| 'columnSizingInfo'
		| 'creatingRow'
		| 'density'
		| 'draggingColumn'
		| 'draggingRow'
		| 'editingCell'
		| 'editingRow'
		| 'globalFilterFn'
		| 'grouping'
		| 'hoveredColumn'
		| 'hoveredRow'
		| 'isFullScreen'
		| 'pagination'
		| 'showAlertBanner'
		| 'showColumnFilters'
		| 'showGlobalFilter'
		| 'showToolbarDropZone'
	>;
}

export type DataTableIcons = Record<keyof MRT_Icons, FC>;

export type DefinedDataTableOptions<TData extends MRT_RowData> = Omit<
	DataTableOptions<TData>,
	'icons' | 'localization'
> & {
	icons: DataTableIcons;
	localization: MRT_Localization;
};

export interface DataTableInstance<TData extends MRT_RowData> extends MRT_TableInstance<TData> {
	options: StatefulDataTableOptions<TData>;
}

export interface DataTableBaseProps<TData extends MRT_RowData>
	extends Omit<DataTableOptions<TData>, 'displayColumnDefOptions' | 'paginationDisplayMode'> {
	columnDragHandleDisplayMode?: 'cell' | 'button';
	displayColumnDefOptions?: Partial<Record<DisplayColumnIds, Partial<MRT_DisplayColumnDef<TData>>>>;
	enableTableActionsColumn?: boolean;
	excludeStates?: (keyof MRT_TableState<TData>)[];
	paginationDisplayMode?: MRT_TableOptions<TData>['paginationDisplayMode'] | 'simple';
	statesStorageKey?: string;
	statesStorageProvider?: StateStorageProvider<TData>;
}

export interface DataTableWithQueryProps<
	TData extends MRT_RowData,
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
> extends Omit<DataTableBaseProps<TData>, 'data'> {
	getData: GetDataFn<TData, TQueryFnData, TQueryKey>;
	infinite?: false;
	queryOptions: Omit<UseQueryOptions<TQueryFnData, TError, TData[], TQueryKey>, 'queryFn'>;
	getRowCount?: (data?: TQueryFnData) => number;
	onDataFetch?: (data?: TQueryFnData) => void;
}

export interface DataTableWithInfiniteQueryProps<
	TData extends MRT_RowData,
	TQueryFnData = unknown,
	TError = DefaultError,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
> extends Omit<DataTableBaseProps<TData>, 'data'> {
	getData: GetDataFn<TData, TQueryFnData, TQueryKey, TPageParam>;
	infinite: true;
	queryOptions: Omit<
		UndefinedInitialDataInfiniteOptions<TQueryFnData, TError, InfiniteData<TData[]>, TQueryKey, TPageParam>,
		'queryFn'
	>;
	getRowCount?: (data?: TQueryFnData) => number;
	scrollThreshold?: number | string;
	enableLoadMoreButton?: boolean;
	renderLoadMoreButton?: (props: LoadMoreButtonProps) => React.ReactNode;
	onDataFetch?: (data?: InfiniteData<TQueryFnData, TPageParam>) => void;
}

interface DataTablePropsWithoutQuery<TData extends MRT_RowData, TQueryFnData = unknown>
	extends DataTableBaseProps<TData> {
	queryOptions?: undefined;
	infinite?: undefined;
	getData?: undefined;
	getRowCount?: (data?: TQueryFnData) => number;
}

export type DataTableProps<
	TData extends MRT_RowData,
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
> =
	| DataTableWithQueryProps<TData, TQueryFnData, TError, TQueryKey>
	| DataTableWithInfiniteQueryProps<TData, TQueryFnData, TError, TQueryKey, TPageParam>
	| DataTablePropsWithoutQuery<TData, TQueryFnData>;

export interface LoadMoreButtonProps {
	isFetching?: boolean;
	onClick?: () => void;
	hasNextPage?: boolean;
}

export type MantineReactTableMantineProgressProps<TData extends MRT_RowData> = (props: {
	isTopToolbar: boolean;
	table: MRT_TableInstance<TData>;
}) => HTMLPropsRef<HTMLDivElement> & ProgressProps;
