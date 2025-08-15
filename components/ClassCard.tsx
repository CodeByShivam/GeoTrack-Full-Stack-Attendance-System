import { useState } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import Link from "next/link";

interface ClassCardProps {
	classname: string;
	description: string;
	code: string;
}

export default function ClassCard({
	classname,
	description,
	code,
}: ClassCardProps) {
	const [isCopied, setIsCopied] = useState(false);
	const id = code;
	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy text: ", err);
		}
	};

	return (
		<Card className='w-full max-w-md p-0 border-2 border-primary rounded-md font-ClashGrotex text-muted cursor-pointer'>
			<Link href={`dashboard/classes/${id}`}>
				<CardHeader className='bg-black p-4 text-white font-Euclid'>
					<CardTitle>{classname}</CardTitle>
				</CardHeader>
			</Link>

			<Separator />
			<CardContent className='grid gap-4 mt-5'>
				<p className='text-md text-muted'>{description}</p>
			</CardContent>
			<CardFooter className='p-2'>
				<div className='relative rounded-md w-full hover:bg-hover2 border border-primary p-4'>
					<pre className='text-sm font-Euclid p-0'>
						<code>{code}</code>
					</pre>
					<Button
						variant='ghost'
						size='icon'
						className='absolute top-2 right-2'
						onClick={(e) => {
							e.stopPropagation();
							copyToClipboard();
						}}
						aria-label={isCopied ? "Copied" : "Copy code"}
					>
						{isCopied ? (
							<Check className='h-4 w-4' />
						) : (
							<Copy className='h-4 w-4' />
						)}
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
