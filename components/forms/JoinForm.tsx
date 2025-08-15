"use client";

import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ClassMemberSchema } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { joinClass } from "@/features/class/useClass";
import { z } from "zod";

export default function JoinForm({ trigger }: { trigger: ReactNode }) {
	const { mutate, isPending } = joinClass();
	const [open, setOpen] = useState(false);
	const form = useForm<z.infer<typeof ClassMemberSchema>>({
		resolver: zodResolver(ClassMemberSchema),
		defaultValues: {
			classId: "",
		},
	});

	async function onSubmit(values: z.infer<typeof ClassMemberSchema>) {
		mutate(values);
		form.reset();
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className='sm:max-w-[425px] font-ClashGrotex '>
				<DialogHeader>
					<DialogTitle className='text-2xl font-Euclid text-primary'>
						Class code
					</DialogTitle>
					<DialogDescription className='text-lg'>
						Enter five digit class code to join the class
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-5'
					>
						{/* classname */}
						<FormField
							control={form.control}
							name='classId'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='font-ClashGrotex text-xl text-primary'>
										Code
									</FormLabel>
									<FormControl>
										<Input
											className='h-12 text-md'
											placeholder='enter class code'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							disabled={isPending}
							type='submit'
							className='w-full   p-5 bg-secondary border-primary border font-ClashGrotex text-xl hover:bg-hover2'
						>
							Join Class
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
