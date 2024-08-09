import { useState } from 'react';
import { Textarea, type TextareaProps } from '@mantine/core';
import { type MRT_Cell, type MRT_Column, type MRT_Row, type MRT_TableInstance } from 'mantine-react-table';

interface MantineTableCellProps<TData extends Record<string, any>> {
	cell: MRT_Cell<TData>;
	column: MRT_Column<TData>;
	row: MRT_Row<TData>;
	table: MRT_TableInstance<TData>;
}

function useEdit<TData extends Record<string, any>>(props: MantineTableCellProps<TData>) {
	const { cell, column, table } = props;

	const [value, setValue] = useState<any>(() => cell.getValue());

	const { setEditingRow, setEditingCell, getState } = table;

	const { editingRow } = getState();

	const handleOnChange = (newValue: any) => {
		// setValue(newValue);

		console.log(editingRow);

		if (editingRow) {
			setEditingRow({
				...editingRow,
				_valuesCache: { ...editingRow._valuesCache, [column.id]: newValue },
			});
		}
	};

	const handleBlur = () => {
		console.log(table);
		handleOnChange(value);
		setEditingCell(null);
	};

	return { value, setValue, handleOnChange, handleBlur };
}

export const TextAreaCellEdit = <TData extends Record<string, any>>({
	cellProps,
	props = {},
	onChangeCellValue,
}: {
	cellProps: MantineTableCellProps<TData>;
	props?: TextareaProps;
	onChangeCellValue?: (value: string) => void;
}) => {
	const { value, handleOnChange, handleBlur, setValue } = useEdit(cellProps);

	return (
		<Textarea
			{...props}
			onBlur={() => {
				handleBlur();

				if (onChangeCellValue) {
					onChangeCellValue(value);
				}
			}}
			onChange={e => {
				setValue(e.target.value);
			}}
			value={value}
		/>
	);
};

//https://github.com/KevinVandy/mantine-react-table/blob/v2/packages/mantine-react-table/src/components/inputs/MRT_EditCellTextInput.tsx
