'use client';

import { GroupedSchedule } from '@/lib/definitions';
import { useState } from 'react';
import Tabs from '../tabs';
import ScheduleWrapper from './schedule-wrapper';

type Props = {
	groupedSchedules: GroupedSchedule;
};

export default function Content({ groupedSchedules }: Props) {
	const getTodayInIndonesian = () => {
		return new Intl.DateTimeFormat('id-ID', {
			weekday: 'long',
		})
			.format(new Date())
			.toLowerCase();
	};

	const [activeDay, setActiveDay] = useState(getTodayInIndonesian);


	const schedules = groupedSchedules[activeDay] ?? [];

	return (
		<div className='flex items-center flex-col gap-6 w-full'>
			<Tabs
				activeTab={activeDay}
				onChange={setActiveDay}
				groupedSchedules={groupedSchedules}
			/>
			<ScheduleWrapper schedules={schedules} />
		</div>
	);
}