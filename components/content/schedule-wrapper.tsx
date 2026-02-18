import { SchedulePropsType } from '@/lib/definitions';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { HugeiconsIcon } from '@hugeicons/react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	CardAction,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	Time03Icon,
	WeightScale01Icon,
	GraduationScrollIcon,
	Door01Icon,
} from '@hugeicons/core-free-icons';
import { Separator } from '../ui/separator';
import React from 'react';
import CourseCountdown from '@/components/ui/course-countdown';
import EmptySchedule from './empty-schedule';

export default function ScheduleWrapper({ day, schedules }: SchedulePropsType) {
	if (schedules.length === 0) {
		return <EmptySchedule />;
	}

	return (
		<div className='flex flex-col md:flex-row gap-8 items-start w-full'>
			{schedules.map((schedule, index) => (
				<React.Fragment key={schedule.id}>
					<div className='flex gap-8 w-full'>
						<div className='flex flex-col gap-4 grow'>
							<Badge className='font-semibold'>
								<HugeiconsIcon
									icon={Time03Icon}
									strokeWidth={2.5}
								/>
								{schedule.time}
							</Badge>

							<div className='flex flex-col gap-4'>
								{schedule.courses.map((course, i) => (
									<Card key={i}>
										<CardHeader>
											<CardTitle className='mb-1.5'>
												{course.name}
											</CardTitle>
											<CardDescription className='flex items-center gap-2'>
												<p className='flex gap-1 items-center'>
													<HugeiconsIcon
														icon={WeightScale01Icon}
														size={16}
													/>
													{course.sks} SKS
												</p>
												<Separator orientation='vertical' />
												<p className='flex items-center gap-1'>
													<HugeiconsIcon
														icon={
															GraduationScrollIcon
														}
														size={16}
													/>
													Semester {course.semester}
												</p>
											</CardDescription>
											<CardAction>
												<Badge variant='secondary'>
													<HugeiconsIcon
														icon={Door01Icon}
														strokeWidth={2}
													/>
													{course.room}
												</Badge>
											</CardAction>
										</CardHeader>

										<CardContent>
											<CourseCountdown
												day={day}
												time={schedule.time}
											/>
										</CardContent>

										<CardFooter>
											<div className='flex flex-col gap-3'>
												{course.lecturers.map(
													(lecturer) => (
														<div
															key={lecturer._id}
															className='flex items-center gap-2'
														>
															<Avatar>
																<AvatarImage
																	src={
																		lecturer.gender ===
																		'male'
																			? '/male.svg'
																			: '/female.svg'
																	}
																/>
																<AvatarFallback>
																	{
																		lecturer.avatarFallback
																	}
																</AvatarFallback>
															</Avatar>
															<p>
																{lecturer.name}
															</p>
														</div>
													),
												)}
											</div>
										</CardFooter>
									</Card>
								))}
							</div>
						</div>
					</div>

					{index !== schedules.length - 1 && (
						<>
							<Separator
								orientation='horizontal'
								className='md:hidden'
							/>
							<Separator
								orientation='vertical'
								className='hidden md:block'
							/>
						</>
					)}
				</React.Fragment>
			))}
		</div>
	);
}