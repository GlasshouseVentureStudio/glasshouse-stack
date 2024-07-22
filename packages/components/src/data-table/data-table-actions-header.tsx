import {
	type MRT_Column,
	type MRT_Header,
	type MRT_RowData,
	MRT_ShowHideColumnsButton,
	type MRT_TableInstance,
} from 'mantine-react-table';

export const DataTableActionsHeader = <TData extends MRT_RowData>({
	table,
}: {
	column: MRT_Column<TData>;
	header: MRT_Header<TData>;
	table: MRT_TableInstance<TData>;
}) => {
	return (
		// eslint-disable-next-line react/jsx-pascal-case -- 3rd party
		<MRT_ShowHideColumnsButton
			size='xs'
			table={table}
		/>
	);
};
