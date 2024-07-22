import {
	ActionIcon,
	ColorPicker,
	ColorSwatch,
	getThemeColor,
	Group,
	MantineColor,
	Paper,
	Popover,
	Tooltip,
	useComputedColorScheme,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { IconMoonStars, IconSun, IconSunMoon } from '@tabler/icons-react';
import { useState } from 'react';

export const Toolbar = ({ onPrimaryColorChange }: { onPrimaryColorChange?: (color: MantineColor) => void }) => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	const colorSchemeOptions = () => {
		switch (colorScheme) {
			case 'auto':
				return {
					icon: <IconSunMoon size={18} />,
					color: 'teal',
				};
			case 'dark':
				return {
					icon: <IconMoonStars size={18} />,
					color: 'indigo',
				};
			case 'light':
				return {
					icon: <IconSun size={18} />,
					color: 'yellow',
				};
		}
	};

	const options = colorSchemeOptions();

	return (
		<Paper p='sm'>
			<Group justify='flex-end'>
				<ColorPickerPopover onChange={onPrimaryColorChange} />
				<Tooltip label='Change color scheme'>
					<ActionIcon
						variant='light'
						onClick={toggleColorScheme}
						color={options.color}
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
					opened={opened ? false : undefined}
					label='Change primary color'
				>
					<ActionIcon
						variant='light'
						onClick={() => setOpened(!opened)}
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
					format='hex'
					focusable
					value={primaryColorValue}
					onChange={value => {
						const colorName = swatches.find(swatch => swatch.value === value)?.name;
						if (colorName) onChange?.(colorName);
					}}
					withPicker={false}
					swatches={swatches.map(swatch => swatch.value)}
				/>
			</Popover.Dropdown>
		</Popover>
	);
};
