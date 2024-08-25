import { type ReactNode, type ReactPortal } from 'react';
import { ActionIcon, Button, FocusTrap, Group, type OptionsData, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconPlus, IconX } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';

import { validateOptions } from '../options-dropdown/validate-options';

interface AddOptionProps {
	data: OptionsData;
	onCreate?: (
		value?: string
	) =>
		| Exclude<ReactNode, false | ReactPortal | undefined>
		| Promise<Exclude<ReactNode, false | ReactPortal | undefined>>;
	onCreateError?: (value: string, error: Error) => void;
	onCreateSuccess?: (value: string) => void;
	validator?: (value: string) => Exclude<ReactNode, false | ReactPortal | undefined>;
}

export const AddOption = ({ data, onCreate, onCreateError, onCreateSuccess, validator }: AddOptionProps) => {
	const [active, { open, close }] = useDisclosure();
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
				form.reset();
				onCreateSuccess?.(value);
			} else if (result) {
				form.setFieldError('value', result);
			}
		},
		onError: (error, value) => {
			onCreateError?.(value, error);
		},
	});

	const form = useForm({
		clearInputErrorOnChange: true,
		initialValues: {
			value: '',
		},
		validate: {
			value: value => {
				try {
					validateOptions(data.concat({ value, label: value }));
				} catch {
					return 'This value is already exist.';
				}

				return isNotEmpty()(value) ?? validator?.(value);
			},
		},
	});

	return active ? (
		<FocusTrap active={active}>
			<form
				onSubmit={form.onSubmit(({ value }) => {
					void createOption(value);
				})}
			>
				<Group
					gap={8}
					wrap='nowrap'
				>
					<TextInput
						key={form.key('value')}
						data-autofocus
						disabled={isPending}
						error
						{...form.getInputProps('value')}
					/>
					<ActionIcon
						disabled={isPending}
						onClick={() => {
							close();
							form.reset();
						}}
						size='xs'
						variant='subtle'
					>
						<IconX />
					</ActionIcon>
					<ActionIcon
						loading={isPending}
						size='xs'
						type='submit'
						variant='subtle'
					>
						<IconCheck />
					</ActionIcon>
				</Group>
			</form>
		</FocusTrap>
	) : (
		<Button
			fullWidth
			leftSection={<IconPlus size={14} />}
			onClick={open}
			size='xs'
			variant='subtle'
		>
			Add new
		</Button>
	);
};
