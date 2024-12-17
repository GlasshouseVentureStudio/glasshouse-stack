import { useState } from 'react';
import { Card, type MantineSize, Slider, Stack, Text, Title } from '@mantine/core';
import { type Meta, type StoryObj } from '@storybook/react';

import { ScrollShadow } from '../scroll-shadow';

const meta: Meta<typeof ScrollShadow> = {
	title: 'Components/ScrollShadow',
	component: ScrollShadow,
	tags: ['autodocs'],
	decorators: [
		renderChildren => (
			<Card
				w={400}
				withBorder
			>
				{renderChildren()}
			</Card>
		),
	],
};

export default meta;

type ScrollShadowStory = StoryObj<typeof meta>;

const MARKS = [
	{ value: 0, label: 'xs' },
	{ value: 25, label: 'sm' },
	{ value: 50, label: 'md' },
	{ value: 75, label: 'lg' },
	{ value: 100, label: 'xl' },
];

const paragraph = `Charizard is a draconic, bipedal Pokémon. It is primarily orange with a cream underside from the chest to the tip of its tail. It has a long neck, small blue eyes, slightly raised nostrils, and two horn-like structures protruding from the back of its rectangular head. There are two fangs visible in the upper jaw when its mouth is closed. Two large wings with blue-green undersides sprout from its back, and a horn-like appendage juts out from the top of the third joint of each wing. A single wing-finger is visible through the center of each wing membrane. Charizard's arms are short and skinny compared to its robust belly, and each limb has three white claws. It has stocky legs with cream-colored soles on each of its plantigrade feet. The tip of its long, tapering tail burns with a sizable flame. As Mega Charizard X, its body and legs are more physically fit, though its arms remain thin. Its skin turns black with a sky-blue underside and soles. Two spikes with blue tips curve upward from the front and back of each shoulder, while the tips of its horns sharpen, turn blue, and curve slightly upward. Its brow and claws are larger, and its eyes are now red. It has two small, fin-like spikes under each horn and two more down its lower neck. The finger disappears from the wing membrane, and the lower edges are divided into large, rounded points. The third joint of each wing-arm is adorned with a claw-like spike. Mega Charizard X breathes blue flames out the sides of its mouth, and the flame on its tail now burns blue. It is said that its new power turns it black and creates more intense flames.`;

export const Default: ScrollShadowStory = {
	args: {
		h: 300,
	},
	render: args => (
		<ScrollShadow {...args}>
			<Stack px={20}>
				<Title>Charizard (Pokémon)</Title>{' '}
				<Text>Charizard description from Bulbapedia Charizard is a draconic, bipedal Pokémon.</Text>
				<Text>{paragraph}</Text>
			</Stack>
		</ScrollShadow>
	),
};

export const Horizontal: ScrollShadowStory = {
	...Default,
	args: {
		...Default.args,
		h: 300,
		orientation: 'horizontal',
	},
	render: args => (
		<ScrollShadow {...args}>
			<Stack
				px={20}
				w={1000}
			>
				<Title>Charizard (Pokémon)</Title>{' '}
				<Text>Charizard description from Bulbapedia Charizard is a draconic, bipedal Pokémon.</Text>
				<Text>{paragraph}</Text>
			</Stack>
		</ScrollShadow>
	),
};

export const ShadowSize: ScrollShadowStory = {
	...Default,
	args: {
		...Default.args,
		h: 300,
	},
	render: args => {
		// eslint-disable-next-line react-hooks/rules-of-hooks -- safe for stories
		const [size, setSize] = useState<MantineSize | undefined>('md');

		const _value = MARKS.find(mark => mark.label === size)?.value;

		const handleChange = (val: number) => {
			setSize(MARKS.find(mark => mark.value === val)?.label as MantineSize);
		};

		return (
			<>
				<Card.Section>
					<ScrollShadow
						{...args}
						shadowSize={size}
					>
						<Stack px={20}>
							<Title>Charizard (Pokémon)</Title>{' '}
							<Text>Charizard description from Bulbapedia Charizard is a draconic, bipedal Pokémon.</Text>
							<Text>{paragraph}</Text>
						</Stack>
					</ScrollShadow>
				</Card.Section>
				<Card.Section
					p={8}
					withBorder
				>
					<Stack gap={0}>
						<Text size='xs'>Shadow size</Text>
						<Slider
							label={val => MARKS.find(mark => mark.value === val)?.label}
							marks={MARKS}
							onChange={handleChange}
							step={25}
							thumbLabel='Radius'
							value={_value}
							w={200}
							styles={{
								markLabel: { display: 'none' },
							}}
						/>
					</Stack>
				</Card.Section>
			</>
		);
	},
};
