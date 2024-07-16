import { type OmitComponentProps } from '@glasshouse/utils';

import { type ListProps } from '../list';

export interface SelectableListProps<T extends object> extends OmitComponentProps<ListProps<T>, 'onChange'> {
	value?: T;
	onChange?: (value: T) => void;
}

export interface FieldNames {
	value?: string;
	label?: string;
}

export type RawValueType = string | number;

export interface LabelInValueType {
	label: React.ReactNode;
	value: RawValueType;
	/** @deprecated `key` is useless since it should always same as `value` */
	key?: React.Key;
}

export interface DisplayValueType {
	key?: React.Key;
	value?: RawValueType;
	label?: React.ReactNode;
	title?: React.ReactNode;
	disabled?: boolean;
}

export type DraftValueType =
	| RawValueType
	| LabelInValueType
	| DisplayValueType
	| (RawValueType | LabelInValueType | DisplayValueType)[];
