'use client';

import { CalendarRemove01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion } from 'motion/react';

export default function EmptySchedule() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, ease: 'easeOut' }}
			className='flex flex-col items-center justify-center py-16 px-6 w-full border border-dashed rounded-lg border-muted'
		>
			<HugeiconsIcon icon={CalendarRemove01Icon} />

			<div className='flex flex-col items-center gap-1.5 mt-2'>
				<p className='text-sm font-medium'>
					Tidak ada jadwal hari ini
				</p>
				<p className='text-xs text-muted-foreground'>
					Cek hari lain untuk melihat jadwal kuliah
				</p>
			</div>
		</motion.div>
	);
}
