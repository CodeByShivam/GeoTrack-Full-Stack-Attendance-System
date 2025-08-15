"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClassSchema } from "@/types";
import { Map } from "../map/map";
import { LatLng } from "leaflet";
import { MapPin } from "lucide-react";
import { useClass } from "@/features/class/useClass";

export default function ClassForm({ trigger }: { trigger: ReactNode }) {
	//
	const { mutate, isPending } = useClass();

	// map coordinates
	const [coordinates, setCoordinates] = useState<LatLng[]>([]);
	const [isMapOpen, setIsMapOpen] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	// function to convert to num[][]
	const formattedCoordinates = coordinates.map((latLng) => [
		latLng.lat, // Latitude
		latLng.lng, // Longitude
	]) as [number, number][];

	// dialog state
	const closeMapDialog = () => {
		setIsMapOpen(false);
		console.log(":test");
	};

	// Form validation
	const form = useForm<z.infer<typeof ClassSchema>>({
		resolver: zodResolver(ClassSchema),
		defaultValues: {
			classname: "",
			description: "",
			coordinates: [],
		},
	});

	async function onSubmit(values: z.infer<typeof ClassSchema>) {
		const data = {
			...values,
			coordinates: formattedCoordinates,
		};
		mutate(data);
		if (!isPending) {
			setIsOpen(false);
		}
		form.reset();
		setCoordinates([]);
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-2xl font-Euclid text-primary'>
						Create Class
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-5'
					>
						{/* classname */}
						<FormField
							control={form.control}
							name='classname'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='font-ClashGrotex text-xl text-primary'>
										Classname
									</FormLabel>
									<FormControl>
										<Input
											className='h-12 text-md'
											placeholder='your@classname'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* description */}
						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='font-ClashGrotex text-xl text-primary'>
										Description
									</FormLabel>
									<FormControl>
										<Input
											className='h-12 text-md '
											placeholder='your@description'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div>
							<Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
								<h1 className='text-xl font-ClashGrotex mb-4 text-primary'>
									Create Geofence
								</h1>
								<DialogTrigger asChild>
									<Button
										variant='outline'
										className=' font-ClashGrotex text-lg hover:bg-hover1 p-5'
									>
										<MapPin />
										Open Map
									</Button>
								</DialogTrigger>
								<DialogTitle></DialogTitle>
								<DialogContent className='max-w-[90%] max-h-[90%] h-screen w-screen   m-0 p-0'>
									<Map
										closeDialog={closeMapDialog}
										setMapCoordinates={setCoordinates}
									/>
								</DialogContent>
							</Dialog>
						</div>
						{/* submit */}

						<Button
							disabled={isPending}
							type='submit'
							className='w-full   p-5 bg-secondary border-primary border font-ClashGrotex text-xl hover:bg-hover2'
						>
							Save Class
						</Button>
					</form>
				</Form>
				{/* Map Dialog */}
			</DialogContent>
		</Dialog>
	);
}
