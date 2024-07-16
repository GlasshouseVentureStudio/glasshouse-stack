import { type DraftValueType, type FieldNames, type RawValueType } from './select-list.types';

export const fillFieldNames = (fieldNames?: FieldNames, childrenAsData?: boolean) => {
	const { label, value } = fieldNames ?? {};
	const merged = label ?? (childrenAsData ? 'children' : 'label');

	return {
		label: merged,
		value: value ?? 'value',
	};
};

export const toArray = <T>(value: T | T[]): T[] => {
	if (Array.isArray(value)) {
		return value;
	}

	return value !== undefined ? [value] : [];
};

export const isRawValue = (value: DraftValueType): value is RawValueType => {
	return !value || typeof value !== 'object';
};
