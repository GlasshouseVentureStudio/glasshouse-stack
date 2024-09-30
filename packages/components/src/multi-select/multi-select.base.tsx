import { type ForwardedRef, forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { cn } from '@glasshouse/utils';
import {
	Combobox,
	type ComboboxItem,
	type ComboboxItemGroup,
	extractStyleProps,
	getOptionsLockup,
	getParsedComboboxData,
	Loader,
	type MultiSelectFactory,
	Pill,
	PillsInput,
	rem,
	Text,
	Tooltip,
	useCombobox,
	useResolvedStylesApi,
	useStyles,
} from '@mantine/core';
import { useId, useUncontrolled } from '@mantine/hooks';
import omit from 'lodash.omit';
import { XIcon } from 'lucide-react';

import { useProps } from '../../hooks/use-props';
import { OptionsDropdown, SELECT_ALL_VALUE } from '../combobox/options-dropdown';
import { isLabelValueList, isOptionsGroupList } from '../combobox/options-dropdown/is-option-group-list';
import { MaxDisplayedValuesPill } from './multi-select.max-displayed-values-pill';
import { type MultiSelectBaseProps } from './multi-select.types';
import { filterPickedValues } from './multi-select.utils';

import classes from './multi-select.module.css';

const defaultProps: Partial<MultiSelectBaseProps> = {
	maxValues: Infinity,
	withCheckIcon: true,
	checkIconPosition: 'left',
	hiddenInputValuesDivider: ',',
};

function MultiSelectBaseComponent(_props: MultiSelectBaseProps, ref: ForwardedRef<HTMLInputElement>) {
	const props = useProps('MultiSelect', defaultProps, _props);
	const {
		checkIconPosition,
		className,
		classNames,
		clearable,
		clearButtonProps,
		comboboxProps,
		creatable,
		creatablePosition,
		createInputValidator,
		data,
		defaultDropdownOpened,
		defaultSearchValue,
		defaultValue,
		description,
		descriptionProps,
		disabled,
		dropdownLoading,
		dropdownLoadingType,
		dropdownOpened,
		error,
		errorProps,
		filter,
		form,
		hiddenInputProps,
		hiddenInputValuesDivider,
		hidePickedOptions,
		id,
		inputContainer,
		inputWrapperOrder,
		label,
		labelProps,
		leftSection,
		leftSectionPointerEvents,
		leftSectionProps,
		leftSectionWidth,
		limit,
		loading,
		maxDropdownHeight,
		maxValues,
		maxDisplayedValuesTooltipType,
		mod,
		name,
		nothingFoundMessage,
		onBlur,
		onChange,
		onClear,
		onCreate,
		onCreateError,
		onCreateSuccess,
		onDropdownClose,
		onDropdownOpen,
		onFocus,
		onKeyDown,
		onOptionSubmit,
		onRemove,
		onSearchChange,
		placeholder,
		radius,
		readOnly,
		renderDropdown,
		renderFooter,
		renderHeader,
		renderOption,
		renderOptions,
		required,
		rightSection,
		rightSectionPointerEvents,
		rightSectionProps,
		rightSectionWidth,
		scrollAreaProps,
		searchable,
		searchValue,
		selectFirstOptionOnChange,
		size,
		style,
		styles,
		unstyled,
		value,
		variant,
		withAsterisk,
		withCheckIcon,
		withErrorStyles,
		withMaxDisplayedValuesTooltip = true,
		withScrollArea,
		wrapperProps,
		canSelectAll,
		allowSelectAll = false,
		selectAllLabel,
		maxDisplayedValues,
		renderMaxDisplayedValuesLabel,
		mode = 'pills',
		floatingInput,
		lineClamp,
		tooltipProps,
		...others
	} = props;

	const [internalData, setInternalData] = useState(data);

	useEffect(() => {
		setInternalData(data);
	}, [data]);

	const _id = useId(id);
	const parsedData = getParsedComboboxData(internalData);

	const combobox = useCombobox({
		opened: dropdownOpened,
		defaultOpened: defaultDropdownOpened,
		onDropdownOpen,
		onDropdownClose: () => {
			onDropdownClose?.();
			combobox.resetSelectedOption();
		},
	});

	const {
		styleProps,
		rest: { autoComplete, ...rest },
	} = extractStyleProps(omit(others, 'vars', 'onPaste'));

	const [_value, setValue] = useUncontrolled({
		value,
		defaultValue,
		finalValue: [],
		onChange,
	});

	const [_searchValue, setSearchValue] = useUncontrolled({
		value: searchValue,
		defaultValue: defaultSearchValue,
		finalValue: '',
		onChange: onSearchChange,
	});

	const filteredData = filterPickedValues({ data: parsedData, value: _value });

	//use for reference for set value of group options
	const flatOptionsData = useMemo<ComboboxItem[]>(() => {
		const data = hidePickedOptions ? filteredData : parsedData;

		if (isOptionsGroupList(data)) {
			return data.reduce((acc: ComboboxItem[], group) => {
				return [...acc, ...group.items];
			}, []);
		}

		if (isLabelValueList(data)) {
			return data;
		}

		return [];
	}, [parsedData, filteredData, hidePickedOptions]);

	const optionsLockup = getOptionsLockup(parsedData);

	const getStyles = useStyles<MultiSelectFactory>({
		name: 'MultiSelect',
		props,
		classes,
		classNames,
		styles,
		unstyled,
	});

	const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<MultiSelectFactory>({
		props,
		styles,
		classNames,
	});

	const handleInputKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		onKeyDown?.(event);

		if (event.key === ' ' && !searchable) {
			event.preventDefault();
			combobox.toggleDropdown();
		}

		if (event.key === 'Backspace' && _searchValue.length === 0 && _value.length > 0) {
			const val = _value[_value.length - 1];

			if (val) {
				onRemove?.(val);
			}

			setValue(_value.slice(0, _value.length - 1));
		}
	};

	useEffect(() => {
		if (selectFirstOptionOnChange) {
			combobox.selectFirstOption();
		}
	}, [selectFirstOptionOnChange, _value, combobox]);

	const clearButton = clearable && _value.length > 0 && !disabled && !readOnly && (
		<Combobox.ClearButton
			size={size}
			{...clearButtonProps}
			icon={
				<XIcon
					style={{
						width: 'var(--cb-icon-size, 70%)',
						height: 'var(--cb-icon-size, 70%)',
					}}
				/>
			}
			onClear={() => {
				onClear?.();
				setValue([]);
				setSearchValue('');
			}}
		/>
	);

	const _rightSection = rightSection ?? (
		<Combobox.Chevron
			error={error}
			size={size}
			unstyled={unstyled}
		/>
	);

	const inputRightSection = clearButton ? clearButton : _rightSection;

	const valuesToDisplay =
		maxDisplayedValues && (maxDisplayedValues === _value.length ? maxDisplayedValues : maxDisplayedValues - 1);

	const showMaxDisplayedValuesLabel = maxDisplayedValues ? _value.length > maxDisplayedValues : false;

	const values = (maxDisplayedValues ? _value.slice(0, valuesToDisplay) : _value).map((item, index) => (
		<Pill
			// eslint-disable-next-line react/no-array-index-key -- ensure key is unique
			key={`${item}-${index}`}
			disabled={disabled}
			onRemove={() => {
				setValue(_value.filter(i => item !== i));
				onRemove?.(item);
			}}
			unstyled={unstyled}
			withRemoveButton={!readOnly && !optionsLockup[item]?.disabled}
			{...getStyles('pill')}
		>
			{optionsLockup[item]?.label ?? item}
		</Pill>
	));

	const renderMaxDisplayedTextValuesLabel = useCallback(() => {
		if (maxDisplayedValues) {
			return renderMaxDisplayedValuesLabel
				? renderMaxDisplayedValuesLabel(_value.length)
				: `, +${_value.length - (maxDisplayedValues - 1)} more`;
		}
	}, [_value.length, maxDisplayedValues, renderMaxDisplayedValuesLabel]);

	const tooltipTextContent = maxDisplayedValues
		? _value
				.slice(maxDisplayedValues - 1)
				.map(value => optionsLockup[value]?.label ?? value)
				.join(', ')
		: undefined;

	const textValues =
		_value.length > 0 ? (
			<Tooltip
				inline
				label={tooltipTextContent}
				maw={rem(320)}
				multiline
				{...tooltipProps}
			>
				<Text
					fz='var(--input-fz, var(--input-fz, var(--mantine-font-size-sm)))'
					lineClamp={lineClamp}
					span
					unstyled={unstyled}
					{...getStyles('pill')}
				>
					{_value
						.slice(0, valuesToDisplay)
						.map(item => optionsLockup[item]?.label ?? item)
						.join(', ')}
					{showMaxDisplayedValuesLabel ? renderMaxDisplayedTextValuesLabel() : null}
				</Text>
			</Tooltip>
		) : null;

	const handleValueSelect = (val: string) => {
		onOptionSubmit?.(val);
		setSearchValue('');
		combobox.updateSelectedOptionIndex('selected');

		const optionsLockupValue = optionsLockup[val]?.value;

		//select all items when select 'All' option
		if (val === SELECT_ALL_VALUE && _value.length !== flatOptionsData.length) {
			setValue(flatOptionsData.map(item => item.value));
		}
		//deselect all items when deselect 'All' option
		else if (val === SELECT_ALL_VALUE && _value.length === flatOptionsData.length) {
			setValue([]);
		} else if (optionsLockupValue && _value.includes(optionsLockupValue)) {
			setValue(_value.filter(v => v !== optionsLockupValue));
			onRemove?.(optionsLockupValue);
		} else if (optionsLockupValue && _value.length < (maxValues ?? Infinity)) {
			setValue([..._value, optionsLockupValue]);
		}
	};

	return (
		<>
			<Combobox
				__staticSelector='MultiSelect'
				classNames={resolvedClassNames}
				onOptionSubmit={handleValueSelect}
				readOnly={readOnly}
				size={size}
				store={combobox}
				styles={resolvedStyles}
				unstyled={unstyled}
				{...comboboxProps}
			>
				<Combobox.DropdownTarget>
					<PillsInput
						{...styleProps}
						__staticSelector='MultiSelect'
						__stylesApiProps={{
							...props,
							rightSectionPointerEvents: rightSectionPointerEvents ?? (clearButton ? 'all' : 'none'),
							multiline: true,
						}}
						className={className}
						classNames={{
							...resolvedClassNames,
							input: cn(classes.input, resolvedClassNames.input),
						}}
						description={description}
						descriptionProps={descriptionProps}
						disabled={disabled}
						error={error}
						errorProps={errorProps}
						id={_id}
						inputContainer={inputContainer}
						inputWrapperOrder={inputWrapperOrder}
						label={label}
						labelProps={labelProps}
						leftSection={leftSection}
						leftSectionPointerEvents={leftSectionPointerEvents}
						leftSectionProps={leftSectionProps}
						leftSectionWidth={leftSectionWidth}
						mod={[
							{
								expanded: combobox.dropdownOpened || undefined,
							},
							mod,
						]}
						multiline
						onClick={() => {
							searchable ? combobox.openDropdown() : combobox.toggleDropdown();
						}}
						pointer={!searchable}
						radius={radius}
						required={required}
						rightSection={loading ? <Loader size='xs' /> : inputRightSection}
						rightSectionPointerEvents={rightSectionPointerEvents ?? (clearButton ? 'all' : 'none')}
						rightSectionProps={rightSectionProps}
						rightSectionWidth={rightSectionWidth}
						size={size}
						style={style}
						styles={resolvedStyles}
						unstyled={unstyled}
						variant={variant}
						withAsterisk={withAsterisk}
						withErrorStyles={withErrorStyles}
						wrapperProps={wrapperProps}
					>
						<Pill.Group
							disabled={disabled}
							mod={{
								floating: floatingInput,
								hasvalue: _value.length > 0 && floatingInput,
								searchable,
								'line-clamp': lineClamp === 1 && floatingInput,
							}}
							unstyled={unstyled}
							{...getStyles('pillsList', {
								style: {
									'--text-line-clamp': lineClamp,
								},
							})}
						>
							{mode === 'pills' ? values : textValues}

							{showMaxDisplayedValuesLabel && mode === 'pills' ? (
								<MaxDisplayedValuesPill
									maxDisplayedValues={maxDisplayedValues}
									maxDisplayedValuesTooltipType={maxDisplayedValuesTooltipType ?? mode}
									onRemove={value => {
										setValue(_value.filter(i => value !== i));
										onRemove?.(value);
									}}
									optionsLockup={optionsLockup}
									renderMaxDisplayedValuesLabel={renderMaxDisplayedValuesLabel}
									values={_value}
									withMaxDisplayedValuesTooltip={withMaxDisplayedValuesTooltip}
								/>
							) : null}

							<Combobox.EventsTarget autoComplete={autoComplete}>
								<PillsInput.Field
									{...omit(rest, 'type', 'infinite')}
									ref={ref}
									disabled={disabled}
									id={_id}
									mod={{
										floating: floatingInput,
										hasvalue: _value.length > 0 && floatingInput,
										searchable,
									}}
									onBlur={event => {
										onBlur?.(event);
										!creatable && combobox.closeDropdown();
										setSearchValue('');
									}}
									onChange={event => {
										setSearchValue(event.currentTarget.value);
										searchable && combobox.openDropdown();
										selectFirstOptionOnChange && combobox.selectFirstOption();
									}}
									onFocus={event => {
										onFocus?.(event);
										searchable && combobox.openDropdown();
									}}
									onKeyDown={handleInputKeydown}
									placeholder={placeholder}
									pointer={!searchable}
									readOnly={readOnly ? readOnly : !searchable}
									type={!searchable && !placeholder ? 'hidden' : 'visible'}
									unstyled={unstyled}
									value={_searchValue}
									{...getStyles('inputField')}
								/>
							</Combobox.EventsTarget>
						</Pill.Group>
					</PillsInput>
				</Combobox.DropdownTarget>
				<OptionsDropdown
					allowSelectAll={allowSelectAll || canSelectAll}
					aria-label={label ? undefined : others['aria-label']}
					canSelectAll={allowSelectAll || canSelectAll}
					checkIconPosition={checkIconPosition}
					combobox={combobox}
					creatable={creatable}
					creatablePosition={creatablePosition}
					createInputValidator={createInputValidator}
					data={hidePickedOptions ? filteredData : parsedData}
					filter={filter}
					filterOptions={searchable}
					hidden={readOnly ? readOnly : disabled}
					hiddenWhenEmpty={!nothingFoundMessage}
					labelId={label ? `${_id}-label` : undefined}
					limit={limit}
					loading={dropdownLoading}
					loadingType={dropdownLoadingType}
					maxDropdownHeight={maxDropdownHeight}
					nothingFoundMessage={nothingFoundMessage}
					onCreate={onCreate}
					onCreateError={onCreateError}
					onCreateSuccess={value => {
						setInternalData(internalData => [
							{ value, label: value },
							...(internalData as (string | ComboboxItem | ComboboxItemGroup)[]),
						]);
						onCreateSuccess?.(value);
					}}
					renderDropdown={renderDropdown}
					renderFooter={renderFooter}
					renderHeader={renderHeader}
					renderOption={renderOption}
					renderOptions={renderOptions}
					scrollAreaProps={scrollAreaProps}
					search={_searchValue}
					selectAllLabel={selectAllLabel}
					unstyled={unstyled}
					value={_value}
					withCheckIcon={withCheckIcon}
					withScrollArea={withScrollArea}
					{...getStyles('option')}
				/>
			</Combobox>
			<Combobox.HiddenInput
				disabled={disabled}
				form={form}
				name={name}
				value={_value}
				valuesDivider={hiddenInputValuesDivider}
				{...hiddenInputProps}
			/>
		</>
	);
}

export const MultiSelectBase = forwardRef(MultiSelectBaseComponent);
