'use client';

import { useEffect, useState } from 'react';
import { AnimatedDigit } from './animated-digit';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

export default function HeaderClock({ className }: { className?: string }) {
	const [time, setTime] = useState<Date | null>(null);

	useEffect(() => {
		setTime(new Date());

		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	if (!time) return null;

	const hours = time.getHours().toString().padStart(2, '0');
	const minutes = time.getMinutes().toString().padStart(2, '0');
	const seconds = time.getSeconds().toString().padStart(2, '0');

	const formattedDate = new Intl.DateTimeFormat('id-ID', {
		weekday: 'long',
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	}).format(time);

	return (
		<>
			<div className='text-lg'>{formattedDate}</div>
			<Separator orientation='vertical' className='mx-4' />
			<div className='flex items-center'>
				<div className='flex items-center'>
					<AnimatedDigit value={hours[0]} />
					<AnimatedDigit value={hours[1]} />
				</div>
				<span className='px-0.5 text-primary'>.</span>
				<div className='flex items-center'>
					<AnimatedDigit value={minutes[0]} />
					<AnimatedDigit value={minutes[1]} />
				</div>
				<span className='px-0.5 text-primary'>.</span>
				<div className='flex items-center'>
					<AnimatedDigit value={seconds[0]} />
					<AnimatedDigit value={seconds[1]} />
				</div>
			</div>
		</>
	);
}
