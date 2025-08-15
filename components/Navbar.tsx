"use client";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Map, LogOut, Bell } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useLogout } from "@/features/auth/auth";
import { getUser } from "@/features/user/useUser";
import { Skeleton } from "./ui/skeleton";

export default function Navbar() {
	const { data, isLoading } = getUser();
	const { mutate } = useLogout();
	return (
		<>
			<header className='px-4 lg:px-6 h-16  font-Euclid flex items-center border-b'>
				<Link
					className='flex items-center justify-center'
					href='/dashboard'
				>
					<Map className='h-6 w-6 mr-2' />
					<span className='font-bold text-xl'>GeoTrack</span>
				</Link>
				<nav className='ml-auto flex items-center font-Euclid gap-2 sm:gap-2'>
					<Button variant='ghost' size='icon'>
						<Bell className='h-220 w-220' />
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='ghost'
								className='relative h-10 w-10 rounded-full'
							>
								<Avatar className='h-8 w-8'>
									<AvatarImage alt='@johndoe' />
									<AvatarFallback>JD</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className='w-72 h-40 flex flex-col justify-around font-Euclid bg-background border border-primary z-10 text-md'
							align='end'
							forceMount
						>
							<DropdownMenuLabel className='font-normal'>
								{isLoading ? (
									<>
										{" "}
										<Skeleton className='h-[15px] w-[60px] bg-skeleton rounded-xl mb-5' />
										<Skeleton className='h-[15px] w-[200px] bg-skeleton rounded-xl' />
									</>
								) : (
									<div className='text-xl px-2'>
										<div>{data?.currentUser.username}</div>
										<div>{data?.currentUser.email}</div>
									</div>
								)}
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{/* logout */}
							<DropdownMenuItem>
								<Button
									onClick={() => mutate()}
									variant='ghost'
									size='sm'
									className='w-full py-5 pr-40 bg-secondary hover:bg-hover2 border border-primary '
								>
									<LogOut size={62} />
									<span className='text-lg justify-center font-ClashGrotex flex items-center gap-2'>
										Log out
									</span>
								</Button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</nav>
			</header>
		</>
	);
}
