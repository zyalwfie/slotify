'use client';

import { motion, AnimatePresence } from 'framer-motion';

export function AnimatedDigit({ value }: { value: string }) {
	return (
		<div className='relative h-6 w-4 overflow-hidden text-sm md:text-lg font-medium'>
			<AnimatePresence mode='wait'>
				<motion.span
					key={value}
					initial={{ y: '100%', opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: '-100%', opacity: 0 }}
					transition={{ duration: 0.35, ease: 'easeInOut' }}
					className='absolute inset-0 flex items-center justify-center font-mono'
				>
					{value}
				</motion.span>
			</AnimatePresence>
		</div>
	);
}
