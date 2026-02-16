import HeaderClock from './clock';

export default function Header() {
	return (
		<header className='px-4 fixed inset-x-0 top-0 shadow shadow-border bg-background/70 backdrop-blur-sm z-90'>
			<div className='max-w-5xl mx-auto flex justify-center items-center py-4'>
				<HeaderClock />
			</div>
		</header>
	);
}
