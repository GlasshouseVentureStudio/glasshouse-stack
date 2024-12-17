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

export function useEditTextArea<TData extends Record<string, unknown>>(props: PropsTextArea<TData, string>) {
	const { cell, column, row, table, onSaveValue } = props;
	const { getState, setEditingCell, setEditingRow, setCreatingRow } = table;
	const { editingRow, creatingRow } = getState();

	const [value, setValue] = useState(() => cell.getValue());
	const isCreating = creatingRow?.id === row.id;
	const isEditing = editingRow?.id === row.id;

	const handleOnChange = (newValue: string) => {
		//@ts-expect-error -- _valuesCache is private but we need to use it
		// eslint-disable-next-line react-compiler/react-compiler -- TODO: fix this later
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
			} catch {
				setEditingCell(null);
			}
		} else {
			setEditingCell(null);
		}
	};

	const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			void handleBlur();
		}
	};

	return { value, handleOnChange, handleBlur, onKeyDown };
}

export const TextAreaCellEdit = <TData extends MRT_RowData>(props: PropsTextArea<TData, string>) => {
	const { cell, column, row, table, onSaveValue, ...rest } = props;
	const { value, handleOnChange, handleBlur, onKeyDown } = useEditTextArea({ cell, column, row, table, onSaveValue });

	const editInputRefs = table.refs.editInputRefs;

	return (
		<Textarea
			ref={node => {
				if (node) {
					//@ts-expect-error -- use ref only for focus so we can ignore the diff between HTMLTextAreaElement and HTMLInputElement
					// eslint-disable-next-line react-compiler/react-compiler -- TODO: fix this later
					editInputRefs.current[cell.id] = node;
				}
			}}
			autosize
			onBlur={() => void handleBlur()}
			onKeyDown={onKeyDown}
			value={value}
			onChange={event => {
				handleOnChange(event.target.value);
			}}
			{...rest}
		/>
	);
};
