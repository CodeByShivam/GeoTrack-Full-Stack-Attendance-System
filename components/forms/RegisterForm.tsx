"use client";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { RegisterSchema } from "@/types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { useRegister } from "@/features/auth/auth";

export default function RegisterForm() {
	const { mutate, isPending } = useRegister();

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});
	function onSubmit(values: z.infer<typeof RegisterSchema>) {
		mutate(values);
	}

	return (
		<>
			<div className='w-[600px] p-8  space-y-10  '>
				<span className='text-4xl flex flex-col gap-3 text-primary font-Satoshi_B'>
					Register To Geotrack
					<Link
						className='text-lg font-Euclid  hover:underline hover:text-destructive'
						href='/login'
					>
						Already have an account..?
					</Link>
				</span>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-12'
					>
						<FormField
							disabled={isPending}
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-xl text-primary'>
										Username
									</FormLabel>
									<FormControl>
										<Input
											className='h-12 text-lg'
											placeholder='your@username'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							disabled={isPending}
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-xl text-primary'>
										Email
									</FormLabel>
									<FormControl>
										<Input
											className='h-12 text-lg'
											placeholder='your@email'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							disabled={isPending}
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-xl text-primary'>
										Password
									</FormLabel>
									<FormControl>
										<Input
											className='h-12 text-lg '
											placeholder='password'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							disabled={isPending}
							className='w-full bg-secondary hover:bg-hover2 text-xl h-12 border border-primary '
							type='submit'
						>
							Register
						</Button>
					</form>
				</Form>
			</div>
		</>
	);
}
