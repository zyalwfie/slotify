import Content from '@/components/content';
import Header from '@/components/header';
import { GroupedSchedule } from '@/lib/definitions';
import clientPromise from '@/lib/mongodb';

async function getGroupedSchedules(): Promise<GroupedSchedule> {
	const client = await clientPromise;
	const db = client.db(process.env.MONGODB_DB);

	const schedules = await db
		.collection('schedules')
		.aggregate([
			{ $unwind: '$courses' },

			{
				$lookup: {
					from: 'lecturers',
					localField: 'courses.lecturers',
					foreignField: '_id',
					as: 'courses.lecturers',
				},
			},

			{
				$group: {
					_id: {
						scheduleId: '$_id',
						day: '$day',
						time: '$time',
					},
					courses: { $push: '$courses' },
				},
			},

			{
				$project: {
					_id: '$_id.scheduleId',
					day: '$_id.day',
					time: '$_id.time',
					courses: 1,
				},
			},
		])
		.toArray();

	const days = [
		'senin',
		'selasa',
		'rabu',
		'kamis',
		'jumat',
		'sabtu',
		'minggu',
	];

	const grouped: GroupedSchedule = {};

	days.forEach((day) => {
		grouped[day] = [];
	});

	for (const item of schedules) {
		grouped[item.day].push({
			id: item._id.toString(),
			time: item.time,
			courses: item.courses,
		});
	}

	return grouped;
}

export default async function Page() {
	const groupedSchedules = await getGroupedSchedules();

	return (
		<>
			<Header />

			<main className='px-4'>
				<section className='max-w-5xl mx-auto mt-34 pb-10 flex flex-col gap-10'>
					<div className='flex flex-col gap-2 items-center'>
						<h1 className='font-semibold text-3xl md:text-4xl lg:text-5xl text-center'>
							Jadwal kuliah
						</h1>
						<p className='text-balance text-center'>
							Biar nggak salah kelas, nggak salah hari, dan nggak
							salah prioritas.
						</p>
					</div>
					<Content groupedSchedules={groupedSchedules} />
				</section>
			</main>
		</>
	);
}
