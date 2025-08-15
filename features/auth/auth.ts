import { InferRequestType, InferResponseType } from "hono";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { client } from "@/backend/utils/hono.";
import { toast, useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
// HONO RPC TYPES
type RegisterResponseType = InferResponseType<typeof client.api.register.$post>;
type RegisterRequestType = InferRequestType<
	typeof client.api.register.$post
>["json"];

// register
export const useRegister = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const query = useMutation<RegisterResponseType, Error, RegisterRequestType>({
		mutationKey: ["register"],
		mutationFn: async (json) => {
			const res = await client.api.register.$post({ json });
			if (!res.ok) {
				throw new Error("server error");
			}
			return await res.json();
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			toast({
				variant: "constructive",
				title: "Account Created Successfully!!!",
			});
			router.push("/dashboard");
		},
		onError: () => {
			toast({
				variant: "destructive",
				title: "Uh oh! Something went wrong.",
			});
		},
	});
	return query;
};

//login
type LoginResponseType = InferResponseType<typeof client.api.login.$post>;
type LoginRequestType = InferRequestType<typeof client.api.login.$post>["json"];

export const useLogin = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const router = useRouter();
	const query = useMutation<LoginResponseType, Error, LoginRequestType>({
		mutationKey: ["login"],
		mutationFn: async (json) => {
			const res = await client.api.login.$post({ json });

			if (!res.ok) {
				throw new Error("Server Error");
			}

			// If response is okay, return the parsed JSON result
			return await res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			toast({
				variant: "constructive",
				title: "Login successful",
			});
			router.push("/dashboard");
		},
		onError: () => {
			toast({
				variant: "destructive",
				title: "Uh oh! Invalid Credentials",
				description: "please enter correct credentials",
			});
		},
	});
	return query;
};

// logout
export const useLogout = () => {
	const { toast } = useToast();
	const router = useRouter();
	const query = useMutation({
		mutationKey: ["logout"],
		mutationFn: async (json) => {
			const res = await client.api.logout.$post();

			if (!res.ok) {
				throw new Error("Server Error");
			}

			// If response is okay, return the parsed JSON result
			return await res.json();
		},
		onSuccess: () => {
			toast({
				variant: "default",
				title: "Logout successful",
			});
			router.push("/login");
		},
		onError: () => {
			toast({
				variant: "destructive",
				title: "Uh oh! something went wrong",
			});
		},
	});
	return query;
};
