import Content from '@/components/content';
import Header from '@/components/header';
import { Course, GroupedSchedule, Lecturer } from '@/lib/definitions';
import clientPromise from '@/lib/mongodb';

function serializeLecturer(lecturer: Record<string, unknown>): Lecturer {
	return {
		_id: String(lecturer._id),
		name: lecturer.name as string,
		gender: lecturer.gender as string,
		avatar: (lecturer.avatar as string) ?? null,
		avatarFallback: lecturer.avatarFallback as string,
	};
}

function serializeCourse(course: Record<string, unknown>): Course {
	return {
		name: course.name as string,
		sks: course.sks as number,
		semester: course.semester as string,
		room: course.room as string,
		lecturers: (course.lecturers as Record<string, unknown>[]).map(
			serializeLecturer,
		),
	};
}

function parseStartTime(time: string): number {
	const [start] = time.split(' - ');
	const [hours, minutes] = start.split('.').map(Number);
	return hours * 60 + minutes;
}

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

	for (const day of days) {
		grouped[day] = [];
	}

	for (const item of schedules) {
		grouped[item.day].push({
			id: item._id.toString(),
			time: item.time,
			courses: (item.courses as Record<string, unknown>[]).map(
				serializeCourse,
			),
		});
	}

	for (const day of days) {
		grouped[day].sort(
			(a, b) => parseStartTime(a.time) - parseStartTime(b.time),
		);
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
