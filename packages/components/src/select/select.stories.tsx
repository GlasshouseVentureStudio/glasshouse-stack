/* eslint-disable react-hooks/rules-of-hooks -- safe for stories */
import { useState } from 'react';
import { faker } from '@faker-js/faker';
import {
	ActionIcon,
	Button,
	Combobox,
	type ComboboxData,
	type ComboboxItem,
	Fieldset,
	Grid,
	Group,
	Stack,
	TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Notifications, notifications } from '@mantine/notifications';
import type { Meta, StoryObj } from '@storybook/react';
import { IconCheck, IconChevronLeft, IconChevronRight, IconThumbUp } from '@tabler/icons-react';
import { MinusIcon, PlusIcon } from 'lucide-react';
// eslint-disable-next-line import/named -- unsure why eslint is complaining
import { v4 } from 'uuid';

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
		searchable: true,
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
				placeholder='Select person'
				queryOptions={{ queryKey: ['WithQuery'], select: ({ data }) => data }}
				searchable
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
				placeholder='Select person'
				queryOptions={{
					queryKey: ['WithQuery'],
					select: ({ pageParams, pages }) => ({ pageParams, pages: pages.map(page => page.data) }),
					getNextPageParam: (lastPage, _, { pageIndex, pageSize }) => {
						return pageIndex * pageSize < lastPage.total ? { pageIndex: pageIndex + 1, pageSize } : null;
					},
					initialPageParam: { pageSize: 20, pageIndex: 0 },
				}}
				searchable
				w={256}
			/>
		);
	},
};

interface FormFields {
	contacts: {
		name: string;
		phone: string;
		email: string;
		person: string;
		key: string;
	}[];
}

interface UsersParams {
	limit?: number;
	skip?: number;
	q?: string;
}

const getUsers = async (params?: UsersParams) => {
	const searchParams = new URLSearchParams(params as unknown as Record<string, string>);

	const url = params ? `https://dummyjson.com/users/search?${searchParams.toString()}` : 'https://dummyjson.com/users';

	return fetch(url).then(response => response.json() as Promise<UsersResponse>);
};

export const FormUsage: StoryObj<
	SelectWithInfiniteQueryProps<UsersResponse, Error, string[], { pageSize: number; pageIndex: number }>
> = {
	args: {
		dropdownLoadingType: 'skeleton',
	},
	render: (
		props: SelectWithInfiniteQueryProps<UsersResponse, Error, string[], { pageSize: number; pageIndex: number }>
	) => {
		const form = useForm<FormFields>({
			initialValues: {
				contacts: [
					{
						name: '',
						phone: '',
						email: '',
						person: '',
						key: '',
					},
				],
			},
		});

		const handleAdd = () => {
			form.insertListItem('contacts', {
				name: '',
				email: '',
				phone: '',
				person: '',
				key: v4(),
			});
		};

		const [contacts, setContacts] = useState<FormFields>();

		const handleSubmit = (values: FormFields) => {
			setContacts(values);
		};

		return (
			<Stack>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<ActionIcon onClick={handleAdd}>
						<PlusIcon />
					</ActionIcon>
					<Stack>
						{form.values.contacts.map((contact, index) => (
							<Fieldset
								key={contact.key}
								classNames={{
									legend: 'mb-1',
									root: 'mb-3',
								}}
								variant='unstyled'
							>
								<Group
									gap='xs'
									wrap='nowrap'
								>
									<Grid columns={4}>
										<Grid.Col span={1}>
											<TextInput
												placeholder='Name'
												{...form.getInputProps(`contacts.${index}.name`)}
											/>
										</Grid.Col>
										<Grid.Col span={1}>
											<TextInput
												placeholder='Phone number'
												{...form.getInputProps(`contacts.${index}.phone`)}
											/>
										</Grid.Col>
										<Grid.Col span={1}>
											<TextInput
												placeholder='Email address'
												{...form.getInputProps(`contacts.${index}.email`)}
											/>
										</Grid.Col>
										<Grid.Col span={1}>
											<Select
												{...props}
												{...form.getInputProps(`contacts.${index}.person`)}
												clearable
												creatable
												getData={({ pageParam }, { search = '' }) =>
													getUsers({ ...pageParam, q: search.toLowerCase() })
												}
												infinite
												nothingFoundMessage='Nothing found'
												placeholder='Select person'
												queryOptions={{
													queryKey: ['WithQuery'],
													select: ({ pageParams, pages }) => ({
														pageParams,
														pages: pages.map(page =>
															page.users.map(user => ({
																label: `${user.firstName} ${user.lastName}`,
																value: user.username,
															}))
														),
													}),
													getNextPageParam: (lastPage, _ap, { skip, limit }) => {
														if (skip + limit < lastPage.total) {
															return {
																skip: skip + limit,
																limit,
															};
														}

														return undefined;
													},
													initialPageParam: {
														limit: 20,
														skip: 0,
													},
												}}
												searchable
											/>
										</Grid.Col>
									</Grid>
									<Group
										gap='xs'
										wrap='nowrap'
									>
										<ActionIcon
											color='red'
											disabled={index === 0}
											onClick={() => {
												form.removeListItem('contacts', index);
											}}
											opacity={index === 0 ? 0 : undefined}
											size='xs'
											variant='subtle'
										>
											<MinusIcon size={14} />
										</ActionIcon>
									</Group>
								</Group>
							</Fieldset>
						))}
						<Button
							type='submit'
							w={160}
						>
							Submit
						</Button>
					</Stack>
				</form>
				<Stack>
					{contacts?.contacts.map(contact => (
						<Group key={contact.key}>
							<span>{contact.name}</span>
							<span>{contact.phone}</span>
							<span>{contact.email}</span>
							<span>{contact.person}</span>
						</Group>
					))}
				</Stack>
			</Stack>
		);
	},
};

interface UsersResponse {
	users: User[];
	total: number;
	skip: number;
	limit: number;
}

interface User {
	id: number;
	firstName: string;
	lastName: string;
	maidenName: string;
	age: number;
	gender: string;
	email: string;
	phone: string;
	username: string;
	password: string;
	birthDate: string;
	image: string;
	bloodGroup: string;
	height: number;
	weight: number;
	eyeColor: string;
	hair: Hair;
	ip: string;
	address: Address;
	macAddress: string;
	university: string;
	bank: Bank;
	company: Company;
	ein: string;
	ssn: string;
	userAgent: string;
	crypto: Crypto;
	role: string;
}

interface Crypto {
	coin: string;
	wallet: string;
	network: string;
}

interface Company {
	department: string;
	name: string;
	title: string;
	address: Address;
}

interface Bank {
	cardExpire: string;
	cardNumber: string;
	cardType: string;
	currency: string;
	iban: string;
}

interface Address {
	address: string;
	city: string;
	state: string;
	stateCode: string;
	postalCode: string;
	coordinates: Coordinates;
	country: string;
}

interface Coordinates {
	lat: number;
	lng: number;
}

interface Hair {
	color: string;
	type: string;
}
