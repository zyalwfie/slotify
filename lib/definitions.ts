export type Lecturer = {
	_id: string;
	name: string;
	avatar: string | null;
	avatarFallback: string;
	gender: string;
};

export type Course = {
	name: string;
	sks: number;
	semester: string;
	room: string;
	lecturers: Lecturer[];
};

export type ScheduleSlot = {
	id: string;
	time: string;
	courses: Course[];
};

export type GroupedSchedule = {
	[day: string]: ScheduleSlot[];
};

export type SchedulePropsType = {
	day: string;
	schedules: ScheduleSlot[];
};
