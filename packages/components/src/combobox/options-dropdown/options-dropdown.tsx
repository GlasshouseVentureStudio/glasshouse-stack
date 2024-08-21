/* eslint-disable no-nested-ternary -- needed to reduce number of var */
import { type ReactNode, type ReactPortal } from 'react';
import {
	Center,
	Combobox,
	type ComboboxItem,
	type ComboboxLikeRenderOptionInput,
	type ComboboxParsedItem,
	type ComboboxStore,
	defaultOptionsFilter,
	isOptionsGroup,
	Loader,
	LoadingOverlay,
	ScrollArea,
	type ScrollAreaProps,
	Skeleton,
} from '@mantine/core';
import { clsx } from 'clsx';
import { CheckIcon } from 'lucide-react';

import { AddOption } from '../add-option';
import { isComboboxDataEmpty } from './is-combobox-data-empty';
import { validateOptions } from './validate-options';

import classes from './options-dropdown.module.css';

export interface FilterOptionsInput {
	options: ComboboxParsedItem[];
	search: string;
	limit: number;
}

export type OptionsFilter = (input: FilterOptionsInput) => ComboboxParsedItem[];

export interface OptionsGroup {
	group: string;
	items: ComboboxItem[];
}

export type OptionsData = (ComboboxItem | OptionsGroup)[];

interface OptionProps {
	data: ComboboxItem | OptionsGroup;
	withCheckIcon?: boolean;
	value?: string | string[] | null;
	checkIconPosition?: 'left' | 'right';
	unstyled: boolean | undefined;
	renderOption?: (input: ComboboxLikeRenderOptionInput<ComboboxItem>) => React.ReactNode;
}

function isValueChecked(value: string | string[] | undefined | null, optionValue: string) {
	return Array.isArray(value) ? value.includes(optionValue) : value === optionValue;
}

function Option({ data, withCheckIcon, value, checkIconPosition, unstyled, renderOption }: OptionProps) {
	if (!isOptionsGroup(data)) {
		const checked = isValueChecked(value, data.value);
		const check = withCheckIcon && checked && <CheckIcon className={classes.optionsDropdownCheckIcon} />;

		const defaultContent = (
			<>
				{checkIconPosition === 'left' && check}
				<span>{data.label}</span>
				{checkIconPosition === 'right' && check}
			</>
		);

		return (
			<Combobox.Option
				active={checked}
				aria-selected={checked}
				className={clsx(classes.optionsDropdownOption && { [classes.optionsDropdownOption]: !unstyled })}
				data-checked={checked || undefined}
				data-reverse={checkIconPosition === 'right' || undefined}
				disabled={data.disabled}
				value={data.value}
			>
				{typeof renderOption === 'function' ? renderOption({ option: data, checked }) : defaultContent}
			</Combobox.Option>
		);
	}

	const options = data.items.map(item => (
		<Option
			key={item.value}
			checkIconPosition={checkIconPosition}
			data={item}
			renderOption={renderOption}
			unstyled={unstyled}
			value={value}
			withCheckIcon={withCheckIcon}
		/>
	));

	return <Combobox.Group label={data.group}>{options}</Combobox.Group>;
}

export interface OptionsDropdownProps {
	'aria-label': string | undefined;
	checkIconPosition?: 'left' | 'right';
	combobox: ComboboxStore;
	creatable?: boolean;
	createInputValidator?: (value: string) => Exclude<ReactNode, false | ReactPortal | undefined>;
	creatablePosition?: 'header' | 'footer' | 'inline';
	data: OptionsData;
	filter: OptionsFilter | undefined;
	filterOptions?: boolean;
	hidden?: boolean;
	hiddenWhenEmpty?: boolean;
	labelId: string | undefined;
	limit: number | undefined;
	loading?: boolean;
	loadingType?: 'skeleton' | 'overlay' | 'loader';
	maxDropdownHeight: number | string | undefined;
	nothingFoundMessage?: React.ReactNode;
	onCreate?: (
		value?: string
	) =>
		| Exclude<ReactNode, false | ReactPortal | undefined>
		| Promise<Exclude<ReactNode, false | ReactPortal | undefined>>;
	onCreateError?: (value: string, error: Error) => void;
	onCreateSuccess?: (value: string) => void;
	renderDropdown?: (props: { data: ComboboxParsedItem[]; options: ReactNode }) => ReactNode;
	renderFooter?: (props: { combobox: ComboboxStore; data: ComboboxParsedItem[] }) => ReactNode;
	renderHeader?: (props: { combobox: ComboboxStore; data: ComboboxParsedItem[] }) => ReactNode;
	renderOption?: (input: ComboboxLikeRenderOptionInput<ComboboxItem>) => ReactNode;
	renderOptions?: (data: ComboboxParsedItem[], options: ReactNode) => ReactNode;
	scrollAreaProps: ScrollAreaProps | undefined;
	search: string | undefined;
	unstyled: boolean | undefined;
	value?: string | string[] | null;
	withCheckIcon?: boolean;
	withScrollArea: boolean | undefined;
	style?: React.CSSProperties;
}

export function OptionsDropdown({
	'aria-label': ariaLabel,
	checkIconPosition,
	combobox,
	creatable,
	createInputValidator,
	creatablePosition = 'footer',
	data,
	filter,
	filterOptions = true,
	hidden,
	hiddenWhenEmpty,
	labelId,
	limit,
	loading,
	loadingType = 'skeleton',
	maxDropdownHeight,
	nothingFoundMessage,
	onCreate,
	onCreateError,
	onCreateSuccess,
	renderDropdown,
	renderFooter,
	renderHeader,
	renderOption,
	renderOptions,
	scrollAreaProps,
	search,
	unstyled,
	value,
	withCheckIcon = false,
	withScrollArea = true,
	style,
}: OptionsDropdownProps) {
	validateOptions(data);

	const shouldFilter = typeof search === 'string';
	const filteredData = shouldFilter
		? (filter ?? defaultOptionsFilter)({
				options: data,
				search: filterOptions ? search : '',
				limit: limit ?? Infinity,
			})
		: data;
	const isEmpty = isComboboxDataEmpty(filteredData) && !loading;

	const options = filteredData.map(item => (
		<Option
			key={isOptionsGroup(item) ? item.group : item.value}
			checkIconPosition={checkIconPosition}
			data={item}
			renderOption={renderOption}
			unstyled={unstyled}
			value={value}
			withCheckIcon={withCheckIcon}
		/>
	));

	const skeleton =
		loadingType === 'skeleton' ? (
			<>
				{Array.from({ length: 4 }).map((_, index) => (
					<Combobox.Option
						// eslint-disable-next-line react/no-array-index-key -- not important here
						key={index}
						style={style}
						value={`skeleton-${index}`}
					>
						<Skeleton
							height='1.5em'
							visible
							width={`${(Math.random() * (1 - 0.4) + 0.4) * 100}%`}
						/>
					</Combobox.Option>
				))}
			</>
		) : null;

	const loader =
		loadingType === 'loader' ? (
			<Center my='sm'>
				<Loader size='sm' />
			</Center>
		) : null;

	const loadingComponent = skeleton ?? loader;

	const comboboxOptions = withScrollArea ? (
		<ScrollArea.Autosize
			mah={maxDropdownHeight ?? 220}
			scrollbarSize='var(--combobox-padding)'
			type='scroll'
			{...scrollAreaProps}
		>
			{options}
			{loading ? loadingComponent : null}
		</ScrollArea.Autosize>
	) : (
		options
	);

	const addOptionInput = creatable ? (
		<AddOption
			data={data}
			onCreate={onCreate}
			onCreateError={onCreateError}
			onCreateSuccess={onCreateSuccess}
			validator={createInputValidator}
		/>
	) : null;

	const comboboxDropdown = (
		<Combobox.Options
			aria-label={ariaLabel}
			labelledBy={labelId}
		>
			{loadingType === 'overlay' && <LoadingOverlay visible={loading} />}
			{renderHeader ? (
				<Combobox.Header>{renderHeader({ combobox, data: filteredData })}</Combobox.Header>
			) : creatablePosition === 'header' && addOptionInput ? (
				<Combobox.Header>{addOptionInput}</Combobox.Header>
			) : null}
			{renderOptions ? renderOptions(filteredData, comboboxOptions) : comboboxOptions}
			{isEmpty && nothingFoundMessage ? <Combobox.Empty>{nothingFoundMessage}</Combobox.Empty> : null}
			{renderFooter ? (
				<Combobox.Footer>{renderFooter({ combobox, data: filteredData })}</Combobox.Footer>
			) : creatablePosition === 'footer' && addOptionInput ? (
				<Combobox.Footer>{addOptionInput}</Combobox.Footer>
			) : null}
		</Combobox.Options>
	);

	return (
		<Combobox.Dropdown
			className={classes.optionsDropdown}
			hidden={hidden ? hidden : hiddenWhenEmpty && isEmpty}
		>
			{renderDropdown ? renderDropdown({ data: filteredData, options: comboboxDropdown }) : comboboxDropdown}
		</Combobox.Dropdown>
	);
}
