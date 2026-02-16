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
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarRemove01Icon, Time03Icon } from '@hugeicons/core-free-icons';
import { Separator } from '../ui/separator';
import React from 'react';
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '../ui/empty';

export default function ScheduleWrapper({ schedules }: SchedulePropsType) {
	return (
		<div className='flex flex-col md:flex-row gap-8 items-start w-full'>
			{schedules.length === 0 ? (
				<Empty className='border border-dashed'>
					<EmptyHeader>
						<EmptyMedia variant='icon'>
							<HugeiconsIcon
								icon={CalendarRemove01Icon}
								strokeWidth={2}
							/>
						</EmptyMedia>
						<EmptyTitle>
							Tidak ada jadwal kuliah hari ini
						</EmptyTitle>
						<EmptyDescription>
							Periksa hari lain dan jangan sampai kelewatan jadwal
							kuliah.
						</EmptyDescription>
					</EmptyHeader>
				</Empty>
			) : (
				schedules.map((schedule, index) => (
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
												<CardTitle>
													{course.name}
												</CardTitle>
												<CardDescription>
													{course.sks} SKS | Semester{' '}
													{course.semester}
												</CardDescription>
											</CardHeader>

											<CardContent>
												<p>
													Jumlah mahasiswa:{' '}
													{course.studentCount ?? 0}
												</p>
											</CardContent>

											<CardFooter>
												<div className='flex flex-col gap-3'>
													{course.lecturers.map(
														(lecturer) => (
															<div
																key={lecturer._id.toString()}
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
																<div>
																	<p>
																		{
																			lecturer.name
																		}
																	</p>
																</div>
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
							<Separator orientation='vertical' />
						)}
					</React.Fragment>
				))
			)}
		</div>
	);
}
