'use client';

import { type QueryKey } from '@tanstack/react-query';
import { type MRT_RowData, type MRT_TableInstance, type Xor } from 'mantine-react-table';

import { type DataTableProps } from './data-table.types';
import { DataTableBase } from './data-table-base';
import { useDataTable } from './hooks';

interface DataTableInstanceProp<TData extends MRT_RowData> {
	table: MRT_TableInstance<TData>;
}

type TableProps<
	TData extends MRT_RowData,
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
> = Xor<DataTableInstanceProp<TData>, DataTableProps<TData, TQueryFnData, TError, TQueryKey, TPageParam>>;

const isDataTableInstanceProp = <
	TData extends MRT_RowData,
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
>(
	props: TableProps<TData, TQueryFnData, TError, TQueryKey, TPageParam>
): props is DataTableInstanceProp<TData> => props.table !== undefined;

export const DataTable = <
	TData extends MRT_RowData,
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam = unknown,
>(
	props: TableProps<TData, TQueryFnData, TError, TQueryKey, TPageParam>
) => {
	let table: MRT_TableInstance<TData>;

	if (isDataTableInstanceProp(props)) {
		table = props.table;
	} else {
		// eslint-disable-next-line react-compiler/react-compiler -- should be safe for library
		// eslint-disable-next-line react-hooks/rules-of-hooks -- safe for this pattern
		table = useDataTable(props);
	}

	return <DataTableBase table={table} />;
};
