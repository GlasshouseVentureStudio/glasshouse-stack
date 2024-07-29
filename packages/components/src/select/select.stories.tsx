import { faker } from '@faker-js/faker';
import { ActionIcon, Button, Combobox, type ComboboxData, Group, Stack } from '@mantine/core';
import { Notifications, notifications } from '@mantine/notifications';
import type { Meta, StoryObj } from '@storybook/react';
import { IconCheck, IconChevronLeft, IconChevronRight, IconThumbUp } from '@tabler/icons-react';

import { Select } from './select';
import { type SelectProps, type SelectWithInfiniteQueryProps } from './select.types';

import '@mantine/notifications/styles.css';

const meta: Meta = {
	title: 'Components/Select',
	component: Select,
	tags: ['autodocs', 'Select'],
};

const generateData = (length: number): ComboboxData =>
	Array.from({ length }).map(() => ({
		label: faker.person.fullName(),
		value: faker.string.uuid(),
	}));

export default meta;

export const Basic: StoryObj<SelectProps> = {
	args: {
		data: generateData(20),
		w: 256,
		placeholder: 'Select person',
		clearable: true,
	},
};

export const RenderOption: StoryObj<SelectProps> = {
	args: {
		data: generateData(20),
		w: 256,
		placeholder: 'Select person',
		clearable: true,
		renderOption: ({ option, checked }) => (
			<Group
				gap='sm'
				justify='space-between'
				w='100%'
			>
				<span>{option.label}</span>
				{checked ? (
					<IconThumbUp
						size={16}
						stroke={1.5}
					/>
				) : null}
			</Group>
		),
	},
};

export const RenderDropdown: StoryObj<SelectProps> = {
	args: {
		data: generateData(20),
		w: 256,
		placeholder: 'Select person',
		clearable: true,
		renderDropdown: ({ options }) => (
			<>
				<Combobox.Header>Header</Combobox.Header>
				<Combobox.Search placeholder='Search' />
				{options}
				<Combobox.Footer>Footer</Combobox.Footer>
			</>
		),
	},
};

export const RenderHeader: StoryObj<SelectProps> = {
	args: {
		data: generateData(20),
		w: 256,
		placeholder: 'Select person',
		clearable: true,
		renderHeader: ({ combobox, data }) => (
			<Stack align='center'>
				<Button
					onClick={() => {
						combobox.selectFirstOption();
						combobox.clickSelectedOption();
					}}
				>
					Select First Options
				</Button>
				<span>{data.length} options</span>
			</Stack>
		),
	},
};

export const RenderFooter: StoryObj<SelectProps> = {
	args: {
		data: generateData(20),
		w: 256,
		placeholder: 'Select person',
		clearable: true,
	},
	render: props => {
		return (
			<>
				<Select
					{...props}
					mb={16}
					renderFooter={({ combobox }) => (
						<Stack align='center'>
							<ActionIcon.Group>
								<ActionIcon
									onClick={() => {
										combobox.selectPreviousOption();
									}}
									variant='light'
								>
									<IconChevronLeft />
								</ActionIcon>
								<ActionIcon
									onClick={() => {
										combobox.selectNextOption();
									}}
									variant='light'
								>
									<IconChevronRight />
								</ActionIcon>
								<ActionIcon
									onClick={() => {
										combobox.clickSelectedOption();
									}}
									variant='light'
								>
									<IconCheck />
								</ActionIcon>
							</ActionIcon.Group>
						</Stack>
					)}
				/>
				<Select
					{...props}
					renderFooter={({ combobox }) => (
						<Button
							mx='auto'
							onClick={() => {
								combobox.resetSelectedOption();
							}}
						>
							Reset
						</Button>
					)}
				/>
			</>
		);
	},
};

const data = generateData(50);

export const Creatable: StoryObj<SelectProps> = {
	args: {
		creatable: true,
		creatablePosition: 'footer',
		onCreate: value => {
			if (value === 'throw') {
				throw new Error('Create error');
			} else if (value === 'forbidden') {
				return 'Forbidden value';
			}

			return null;
		},
		onCreateSuccess: () => {
			notifications.show({ message: 'Success', color: 'green' });
		},
		onCreateError: () => {
			notifications.show({ message: 'Error', color: 'red' });
		},
		createInputValidator: value => (value.length < 4 ? 'Name must have at least 4 characters' : null),
	},
	render: (props: SelectProps<{ data: ComboboxData; total: number }>) => {
		return (
			<>
				<Notifications />
				<Select
					{...props}
					clearable
					getData={() => {
						return new Promise<{ data: ComboboxData; total: number }>(resolve => {
							setTimeout(() => {
								resolve({
									data,
									total: 50,
								});
							}, 500);
						});
					}}
					infinite={false}
					label='Basic'
					mb={24}
					placeholder='Select person'
					queryOptions={{ queryKey: ['WithQuery'], select: ({ data }) => data }}
					w={256}
				/>
			</>
		);
	},
};

export const CreatableAsync: StoryObj<SelectProps> = {
	args: {
		creatable: true,
		creatablePosition: 'footer',
		onCreate: value => {
			return new Promise(resolve => {
				if (value === 'throw') {
					throw new Error('Create error');
				} else if (value === 'forbidden') {
					setTimeout(() => {
						resolve('Forbidden value');
					}, 1000);
				} else {
					setTimeout(() => {
						resolve(null);
					}, 1000);
				}
			});
		},
		onCreateSuccess: () => {
			notifications.show({ message: 'Success', color: 'green' });
		},
		onCreateError: () => {
			notifications.show({ message: 'Error', color: 'red' });
		},
		createInputValidator: value => (value.length < 4 ? 'Name must have at least 4 characters' : null),
	},
	render: (props: SelectProps<{ data: ComboboxData; total: number }>) => {
		return (
			<>
				<Notifications />
				<Select
					{...props}
					clearable
					getData={() => {
						return new Promise<{ data: ComboboxData; total: number }>(resolve => {
							setTimeout(() => {
								resolve({
									data,
									total: 50,
								});
							}, 500);
						});
					}}
					infinite={false}
					label='Async'
					placeholder='Select person'
					queryOptions={{ queryKey: ['WithQuery'], select: ({ data }) => data }}
					w={256}
				/>
			</>
		);
	},
};

export const WithQuery: StoryObj<SelectProps> = {
	render: () => {
		return (
			<Select
				clearable
				getData={() => {
					return new Promise<{ data: ComboboxData; total: number }>(resolve => {
						setTimeout(() => {
							resolve({
								data,
								total: 50,
							});
						}, 500);
					});
				}}
				placeholder='Select person'
				queryOptions={{ queryKey: ['WithQuery'], select: ({ data }) => data }}
				w={256}
			/>
		);
	},
};

export const WithInfiniteQuery: StoryObj<
	SelectWithInfiniteQueryProps<
		{ data: ComboboxData; total: number },
		Error,
		string[],
		{ pageSize: number; pageIndex: number }
	>
> = {
	args: {
		dropdownLoadingType: 'skeleton',
	},
	render: (
		props: SelectWithInfiniteQueryProps<
			{ data: ComboboxData; total: number },
			Error,
			string[],
			{ pageSize: number; pageIndex: number }
		>
	) => {
		return (
			<Select
				{...props}
				clearable
				getData={({ pageParam }) => {
					return new Promise<{ data: ComboboxData; total: number }>(resolve => {
						setTimeout(() => {
							resolve({
								data: data.slice(
									pageParam.pageIndex * pageParam.pageSize,
									(pageParam.pageIndex + 1) * pageParam.pageSize
								),
								total: 50,
							});
						}, 1000);
					});
				}}
				infinite
				placeholder='Select person'
				queryOptions={{
					queryKey: ['WithQuery'],
					select: ({ pageParams, pages }) => ({ pageParams, pages: pages.map(page => page.data) }),
					getNextPageParam: (lastPage, _, { pageIndex, pageSize }) => {
						return pageIndex * pageSize < lastPage.total ? { pageIndex: pageIndex + 1, pageSize } : null;
					},
					initialPageParam: { pageSize: 20, pageIndex: 0 },
				}}
				w={256}
			/>
		);
	},
};
