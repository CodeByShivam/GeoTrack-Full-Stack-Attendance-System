import { z } from "zod";

export const RegisterSchema = z.object({
	username: z.string().min(2).max(50),
	email: z.string().email(),
	password: z
		.string()
		.min(8, { message: "password must be atleast 8 characters long" })
		.max(20),
});

export const LoginSchema = z.object({
	username: z.string().min(2).max(50),
	password: z.string(),
});

export const ClassSchema = z.object({
	classname: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	description: z.string().min(2),
	coordinates: z.array(
		z.tuple([z.number().min(-90).max(90), z.number().min(-180).max(180)])
	),
});

export const ClassMemberSchema = z.object({
	classId: z.string().min(2),
});
