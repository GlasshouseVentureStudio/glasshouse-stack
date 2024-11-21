/* eslint-disable react-hooks/rules-of-hooks -- safe for stories */
import { useState } from 'react';
import { faker } from '@faker-js/faker';
import {
	ActionIcon,
	Button,
	Combobox,
	type ComboboxData,
	type ComboboxItem,
	Group,
	NumberInput,
	Select,
	Stack,
	Switch,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import type { Meta, StoryObj } from '@storybook/react';
import { IconCheck, IconChevronLeft, IconChevronRight, IconThumbUp } from '@tabler/icons-react';

import { MultiSelect } from '../multi-select';
import { type MultiSelectProps, type MultiSelectWithInfiniteQueryProps } from '../multi-select.types';

const meta: Meta<typeof MultiSelect> = {
	title: 'Components/MultiSelect',
	component: MultiSelect,
	tags: ['autodocs', 'MultiSelect'],
};

const generateData = (length: number): ComboboxData =>
	Array.from({ length }).map(() => ({
		label: faker.person.fullName(),
		value: faker.string.uuid(),
	}));

const getUsers = async (params?: UsersParams) => {
	const searchParams = new URLSearchParams(params as unknown as Record<string, string>);

	const url = params ? `https://dummyjson.com/users/search?${searchParams.toString()}` : 'https://dummyjson.com/users';

	return fetch(url).then(response => response.json() as Promise<UsersResponse>);
};

export default meta;
type MultiSelectStory = StoryObj<typeof meta>;

export const Basic: StoryObj<MultiSelectStory> = {
	args: {
		data: generateData(20),
		w: 256,
		placeholder: 'Select person',
		clearable: true,
	},
};

export const RenderOption: StoryObj<MultiSelectProps> = {
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

export const RenderDropdown: StoryObj<MultiSelectProps> = {
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

export const RenderHeader: StoryObj<MultiSelectProps> = {
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

export const RenderFooter: StoryObj<MultiSelectProps> = {
	args: {
		data: generateData(20),
		w: 256,
		placeholder: 'Select person',
		clearable: true,
	},
	render: props => {
		return (
			<>
				<MultiSelect
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
				<MultiSelect
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

export const Creatable: StoryObj<MultiSelectProps> = {
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
	render: (props: MultiSelectProps<{ data: ComboboxData; total: number }>) => {
		return (
			<MultiSelect
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
				placeholder='MultiSelect person'
				queryOptions={{ queryKey: ['WithQuery'], select: ({ data }) => data }}
				w={256}
			/>
		);
	},
};

export const CreatableAsync: StoryObj<MultiSelectProps> = {
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
	render: (props: MultiSelectProps<{ data: ComboboxData; total: number }>) => {
		return (
			<MultiSelect
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
				placeholder='MultiSelect person'
				queryOptions={{ queryKey: ['WithQuery'], select: ({ data }) => data }}
				w={256}
			/>
		);
	},
};
export const WithQuery: StoryObj<MultiSelectProps> = {
	render: () => {
		return (
			<MultiSelect
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
				placeholder='MultiSelect person'
				queryOptions={{ queryKey: ['WithQuery'], select: ({ data }) => data }}
				searchable
				w={256}
			/>
		);
	},
};

export const WithInfiniteQuery: StoryObj<
	MultiSelectWithInfiniteQueryProps<UsersResponse, Error, string[], UsersParams>
> = {
	args: {
		dropdownLoadingType: 'skeleton',
	},
	render: (props: MultiSelectWithInfiniteQueryProps<UsersResponse, Error, string[], UsersParams>) => {
		return (
			<MultiSelect
				{...props}
				clearable
				getData={({ pageParam }, { search }) => {
					const { limit, skip } = pageParam;

					return getUsers({ limit, skip, q: search ?? '' });
				}}
				infinite
				placeholder='MultiSelect person'
				queryOptions={{
					queryKey: ['WithQuery'],
					select: ({ pageParams, pages }) => ({
						pageParams,
						pages: pages.map(page =>
							page.users.map(user => ({
								label: `${user.firstName} ${user.lastName}`,
								value: user.id.toString(),
							}))
						),
					}),
					getNextPageParam: (lastPage, _, { skip, limit }) => {
						return limit + skip < lastPage.total ? { skip: skip + limit, limit } : null;
					},
					initialPageParam: { limit: 20, skip: 0 },
				}}
				searchable
				w={256}
			/>
		);
	},
};

export const MaxDisplayedValues: StoryObj<
	MultiSelectWithInfiniteQueryProps<
		{ data: ComboboxData; total: number },
		Error,
		string[],
		{ pageSize: number; pageIndex: number }
	>
> = {
	args: {
		clearable: true,
		infinite: true,
		maxDisplayedValues: 2,
		placeholder: 'MultiSelect person',
		searchable: true,
		w: 200,
	},
	render: (
		props: MultiSelectWithInfiniteQueryProps<
			{ data: ComboboxData; total: number },
			Error,
			string[],
			{ pageSize: number; pageIndex: number }
		>
	) => {
		return (
			<MultiSelect
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
				queryOptions={{
					queryKey: ['WithQuery'],
					select: ({ pageParams, pages }) => ({ pageParams, pages: pages.map(page => page.data) }),
					getNextPageParam: (lastPage, _, { pageIndex, pageSize }) => {
						return pageIndex * pageSize < lastPage.total ? { pageIndex: pageIndex + 1, pageSize } : null;
					},
					initialPageParam: { pageSize: 20, pageIndex: 0 },
				}}
			/>
		);
	},
};

export const RenderMaxDisplayedValuesLabel: StoryObj<
	MultiSelectWithInfiniteQueryProps<
		{ data: ComboboxData; total: number },
		Error,
		string[],
		{ pageSize: number; pageIndex: number }
	>
> = {
	...MaxDisplayedValues,
	render: (
		props: MultiSelectWithInfiniteQueryProps<
			{ data: ComboboxData; total: number },
			Error,
			string[],
			{ pageSize: number; pageIndex: number }
		>
	) => {
		return (
			<MultiSelect
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
				queryOptions={{
					queryKey: ['WithQuery'],
					select: ({ pageParams, pages }) => ({ pageParams, pages: pages.map(page => page.data) }),
					getNextPageParam: (lastPage, _, { pageIndex, pageSize }) => {
						return pageIndex * pageSize < lastPage.total ? { pageIndex: pageIndex + 1, pageSize } : null;
					},
					initialPageParam: { pageSize: 20, pageIndex: 0 },
				}}
				renderMaxDisplayedValuesLabel={count => `+${count}`}
			/>
		);
	},
};

export const ValueMode: StoryObj<
	MultiSelectWithInfiniteQueryProps<
		{ data: ComboboxData; total: number },
		Error,
		string[],
		{ pageSize: number; pageIndex: number }
	>
> = {
	args: {
		...MaxDisplayedValues.args,
		maxDisplayedValues: 2,
	},
	render: (
		props: MultiSelectWithInfiniteQueryProps<
			{ data: ComboboxData; total: number },
			Error,
			string[],
			{ pageSize: number; pageIndex: number }
		>
	) => {
		const [mode, setMode] = useState<'pills' | 'texts'>('texts');

		return (
			<Stack>
				<Select
					data={[
						{ label: 'Pills', value: 'pills' },
						{ label: 'Texts', value: 'texts' },
					]}
					label='Mode'
					onChange={value => {
						setMode(value as 'pills' | 'texts');
					}}
					value={mode}
					w={100}
				/>
				<MultiSelect
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
					mode={mode}
					queryOptions={{
						queryKey: ['WithQuery'],
						select: ({ pageParams, pages }) => ({ pageParams, pages: pages.map(page => page.data) }),
						getNextPageParam: (lastPage, _, { pageIndex, pageSize }) => {
							return pageIndex * pageSize < lastPage.total ? { pageIndex: pageIndex + 1, pageSize } : null;
						},
						initialPageParam: { pageSize: 20, pageIndex: 0 },
					}}
					renderMaxDisplayedValuesLabel={count => `, +${count}`}
				/>
			</Stack>
		);
	},
};

export const FloatingInput: StoryObj<
	MultiSelectWithInfiniteQueryProps<
		{ data: ComboboxData; total: number },
		Error,
		string[],
		{ pageSize: number; pageIndex: number }
	>
> = {
	args: {
		...MaxDisplayedValues.args,
	},
	render: (
		props: MultiSelectWithInfiniteQueryProps<
			{ data: ComboboxData; total: number },
			Error,
			string[],
			{ pageSize: number; pageIndex: number }
		>
	) => {
		const [mode, setMode] = useState<'pills' | 'texts'>('texts');
		const [lineClamp, setLineClamp] = useState<number | string>(1);
		const [maxDisplayedValues, setMaxDisplayedValues] = useState<number | string>(2);
		const [floating, setFloating] = useState(true);
		const [searchable, setSearchable] = useState(true);

		return (
			<Stack>
				<Group className='border'>
					<Select
						data={[
							{ label: 'Pills', value: 'pills' },
							{ label: 'Texts', value: 'texts' },
						]}
						label='Mode'
						onChange={value => {
							setMode(value as 'pills' | 'texts');
						}}
						value={mode}
						w={100}
					/>
					<NumberInput
						label='Line clamp'
						onChange={setLineClamp}
						value={lineClamp}
					/>
					<NumberInput
						label='Max displayed values'
						onChange={setMaxDisplayedValues}
						value={maxDisplayedValues}
					/>
					<Switch
						checked={floating}
						label='Floating input'
						onChange={event => {
							setFloating(event.currentTarget.checked);
						}}
					/>
					<Switch
						checked={searchable}
						label='Searchable'
						onChange={event => {
							setSearchable(event.currentTarget.checked);
						}}
					/>
				</Group>
				<MultiSelect
					{...props}
					floatingInput={floating}
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
					lineClamp={parseInt(lineClamp.toString())}
					maxDisplayedValues={parseInt(maxDisplayedValues.toString())}
					mode={mode}
					queryOptions={{
						queryKey: ['WithQuery'],
						select: ({ pageParams, pages }) => ({ pageParams, pages: pages.map(page => page.data) }),
						getNextPageParam: (lastPage, _, { pageIndex, pageSize }) => {
							return pageIndex * pageSize < lastPage.total ? { pageIndex: pageIndex + 1, pageSize } : null;
						},
						initialPageParam: { pageSize: 20, pageIndex: 0 },
					}}
					renderMaxDisplayedValuesLabel={count => ` +${count} more`}
					searchable={searchable}
					size='xs'
				/>
			</Stack>
		);
	},
};

export const WithSelectAll: StoryObj<
	MultiSelectWithInfiniteQueryProps<
		{ data: ComboboxData; total: number },
		Error,
		string[],
		{ pageSize: number; pageIndex: number }
	>
> = {
	...FloatingInput,
	args: {
		...MaxDisplayedValues.args,
		allowSelectAll: true,
	},
};

interface UsersParams {
	limit?: number;
	skip?: number;
	q?: string;
}

export interface UsersResponse {
	users: User[];
	total: number;
	skip: number;
	limit: number;
}

export interface User {
	id: number;
	firstName: string;
	lastName: string;
	maidenName: string;
	age: number;
	gender: Gender;
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
	role: Role;
}

export interface Address {
	address: string;
	city: string;
	state: string;
	stateCode: string;
	postalCode: string;
	coordinates: Coordinates;
	country: Country;
}

export interface Coordinates {
	lat: number;
	lng: number;
}

export enum Country {
	UnitedStates = 'United States',
}

export interface Bank {
	cardExpire: string;
	cardNumber: string;
	cardType: string;
	currency: string;
	iban: string;
}

export interface Company {
	department: string;
	name: string;
	title: string;
	address: Address;
}

export interface Crypto {
	coin: Coin;
	wallet: Wallet;
	network: Network;
}

export enum Coin {
	Bitcoin = 'Bitcoin',
}

export enum Network {
	EthereumERC20 = 'Ethereum (ERC20)',
}

export enum Wallet {
	The0Xb9Fc2Fe63B2A6C003F1C324C3Bfa53259162181A = '0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a',
}

export enum Gender {
	Female = 'female',
	Male = 'male',
}

export interface Hair {
	color: string;
	type: Type;
}

export enum Type {
	Curly = 'Curly',
	Kinky = 'Kinky',
	Straight = 'Straight',
	Wavy = 'Wavy',
}

export enum Role {
	Admin = 'admin',
	Moderator = 'moderator',
	User = 'user',
}
