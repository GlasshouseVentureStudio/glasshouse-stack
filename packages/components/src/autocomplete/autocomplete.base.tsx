import { type ForwardedRef, forwardRef, useEffect, useState } from 'react';
import {
	type AutocompleteFactory,
	Combobox,
	getOptionsLockup,
	getParsedComboboxData,
	InputBase,
	Loader,
	useCombobox,
	useResolvedStylesApi,
} from '@mantine/core';
import { useId, useUncontrolled } from '@mantine/hooks';
import omit from 'lodash.omit';

import { useProps } from '../../hooks/use-props';
import { OptionsDropdown } from '../combobox/options-dropdown';
import { type AutocompleteBaseProps } from './autocomplete.types';

const defaultProps: Partial<AutocompleteBaseProps> = {};

function AutocompleteBaseComponent(_props: AutocompleteBaseProps, ref: ForwardedRef<HTMLInputElement>) {
	const props = useProps('Autocomplete', defaultProps, _props);
	const {
		autoComplete,
		classNames,
		comboboxProps,
		creatable,
		creatablePosition,
		createInputValidator,
		data,
		defaultDropdownOpened,
		defaultValue,
		disabled,
		dropdownLoading,
		dropdownLoadingType,
		dropdownOpened,
		filter,
		id,
		limit,
		loading,
		maxDropdownHeight,
		onBlur,
		onChange,
		onClick,
		onCreate,
		onCreateError,
		onCreateSuccess,
		onDropdownClose,
		onDropdownOpen,
		onFocus,
		onOptionSubmit,
		readOnly,
		renderDropdown,
		renderFooter,
		renderHeader,
		renderOption,
		renderOptions,
		scrollAreaProps,
		selectFirstOptionOnChange,
		size,
		styles,
		unstyled,
		value,
		withScrollArea,
		...others
	} = props;

	const [internalData, setInternalData] = useState(data);

	useEffect(() => {
		setInternalData(data);
	}, [data]);

	const _id = useId(id);
	const parsedData = getParsedComboboxData(internalData);
	const optionsLockup = getOptionsLockup(parsedData);

	const [_value, setValue] = useUncontrolled({
		value,
		defaultValue,
		finalValue: '',
		onChange,
	});

	const combobox = useCombobox({
		opened: dropdownOpened,
		defaultOpened: defaultDropdownOpened,
		onDropdownOpen,
		onDropdownClose: () => {
			onDropdownClose?.();
			combobox.resetSelectedOption();
		},
	});

	const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<AutocompleteFactory>({
		props,
		styles,
		classNames,
	});

	useEffect(() => {
		if (selectFirstOptionOnChange) {
			combobox.selectFirstOption();
		}
	}, [selectFirstOptionOnChange, _value, combobox]);

	return (
		<Combobox
			__staticSelector='Autocomplete'
			classNames={resolvedClassNames}
			onOptionSubmit={val => {
				onOptionSubmit?.(val);
				optionsLockup[val]?.label && setValue(optionsLockup[val].label);
				combobox.closeDropdown();
			}}
			readOnly={readOnly}
			size={size}
			store={combobox}
			styles={resolvedStyles}
			unstyled={unstyled}
			{...comboboxProps}
		>
			<Combobox.Target autoComplete={autoComplete}>
				<InputBase
					ref={ref}
					{...omit(others, 'vars')}
					__staticSelector='Autocomplete'
					classNames={resolvedClassNames}
					disabled={disabled}
					id={_id}
					onBlur={event => {
						if (!creatable || (creatablePosition !== 'footer' && creatablePosition !== 'header')) {
							combobox.closeDropdown();
						}

						onBlur?.(event);
					}}
					onChange={event => {
						setValue(event.currentTarget.value);
						combobox.openDropdown();
						selectFirstOptionOnChange && combobox.selectFirstOption();
					}}
					onClick={event => {
						combobox.openDropdown();
						onClick?.(event);
					}}
					onFocus={event => {
						combobox.openDropdown();
						onFocus?.(event);
					}}
					readOnly={readOnly}
					rightSection={loading ? <Loader size='xs' /> : undefined}
					size={size}
					styles={resolvedStyles}
					unstyled={unstyled}
					value={_value}
				/>
			</Combobox.Target>
			<OptionsDropdown
				aria-label={others.label ? undefined : others['aria-label']}
				combobox={combobox}
				creatable={creatable}
				creatablePosition={creatablePosition}
				createInputValidator={createInputValidator}
				data={parsedData}
				filter={filter}
				hidden={readOnly ? readOnly : disabled}
				hiddenWhenEmpty
				labelId={others.label ? `${_id}-label` : undefined}
				limit={limit}
				loading={dropdownLoading}
				loadingType={dropdownLoadingType}
				maxDropdownHeight={maxDropdownHeight}
				onCreate={onCreate}
				onCreateError={onCreateError}
				onCreateSuccess={onCreateSuccess}
				renderDropdown={renderDropdown}
				renderFooter={renderFooter}
				renderHeader={renderHeader}
				renderOption={renderOption}
				renderOptions={renderOptions}
				scrollAreaProps={scrollAreaProps}
				search={_value}
				unstyled={unstyled}
				withScrollArea={withScrollArea}
			/>
		</Combobox>
	);
}

export const AutocompleteBase = forwardRef(AutocompleteBaseComponent);
