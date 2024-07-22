'use client';

import { type QueryKey } from '@tanstack/react-query';
import { type MRT_RowData } from 'mantine-react-table';

import { type DataTableProps } from './data-table.types';
import { DataTableBase } from './data-table-base';
import { DataTableWithInfiniteQuery } from './data-table-with-infinite-query';
import { DataTableWithQuery } from './data-table-with-query';

export const DataTable = <
	TData extends MRT_RowData,
	TQueryFnData = unknown,
	TError = Error,
	TQueryKey extends QueryKey = QueryKey,
	TPageParam extends number = number,
>(
	props: DataTableProps<TData, TQueryFnData, TError, TQueryKey, TPageParam>
) => {
	if (props.queryOptions) {
		if (props.infinite) {
			return <DataTableWithInfiniteQuery {...props} />;
		}

		return <DataTableWithQuery {...props} />;
	}

	return <DataTableBase {...props} />;
};
