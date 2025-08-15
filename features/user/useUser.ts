import { client } from "@/backend/utils/hono.";
import { validateSession } from "@/backend/utils/validateRequest";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { METHODS } from "http";
// type UserResponseType = InferResponseType<typeof client.api.user.$get, 200>;

export const getUser = () => {
	const query = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const res = await client.api.user.$get();

			if (!res.ok) {
				throw new Error("Server Error");
			}
			const data = await res.json();
			return data;
		},
	});
	return query;
};
