import { type ForwardedRef, forwardRef, useEffect, useState } from 'react';
import {
	type __InputStylesNames,
	Combobox,
	type ComboboxItem,
	type ComboboxItemGroup,
	type ComboboxLikeStylesNames,
	extractStyleProps,
	getOptionsLockup,
	getParsedComboboxData,
	Loader,
	type MultiSelectFactory,
	Pill,
	PillsInput,
	useCombobox,
	useProps,
	useResolvedStylesApi,
	useStyles,
} from '@mantine/core';
import { useId, useUncontrolled } from '@mantine/hooks';
import omit from 'lodash.omit';

import { OptionsDropdown } from '../combobox/options-dropdown';
import { filterPickedValues } from './filter-picked-values';
import { type MultiSelectBaseProps } from './multi-select.types';

export type MultiSelectStylesNames = __InputStylesNames | ComboboxLikeStylesNames | 'pill' | 'pillsList' | 'inputField';

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
		withScrollArea,
		wrapperProps,
		...others
	} = props;

	const [internalData, setInternalData] = useState(data);

	useEffect(() => {
		setInternalData(data);
	}, [data]);

	const _id = useId(id);
	const parsedData = getParsedComboboxData(internalData);
	const optionsLockup = getOptionsLockup(parsedData);

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

	const getStyles = useStyles<MultiSelectFactory>({
		name: 'MultiSelect',
		classes: {},
		props,
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

	const values = _value.map((item, index) => (
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

	useEffect(() => {
		if (selectFirstOptionOnChange) {
			combobox.selectFirstOption();
		}
	}, [selectFirstOptionOnChange, _value, combobox]);

	const clearButton = clearable && _value.length > 0 && !disabled && !readOnly && (
		<Combobox.ClearButton
			size={size}
			{...clearButtonProps}
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

	const filteredData = filterPickedValues({ data: parsedData, value: _value });

	return (
		<>
			<Combobox
				__staticSelector='MultiSelect'
				classNames={resolvedClassNames}
				onOptionSubmit={val => {
					onOptionSubmit?.(val);
					setSearchValue('');
					combobox.updateSelectedOptionIndex('selected');

					const optionsLockupValue = optionsLockup[val]?.value;

					if (optionsLockupValue && _value.includes(optionsLockupValue)) {
						setValue(_value.filter(v => v !== optionsLockupValue));
						onRemove?.(optionsLockupValue);
					} else if (optionsLockupValue && _value.length < (maxValues ?? Infinity)) {
						setValue([..._value, optionsLockupValue]);
					}
				}}
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
						classNames={resolvedClassNames}
						data-expanded={combobox.dropdownOpened || undefined}
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
						mod={mod}
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
							unstyled={unstyled}
							{...getStyles('pillsList')}
						>
							{values}
							<Combobox.EventsTarget autoComplete={autoComplete}>
								<PillsInput.Field
									{...omit(rest, 'type')}
									ref={ref}
									id={_id}
									placeholder={placeholder}
									type={!searchable && !placeholder ? 'hidden' : 'visible'}
									{...getStyles('inputField')}
									disabled={disabled}
									onBlur={event => {
										onBlur?.(event);
										combobox.closeDropdown();
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
									pointer={!searchable}
									readOnly={readOnly ? readOnly : !searchable}
									unstyled={unstyled}
									value={_searchValue}
								/>
							</Combobox.EventsTarget>
						</Pill.Group>
					</PillsInput>
				</Combobox.DropdownTarget>

				<OptionsDropdown
					aria-label={label ? undefined : others['aria-label']}
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
					unstyled={unstyled}
					value={_value}
					withCheckIcon={withCheckIcon}
					withScrollArea={withScrollArea}
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
