import { faker } from '@faker-js/faker';
import { ActionIcon, Button, Combobox, type ComboboxData, type ComboboxItem, Group, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import type { Meta, StoryObj } from '@storybook/react';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, ThumbsUpIcon } from 'lucide-react';

import { Autocomplete } from './autocomplete';
import { type AutocompleteProps, type AutocompleteWithInfiniteQueryProps } from './autocomplete.types';

const meta: Meta = {
	title: 'Components/Autocomplete',
	component: Autocomplete,
	tags: ['autodocs', 'Autocomplete'],
};

const generateData = (length: number): ComboboxData =>
	Array.from({ length }).map(() => ({
		label: faker.person.fullName(),
		value: faker.string.uuid(),
	}));

export default meta;

export const Basic: StoryObj<AutocompleteProps> = {
	args: {
		data: generateData(20),
		w: 256,
		placeholder: 'Select person',
	},
};

export const RenderOption: StoryObj<AutocompleteProps> = {
	args: {
		data: generateData(20),
		w: 256,
		placeholder: 'Select person',
		renderOption: ({ option, checked }) => (
			<Group
				gap='sm'
				justify='space-between'
				w='100%'
			>
				<span>{option.value}</span>
				{checked ? (
					<ThumbsUpIcon
						size={16}
						stroke='1.5'
					/>
				) : null}
			</Group>
		),
	},
};

export const RenderDropdown: StoryObj<AutocompleteProps> = {
	args: {
		data: generateData(20),
		w: 256,
		placeholder: 'Select person',
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

export const RenderHeader: StoryObj<AutocompleteProps> = {
	args: {
		data: generateData(20),
		w: 256,
		placeholder: 'Select person',
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

export const RenderFooter: StoryObj<AutocompleteProps> = {
	args: {
		data: generateData(20),
		w: 256,
		placeholder: 'Select person',
	},
	render: props => {
		return (
			<>
				<Autocomplete
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
									<ChevronLeftIcon />
								</ActionIcon>
								<ActionIcon
									onClick={() => {
										combobox.selectNextOption();
									}}
									variant='light'
								>
									<ChevronRightIcon />
								</ActionIcon>
								<ActionIcon
									onClick={() => {
										combobox.clickSelectedOption();
									}}
									variant='light'
								>
									<CheckIcon />
								</ActionIcon>
							</ActionIcon.Group>
						</Stack>
					)}
				/>
				<Autocomplete
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

export const Creatable: StoryObj<AutocompleteProps> = {
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
			// eslint-disable-next-line no-alert -- ex
			alert('Success');
		},
		onCreateError: () => {
			// eslint-disable-next-line no-alert -- ex
			alert('error');
		},
		createInputValidator: value => (value.length < 4 ? 'Name must have at least 4 characters' : null),
	},
	render: (props: AutocompleteProps<{ data: ComboboxData; total: number }>) => {
		return (
			<Autocomplete
				{...props}
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
				placeholder='Autocomplete person'
				queryOptions={{ queryKey: ['WithQuery'], select: ({ data }) => data }}
				w={256}
			/>
		);
	},
};

export const CreatableAsync: StoryObj<AutocompleteProps> = {
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
	render: (props: AutocompleteProps<{ data: ComboboxData; total: number }>) => {
		return (
			<Autocomplete
				{...props}
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
				placeholder='Autocomplete person'
				queryOptions={{ queryKey: ['WithQuery'], select: ({ data }) => data }}
				w={256}
			/>
		);
	},
};
export const WithQuery: StoryObj<AutocompleteProps> = {
	render: () => {
		return (
			<Autocomplete
				getData={(_, { search }) => {
					return new Promise<{ data: ComboboxData; total: number }>(resolve => {
						setTimeout(() => {
							resolve({
								data: search
									? data.filter(value => (value as ComboboxItem).label.toLowerCase().includes(search.toLowerCase()))
									: data,
								total: 50,
							});
						}, 500);
					});
				}}
				placeholder='Autocomplete person'
				queryOptions={{ queryKey: ['WithQuery'], select: ({ data }) => data }}
				w={256}
			/>
		);
	},
};

export const WithInfiniteQuery: StoryObj<
	AutocompleteWithInfiniteQueryProps<
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
		props: AutocompleteWithInfiniteQueryProps<
			{ data: ComboboxData; total: number },
			Error,
			string[],
			{ pageSize: number; pageIndex: number }
		>
	) => {
		return (
			<Autocomplete
				{...props}
				getData={({ pageParam }, { search }) => {
					return new Promise<{ data: ComboboxData; total: number }>(resolve => {
						setTimeout(() => {
							resolve({
								data: (search
									? data.filter(value => (value as ComboboxItem).label.toLowerCase().includes(search.toLowerCase()))
									: data
								).slice(pageParam.pageIndex * pageParam.pageSize, (pageParam.pageIndex + 1) * pageParam.pageSize),
								total: 50,
							});
						}, 1000);
					});
				}}
				infinite
				placeholder='Autocomplete person'
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
