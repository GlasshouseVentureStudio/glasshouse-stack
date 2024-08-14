import { useState } from 'react';
import { Textarea, type TextareaProps } from '@mantine/core';
import {
	type MRT_Cell,
	type MRT_CellValue,
	type MRT_Column,
	type MRT_Row,
	type MRT_RowData,
	type MRT_TableInstance,
} from 'mantine-react-table';

interface PropsTextArea<TData extends MRT_RowData, TValue = MRT_CellValue> extends TextareaProps {
	cell: MRT_Cell<TData, TValue>;
	table: MRT_TableInstance<TData>;
	column: MRT_Column<TData>;
	row: MRT_Row<TData>;
	onSaveValue?: (value: TValue) => Promise<void>;
}

export function useEditTextArea<TData extends Record<string, any>>(props: PropsTextArea<TData>) {
	const { cell, column, row, table, onSaveValue } = props;
	const { getState, setEditingCell, setEditingRow, setCreatingRow } = table;
	const { editingRow, creatingRow } = getState();

	const [value, setValue] = useState(() => cell.getValue());
	const isCreating = creatingRow?.id === row.id;
	const isEditing = editingRow?.id === row.id;

	const handleOnChange = (newValue: unknown) => {
		//@ts-ignore
		row._valuesCache[column.id] = newValue;

		if (isCreating) setCreatingRow(row);
		else if (isEditing) setEditingRow(row);

		setValue(newValue);
	};

	const handleBlur = async () => {
		if (onSaveValue) {
			try {
				await onSaveValue(value);
				setEditingCell(null);
			} catch (error) {
				setEditingCell(null);
			}
		} else {
			setEditingCell(null);
		}
	};

	const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			handleBlur();
		}
	};

	return { value, handleOnChange, handleBlur, onKeyDown };
}

export const TextAreaCellEdit = <TData extends MRT_RowData>(props: PropsTextArea<TData>) => {
	const { cell, column, row, table, onSaveValue, ...rest } = props;
	const { value, handleOnChange, handleBlur, onKeyDown } = useEditTextArea({ cell, column, row, table, onSaveValue });

	return (
		<Textarea
			onBlur={handleBlur}
			onChange={event => {
				handleOnChange(event.target.value);
			}}
			onKeyDown={onKeyDown}
			value={value as string}
			{...rest}
		/>
	);
};
