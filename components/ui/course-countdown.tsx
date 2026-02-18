'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { HugeiconsIcon } from '@hugeicons/react';
import {
	RecordIcon,
    Time01Icon,
    SchoolBell02Icon,
    Video01Icon,
} from '@hugeicons/core-free-icons';

type CountdownStatus =
	| { type: 'ongoing' }
	| { type: 'upcoming'; diffMs: number };

const DAY_MAP: Record<string, number> = {
	minggu: 0,
	senin: 1,
	selasa: 2,
	rabu: 3,
	kamis: 4,
	jumat: 5,
	sabtu: 6,
};

function parseTime(time: string): { hours: number; minutes: number } {
	const [hours, minutes] = time.split('.').map(Number);
	return { hours, minutes };
}

function getStatus(day: string, timeSlot: string): CountdownStatus {
	const now = new Date();
	const [startStr, endStr] = timeSlot.split(' - ');
	const start = parseTime(startStr);
	const end = parseTime(endStr);

	const currentDay = now.getDay();
	const targetDay = DAY_MAP[day];

	const todayStart = new Date(now);
	todayStart.setHours(start.hours, start.minutes, 0, 0);

	const todayEnd = new Date(now);
	todayEnd.setHours(end.hours, end.minutes, 0, 0);

	if (currentDay === targetDay) {
		if (now >= todayStart && now < todayEnd) {
			return { type: 'ongoing' };
		}

		if (now < todayStart) {
			return {
				type: 'upcoming',
				diffMs: todayStart.getTime() - now.getTime(),
			};
		}
	}

	let daysUntil = (targetDay - currentDay + 7) % 7;
	if (daysUntil === 0) daysUntil = 7;

	const nextDate = new Date(now);
	nextDate.setDate(now.getDate() + daysUntil);
	nextDate.setHours(start.hours, start.minutes, 0, 0);

	return { type: 'upcoming', diffMs: nextDate.getTime() - now.getTime() };
}

function formatCountdown(ms: number): string {
	const totalSeconds = Math.floor(ms / 1000);
	const days = Math.floor(totalSeconds / 86400);
	const hours = Math.floor((totalSeconds % 86400) / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	if (days > 0) {
		return `${days} hari ${hours} jam lagi`;
	}

	if (hours > 0) {
		return `${hours} jam ${minutes} menit lagi`;
	}

	return `${minutes} menit ${seconds} detik lagi`;
}

const FIFTEEN_MINUTES = 15 * 60 * 1000;

type Props = {
	day: string;
	time: string;
};

export default function CourseCountdown({ day, time }: Props) {
	const [status, setStatus] = useState<CountdownStatus>(() =>
		getStatus(day, time),
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setStatus(getStatus(day, time));
		}, 1000);

		return () => clearInterval(interval);
	}, [day, time]);

	if (status.type === 'ongoing') {
		return (
			<Badge className='bg-emerald-50 border-emerald-500/30 text-emerald-600 animate-pulse'>
				<HugeiconsIcon icon={Video01Icon} strokeWidth={2} />
				Kelas sedang berlangsung
			</Badge>
		);
	}

	const isUrgent = status.diffMs <= FIFTEEN_MINUTES;

	return (
		<Badge
			variant='outline'
			className={
				isUrgent
					? 'border-red-500/30 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20'
					: 'border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20'
			}
		>
			<HugeiconsIcon
				icon={isUrgent ? SchoolBell02Icon : Time01Icon}
				strokeWidth={2}
			/>
			Dimulai {formatCountdown(status.diffMs)}
		</Badge>
	);
}
