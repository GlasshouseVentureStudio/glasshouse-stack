'use client';

import { MantineReactTable, type MRT_RowData, type MRT_TableInstance, type Xor } from 'mantine-react-table';

import { type DataTableBaseProps } from './data-table.types';
import { useDataTableBase } from './hooks';

interface TableInstanceProp<TData extends MRT_RowData> {
	table: MRT_TableInstance<TData>;
}

type DataTableProps<TData extends MRT_RowData> = Xor<TableInstanceProp<TData>, DataTableBaseProps<TData>>;

const isTableInstanceProp = <TData extends MRT_RowData>(
	props: DataTableProps<TData>
): props is TableInstanceProp<TData> => props.table !== undefined;

export const DataTableBase = <TData extends MRT_RowData>(props: DataTableProps<TData>) => {
	let table: MRT_TableInstance<TData>;

	if (isTableInstanceProp(props)) {
		table = props.table;
	} else {
		// eslint-disable-next-line react-compiler/react-compiler -- should be safe for library
		// eslint-disable-next-line react-hooks/rules-of-hooks -- safe for this pattern
		table = useDataTableBase(props);
	}

	return <MantineReactTable table={table} />;
};
