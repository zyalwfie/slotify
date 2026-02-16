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
	studentCount: number | null;
	lecturers: Lecturer[];
};

export type Schedule = {
	id: string;
	time: string;
	courses: Course[];
};

export type GroupedSchedule = {
	[day: string]: {
		id: string;
		time: string;
		courses: Course[];
	}[];
};

export type GroupedItemType = {
	id: string;
	time: string;
	courses: Course[];
};

export type SchedulePropsType = {
	schedules: GroupedItemType[];
};
