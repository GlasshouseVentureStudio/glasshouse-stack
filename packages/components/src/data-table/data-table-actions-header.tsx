import { type MRT_RowData } from 'mantine-react-table';

import { ColumnsControlButton } from './buttons/columns-control-button';
import { type DataTableInstance } from './data-table.types';

export const DataTableActionsHeader = <TData extends MRT_RowData>({ table }: { table: DataTableInstance<TData> }) => {
	return (
		<ColumnsControlButton
			size='xs'
			table={table}
		/>
	);
};
