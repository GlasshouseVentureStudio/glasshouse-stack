import { type ReactNode, type ReactPortal, useCallback } from 'react';
import {
	ActionIcon,
	Button,
	type ComboboxParsedItem,
	FocusTrap,
	Group,
	isOptionsGroup,
	type OptionsData,
	TextInput,
} from '@mantine/core';
import { isNotEmpty, useField } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useMutation } from '@tanstack/react-query';
import { CheckIcon, PlusIcon, XIcon } from 'lucide-react';

/** Props for the AddOption component. */
interface AddOptionProps {
	/** The data for the options. */
	data: OptionsData;
	/** Callback function to handle the creation of a new option. Can return a ReactNode or a `Promise` that resolves to a `ReactNode`. */
	onCreate?: (
		value?: string
	) =>
		| Exclude<ReactNode, false | ReactPortal | undefined>
		| Promise<Exclude<ReactNode, false | ReactPortal | undefined>>;
	/** Callback function to handle errors during the creation of a new option. */
	onCreateError?: (value: string, error: Error) => void;
	/** Callback function to handle successful creation of a new option. */
	onCreateSuccess?: (value: string) => void;
	/** Function to validate the new option value. Should return a ReactNode if the value is valid. */
	validator?: (value: string, data: OptionsData) => Exclude<ReactNode, false | ReactPortal | undefined>;
	/** Custom label for the create button. */
	createLabel?: React.ReactNode;
}

export const validateOptions = (options: ComboboxParsedItem[], valuesSet = new Set()) => {
	if (!Array.isArray(options)) {
		return;
	}

	for (const option of options) {
		if (isOptionsGroup(option)) {
			validateOptions(option.items, valuesSet);
		} else {
			if (typeof option.value === 'undefined') {
				throw new Error('[@mantine/core] Each option must have value property');
			}

			if (typeof option.value !== 'string') {
				throw new Error(
					`[@mantine/core] Option value must be a string, other data formats are not supported, got ${typeof option.value}`
				);
			}

			if (valuesSet.has(option.value)) {
				throw new Error(
					`[@mantine/core] Duplicate options are not supported. Option with value "${option.value}" was provided more than once`
				);
			}

			valuesSet.add(option.value);
		}
	}
};

const validOptions = (options: ComboboxParsedItem[], value: string) => {
	if (!Array.isArray(options)) {
		return true;
	}

	for (const option of options) {
		if (isOptionsGroup(option)) {
			validOptions(option.items, value);
		} else if (option.value === value) {
			throw new Error(
				`[@mantine/core] Duplicate options are not supported. Option with value "${option.value}" was provided more than once`
			);
		}
	}
};

export const AddOption = ({
	data,
	onCreate,
	onCreateError,
	onCreateSuccess,
	validator,
	createLabel = 'Add new',
}: AddOptionProps) => {
	const [active, { open, close }] = useDisclosure();

	const field = useField({
		initialValue: '',
		validate: value => {
			try {
				validOptions(data, value);
			} catch {
				return 'This value is already exist.';
			}

			return isNotEmpty()(value) ?? validator?.(value, data);
		},
	});

	const { mutateAsync: createOption, isPending } = useMutation({
		mutationFn: (value: string) => {
			if (onCreate) {
				return Promise.resolve(onCreate(value));
			}

			return Promise.resolve(null);
		},
		onSuccess: (result, value) => {
			if (result === null) {
				close();
				field.reset();
				onCreateSuccess?.(value);
			} else if (result) {
				field.setError(result);
			}
		},
		onError: (error, value) => {
			onCreateError?.(value, error);
		},
	});

	const { getValue, validate } = field;

	const handleFieldSubmit = useCallback(async () => {
		const error = await validate();

		if (error) return;

		await createOption(getValue());
	}, [createOption, getValue, validate]);

	return active ? (
		<FocusTrap active={active}>
			<Group
				gap='xs'
				wrap='nowrap'
			>
				<TextInput
					{...field.getInputProps()}
					data-autofocus
					disabled={isPending}
					onBlur={close}
				/>
				<ActionIcon
					disabled={isPending}
					size='xs'
					variant='subtle'
					onClick={() => {
						close();
						field.reset();
					}}
				>
					<XIcon />
				</ActionIcon>
				<ActionIcon
					loading={isPending}
					onClick={() => void handleFieldSubmit()}
					size='xs'
					variant='subtle'
				>
					<CheckIcon />
				</ActionIcon>
			</Group>
		</FocusTrap>
	) : (
		<Button
			fullWidth
			leftSection={<PlusIcon size={14} />}
			onClick={open}
			size='xs'
			variant='subtle'
		>
			{createLabel}
		</Button>
	);
};
