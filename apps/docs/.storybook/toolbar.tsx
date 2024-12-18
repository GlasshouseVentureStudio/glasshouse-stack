import { useState } from 'react';
import {
	ActionIcon,
	ColorPicker,
	ColorSwatch,
	getThemeColor,
	Group,
	type MantineColor,
	Paper,
	Popover,
	Tooltip,
	useComputedColorScheme,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { MoonStarIcon, SunIcon, SunMoonIcon } from 'lucide-react';

export const Toolbar = ({ onPrimaryColorChange }: { onPrimaryColorChange?: (color: MantineColor) => void }) => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	const colorSchemeOptions = () => {
		switch (colorScheme) {
			case 'auto':
				return {
					icon: <SunIcon size={18} />,
					color: 'teal',
				};
			case 'dark':
				return {
					icon: <MoonStarIcon size={18} />,
					color: 'indigo',
				};
			case 'light':
				return {
					icon: <SunMoonIcon size={18} />,
					color: 'yellow',
				};
		}
	};

	const options = colorSchemeOptions();

	return (
		<Paper
			p='sm'
			radius={0}
		>
			<Group justify='flex-end'>
				<ColorPickerPopover onChange={onPrimaryColorChange} />
				<Tooltip label='Change color scheme'>
					<ActionIcon
						color={options.color}
						onClick={toggleColorScheme}
						variant='light'
					>
						{options.icon}
					</ActionIcon>
				</Tooltip>
			</Group>
		</Paper>
	);
};

const ColorPickerPopover = ({ onChange }: { onChange?: (color: MantineColor) => void }) => {
	const theme = useMantineTheme();
	const colorScheme = useComputedColorScheme();
	const primaryColorValue = getThemeColor(theme.primaryColor, theme);

	const [opened, setOpened] = useState(false);

	const primaryShade = typeof theme.primaryShade === 'number' ? theme.primaryShade : theme.primaryShade[colorScheme];

	const swatches = Object.entries(theme.colors).map(([name, colors]) => ({ name, value: colors[primaryShade] }));

	return (
		<Popover
			onChange={setOpened}
			opened={opened}
			width={256}
			withinPortal={false}
		>
			<Popover.Target>
				<Tooltip
					label='Change primary color'
					opened={opened ? false : undefined}
				>
					<ActionIcon
						variant='light'
						onClick={() => {
							setOpened(!opened);
						}}
					>
						<ColorSwatch
							color={primaryColorValue}
							radius='sm'
							size={18}
						/>
					</ActionIcon>
				</Tooltip>
			</Popover.Target>
			<Popover.Dropdown>
				<ColorPicker
					focusable
					format='hex'
					swatches={swatches.map(swatch => swatch.value)}
					value={primaryColorValue}
					withPicker={false}
					onChange={value => {
						const colorName = swatches.find(swatch => swatch.value === value)?.name;

						if (colorName) onChange?.(colorName);
					}}
				/>
			</Popover.Dropdown>
		</Popover>
	);
};
