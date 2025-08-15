"use client";
import { Button } from "@/components/ui/button";
import { getUser } from "@/features/user/useUser";
import { CircleFadingPlus, UserPlus } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import ClassForm from "./forms/ClassForm";
import { getClass, getEnrolledClasses } from "@/features/class/useClass";
import ClassCard from "./ClassCard";
import SkeletonCard from "./ui/skeletonCard";
import { Separator } from "@/components/ui/separator";
import JoinForm from "./forms/JoinForm";

export default function Dashboard() {
	const { data, isLoading } = getUser();

	const { data: classesData, isLoading: isClassesLoading } = getClass();
	const { data: EnrolledclassesData, isPending: isEnrolledClassesLoading } =
		getEnrolledClasses();
	return (
		<>
			<div className='flex flex-col gap-5 sm:flex-row  items-center p-5 sm:items-center sm:justify-between mb-5 '>
				<span className='text-5xl text-muted font-Satoshi_B'>
					{isLoading ? (
						<>
							<Skeleton className='h-[20px] w-[280px] bg-skeleton  mb-2' />
							<Skeleton className='h-[20px] w-[220px] bg-skeleton ' />
						</>
					) : (
						<h1>Hello, {data?.currentUser.username}</h1>
					)}
				</span>
				<div className='flex gap-4 '>
					<JoinForm
						trigger={
							<Button
								variant='outline'
								className='text-lg hover:bg-hover1'
							>
								<UserPlus />
								Join Class
							</Button>
						}
					/>

					{/* Class creation Form */}
					<ClassForm
						trigger={
							<Button
								variant='outline'
								className='text-lg border-primary hover:bg-hover2 bg-secondary'
							>
								<CircleFadingPlus />
								Create Class
							</Button>
						}
					/>
				</div>
			</div>

			<Separator />
			{/* Classes */}
			<div className=' p-5 relative top-10'>
				<span className='text-3xl text-primary font-ClashGrotex px-5'>
					Your Classes
				</span>
				<div className='flex flex-wrap gap-16  px-5 py-2 mt-5 '>
					{isClassesLoading ? (
						<>
							{Array.from({ length: 5 }).map((_, index) => (
								<SkeletonCard key={index} />
							))}
						</>
					) : (
						classesData?.map((classItem) => (
							<ClassCard
								key={classItem.code}
								classname={classItem.classname}
								description={
									classItem.description || "No description available"
								}
								code={classItem.code}
							/>
						))
					)}
				</div>
			</div>
			<Separator className='relative top-12 mb-10' />
			{/* Enrolled Classes */}
			<div className='p-5 relative top-10'>
				<span className='text-3xl text-primary font-ClashGrotex px-5'>
					Enrolled
				</span>
				<div className='flex flex-wrap gap-16 px-5 py-2 mt-5'>
					{isEnrolledClassesLoading ? (
						<>
							{Array.from({ length: 5 }).map((_, index) => (
								<SkeletonCard key={index} />
							))}
						</>
					) : (
						EnrolledclassesData?.map(({ classes, class_memberships }) => (
							<ClassCard
								key={classes.code}
								classname={classes.classname}
								description={
									classes.description || "no description available"
								}
								code={
									classes.code || class_memberships.code || "unkown"
								}
							/>
						))
					)}
				</div>
			</div>
		</>
	);
}
