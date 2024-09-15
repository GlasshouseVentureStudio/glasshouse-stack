import { type ForwardedRef, forwardRef, useEffect, useMemo, useState } from 'react';
import {
	Combobox,
	type ComboboxItem,
	type ComboboxItemGroup,
	getOptionsLockup,
	getParsedComboboxData,
	InputBase,
	Loader,
	type OptionsDropdownProps,
	type SelectFactory,
	useCombobox,
	useResolvedStylesApi,
} from '@mantine/core';
import { useId, usePrevious, useUncontrolled } from '@mantine/hooks';

import { useProps } from '../../hooks/use-props';
import { OptionsDropdown } from '../combobox/options-dropdown';
import { type SelectBaseProps } from './select.types';

function SelectBaseComponent(_props: SelectBaseProps, ref: ForwardedRef<HTMLInputElement>) {
	const defaultProps: Partial<SelectBaseProps> = {
		searchable: false,
		withCheckIcon: true,
		allowDeselect: true,
		checkIconPosition: 'right',
	};

	const props = useProps('Select', defaultProps, _props);
	const {
		allowDeselect,
		autoComplete,
		checkIconPosition,
		classNames,
		clearable,
		clearButtonProps,
		comboboxProps,
		creatable,
		createInputValidator,
		creatablePosition,
		data,
		defaultDropdownOpened,
		defaultSearchValue,
		defaultValue,
		disabled,
		dropdownLoading,
		dropdownLoadingType = 'skeleton',
		dropdownOpened,
		error,
		filter,
		form,
		hiddenInputProps,
		id,
		limit,
		loading,
		maxDropdownHeight,
		name,
		nothingFoundMessage,
		onBlur,
		onChange,
		onClear,
		onClick,
		onCreate,
		onCreateError,
		onCreateSuccess,
		onDropdownClose,
		onDropdownOpen,
		onFocus,
		onOptionSubmit,
		onSearchChange,
		readOnly,
		renderDropdown,
		renderFooter,
		renderHeader,
		renderOption,
		renderOptions,
		rightSection,
		rightSectionPointerEvents,
		scrollAreaProps,
		searchable,
		searchValue,
		selectFirstOptionOnChange,
		size,
		styles,
		unstyled,
		value,
		withCheckIcon,
		withScrollArea,
		...others
	} = props;

	const [internalData, setInternalData] = useState(data);

	useEffect(() => {
		setInternalData(data);
	}, [data]);

	const parsedData = useMemo(() => getParsedComboboxData(internalData), [internalData]);

	const optionsLockup = useMemo(() => getOptionsLockup(parsedData), [parsedData]);
	const _id = useId(id);

	const [_value, setValue, controlled] = useUncontrolled({
		value,
		defaultValue,
		finalValue: null,
		onChange,
	});

	const selectedOption = typeof _value === 'string' ? optionsLockup[_value] : undefined;
	const previousSelectedOption = usePrevious(selectedOption);

	const [search, setSearch] = useUncontrolled({
		value: searchValue,
		defaultValue: defaultSearchValue,
		finalValue: selectedOption ? selectedOption.label : '',
		onChange: onSearchChange,
	});

	const combobox = useCombobox({
		opened: dropdownOpened,
		defaultOpened: defaultDropdownOpened,
		onDropdownOpen: () => {
			onDropdownOpen?.();
			combobox.updateSelectedOptionIndex('active', { scrollIntoView: true });
		},
		onDropdownClose: () => {
			onDropdownClose?.();
			combobox.resetSelectedOption();
		},
	});

	const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<SelectFactory>({
		props,
		styles,
		classNames,
	});

	useEffect(() => {
		if (selectFirstOptionOnChange) {
			combobox.selectFirstOption();
		}
	}, [selectFirstOptionOnChange, _value, combobox]);

	useEffect(() => {
		if (value === null) {
			setSearch('');
		}

		if (
			typeof value === 'string' &&
			selectedOption &&
			(previousSelectedOption?.value !== selectedOption.value || previousSelectedOption.label !== selectedOption.label)
		) {
			setSearch(selectedOption.label);
		}
	}, [value, selectedOption, previousSelectedOption?.value, previousSelectedOption?.label, setSearch]);

	const clearButton = clearable && Boolean(_value) && !disabled && !readOnly && (
		<Combobox.ClearButton
			size={size}
			{...clearButtonProps}
			onClear={() => {
				setValue(null, null);
				setSearch('');
				onClear?.();
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

	const optionsDropdownProps: OptionsDropdownProps = {
		'aria-label': others.label ? undefined : others['aria-label'],
		checkIconPosition,
		data: parsedData,
		filter,
		filterOptions: searchable && selectedOption?.label !== search,
		hidden: readOnly ? readOnly : disabled,
		hiddenWhenEmpty: !nothingFoundMessage,
		labelId: others.label ? `${_id}-label` : undefined,
		limit,
		maxDropdownHeight,
		nothingFoundMessage,
		renderOption,
		scrollAreaProps,
		search,
		unstyled,
		value: _value,
		withCheckIcon,
		withScrollArea,
	};

	const handleValueSelect = (val: string) => {
		onOptionSubmit?.(val);
		const item = optionsLockup[val]?.value === _value ? null : optionsLockup[val];
		const optionLockup = allowDeselect ? item : optionsLockup[val];

		const nextValue = optionLockup ? optionLockup.value : null;

		nextValue !== _value && setValue(nextValue, optionLockup);
		const optionLockupLabel = optionLockup?.label ? optionLockup.label : '';

		!controlled && setSearch(typeof nextValue === 'string' ? optionLockupLabel : '');
		combobox.closeDropdown();
	};

	/** Disable filter if search value equals selected option label. */
	const filterOptions = searchable && selectedOption?.label !== search;

	return (
		<>
			<Combobox
				classNames={resolvedClassNames}
				onOptionSubmit={handleValueSelect}
				readOnly={readOnly}
				size={size}
				store={combobox}
				styles={resolvedStyles}
				unstyled={unstyled}
				{...comboboxProps}
			>
				<Combobox.Target
					autoComplete={autoComplete}
					targetType={searchable ? 'input' : 'button'}
				>
					<InputBase
						ref={ref}
						id={_id}
						rightSection={loading ? <Loader size='xs' /> : inputRightSection}
						rightSectionPointerEvents={rightSectionPointerEvents ?? (clearButton ? 'all' : 'none')}
						{...others}
						classNames={resolvedClassNames}
						error={error}
						onBlur={event => {
							searchable && !creatable && combobox.closeDropdown();

							// Before it would reset the search value if the selectedOption is falsy.
							// Reset search value if value is empty.
							if (!value) {
								setSearch('');
							}

							onBlur?.(event);
						}}
						onChange={event => {
							setSearch(event.currentTarget.value);
							combobox.openDropdown();
							selectFirstOptionOnChange && combobox.selectFirstOption();
						}}
						onClick={event => {
							searchable ? combobox.openDropdown() : combobox.toggleDropdown();
							onClick?.(event);
						}}
						onFocus={event => {
							searchable && combobox.openDropdown();
							onFocus?.(event);
						}}
						pointer={!searchable}
						readOnly={readOnly ? readOnly : !searchable}
						size={size}
						styles={resolvedStyles}
						unstyled={unstyled}
						value={search}
					/>
				</Combobox.Target>
				<OptionsDropdown
					{...optionsDropdownProps}
					combobox={combobox}
					creatable={creatable}
					creatablePosition={creatablePosition}
					createInputValidator={createInputValidator}
					filterOptions={filterOptions}
					loading={dropdownLoading}
					loadingType={dropdownLoadingType}
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
					renderOptions={renderOptions}
				/>
			</Combobox>
			<Combobox.HiddenInput
				disabled={disabled}
				form={form}
				name={name}
				value={_value}
				{...hiddenInputProps}
			/>
		</>
	);
}

const SelectBase = forwardRef(SelectBaseComponent);

export { SelectBase };
