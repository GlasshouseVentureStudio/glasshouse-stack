import { useState } from 'react';

import viteLogo from '../public/vite.svg';
import reactLogo from './assets/react.svg';

import './App.css';

const App = () => {
	const [count, setCount] = useState(0);

	return (
		<>
			<div>
				<a
					href='https://vitejs.dev'
					rel='noopener'
					target='_blank'
				>
					<img
						alt='Vite logo'
						className='logo'
						src={viteLogo}
					/>
				</a>
				<a
					href='https://react.dev'
					rel='noopener'
					target='_blank'
				>
					<img
						alt='React logo'
						className='logo react'
						src={reactLogo}
					/>
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className='card'>
				<button
					type='button'
					onClick={() => {
						setCount(count => count + 1);
					}}
				>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
		</>
	);
};

export default App;
