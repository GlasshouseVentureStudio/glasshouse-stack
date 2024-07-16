/* eslint-disable react-hooks/rules-of-hooks -- valid for stories */
import { useState } from 'react';
import { faker } from '@faker-js/faker';
import { Box, Checkbox, Group } from '@mantine/core';
import { type Meta, type StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { SelectList } from './select-list';

const data = Array.from({ length: 10 })
	.map(() => ({
		value: faker.string.uuid(),
		label: faker.person.fullName(),
	}))
	.sort((a, b) => a.label.localeCompare(b.label));

const meta: Meta<typeof SelectList<(typeof data)[number]>> = {
	title: 'Components/Lists/SelectList',
	component: SelectList,
	tags: ['autodocs', 'lists'],
};

export default meta;
type SelectListStory = StoryObj<typeof meta>;

export const Default: SelectListStory = {
	args: {
		data,
		renderItem: (item, index, active) => (
			<Group
				className='cursor-pointer'
				data-active={active}
				px={8}
			>
				<Checkbox
					checked={active}
					data-testid={item.label}
				/>
				<Box className='line-clamp-1 flex h-8 items-center'>{item.label}</Box>
			</Group>
		),
		estimateItemSize: () => 32,
		classNames: {
			root: 'w-80',
			item: 'data-[active=true]:bg-gray-200',
		},
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const elements = data.map(item => canvas.getByTestId(item.label));

		for (const element of elements) {
			await userEvent.click(element);
			await expect(element).toBeChecked();
		}
	},
};

/**
 * Controlled SelectList using `value` and `onChange` props.
 */

export const Controlled: SelectListStory = {
	args: {
		data,
		renderItem: (item, index, active) => (
			<Group
				className='cursor-pointer'
				data-active={active}
				px={8}
			>
				<Checkbox
					checked={active}
					data-testid={item.label}
				/>
				<Box className='line-clamp-1 flex h-8 items-center'>{item.label}</Box>
			</Group>
		),
		estimateItemSize: () => 32,
		classNames: {
			root: 'w-80',
			item: 'data-[active=true]:bg-gray-200',
		},
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const element = canvas.getByTestId(data[0]?.label ?? '');

		await userEvent.click(element);
		await expect(element).toBeChecked();
	},
	render: args => {
		const [value, setValue] = useState<(typeof data)[number] | undefined>(data[0]);

		return (
			<SelectList
				{...args}
				value={value}
				onChange={value => {
					setValue(value);
				}}
			/>
		);
	},
};
