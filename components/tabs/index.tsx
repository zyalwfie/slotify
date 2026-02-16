import { GroupedSchedule } from '@/lib/definitions';
import AnimatedTabs from './animated-tabs';

type TabsProps = {
	activeTab: string;
	onChange: (tabId: string) => void;
	groupedSchedules: GroupedSchedule;
};

export default function Tabs({ activeTab, onChange }: TabsProps) {
	const tabs = [
		{ id: 'minggu', label: 'Minggu' },
		{ id: 'senin', label: 'Senin' },
		{ id: 'selasa', label: 'Selasa' },
		{ id: 'rabu', label: 'Rabu' },
		{ id: 'kamis', label: 'Kamis' },
		{ id: 'jumat', label: 'Jumat' },
		{ id: 'sabtu', label: 'Sabtu' },
	];

	return (
		<AnimatedTabs
			activeTab={activeTab}
			tabs={tabs}
			onChange={onChange}
			variant='pill'
			layoutId='schedules'
		/>
	);
}
