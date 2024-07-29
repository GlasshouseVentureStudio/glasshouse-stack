import { type ComboboxParsedItem, isOptionsGroup } from '@mantine/core';

interface FilterPickedTagsInput {
	data: ComboboxParsedItem[];
	value: string[];
}

export function filterPickedValues({ data, value }: FilterPickedTagsInput) {
	const normalizedValue = value.map(item => item.trim().toLowerCase());

	const filtered = data.reduce<ComboboxParsedItem[]>((acc, item) => {
		if (isOptionsGroup(item)) {
			acc.push({
				group: item.group,
				items: item.items.filter(option => !normalizedValue.includes(option.value.toLowerCase().trim())),
			});
		} else if (!normalizedValue.includes(item.value.toLowerCase().trim())) {
			acc.push(item);
		}

		return acc;
	}, []);

	return filtered;
}
