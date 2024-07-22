import {
	type DefaultError,
	type InfiniteData,
	type QueryKey,
	type UndefinedInitialDataInfiniteOptions,
	type UseQueryOptions,
} from '@tanstack/react-query';
import {
	type MRT_ColumnFiltersState,
	type MRT_DisplayColumnDef,
	type MRT_DisplayColumnIds,
	type MRT_RowData,
	type MRT_TableOptions,
	type MRT_TableState,
} from 'mantine-react-table';

export type DisplayColumnIds = MRT_DisplayColumnIds | 'mrt-table-actions';

export interface GetDataParams {
	pageIndex: number;
	pageSize: number;
	orderBy?: string;
	orderDirection?: 'ASC' | 'DESC';
	filters?: MRT_ColumnFiltersState;
}

export type GetDataFn<TQueryFnData> = (params: GetDataParams) => Promise<TQueryFnData>;

export interface DataTableBaseProps<TData extends MRT_RowData>
	extends Omit<MRT_TableOptions<TData>, 'displayColumnDefOptions'> {
	columnDragHandleDisplayMode?: 'cell' | 'button';
	displayColumnDefOptions?: Partial<Record<DisplayColumnIds, Partial<MRT_DisplayColumnDef<TData>>>>;
	enableTableActionsColumn?: boolean;
	statesStorageProvider?: {
		get: (statesStorageKey?: string) => Partial<MRT_TableState<TData>> | undefined;
		set: (state: MRT_TableState<TData>, statesStorageKey?: string) => void;
		clear: (statesStorageKey?: string) => void;
	};
	excludeStates?: (keyof MRT_TableState<TData>)[];
	statesStorageKey?: string;
}

export interface DataTableWithQueryProps<
	TData extends MRT_RowData,
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
> extends Omit<DataTableBaseProps<TData>, 'data'> {
	getData: GetDataFn<TQueryFnData>;
	infinite?: false;
	queryOptions: Omit<UseQueryOptions<TQueryFnData, TError, TData[], TQueryKey>, 'queryFn'>;
	getRowCount?: (data?: TQueryFnData) => number;
}

export interface DataTableWithInfiniteQueryProps<
	TData extends MRT_RowData,
	TQueryFnData = unknown,
	TError = DefaultError,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam extends number = number,
> extends Omit<DataTableBaseProps<TData>, 'data'> {
	getData: GetDataFn<TQueryFnData>;
	infinite: true;
	queryOptions: Omit<
		UndefinedInitialDataInfiniteOptions<TQueryFnData, TError, InfiniteData<TData[]>, TQueryKey, TPageParam>,
		'queryFn'
	>;
	getRowCount?: (data?: TQueryFnData) => number;
	scrollThreshold?: number | string;
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
	TPageParam extends number = number,
> =
	| DataTableWithQueryProps<TData, TQueryFnData, TError, TQueryKey>
	| DataTableWithInfiniteQueryProps<TData, TQueryFnData, TError, TQueryKey, TPageParam>
	| DataTablePropsWithoutQuery<TData, TQueryFnData>;
