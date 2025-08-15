import { useQuery } from "@tanstack/react-query";

export const getClassUsers = (classId: string | string[] | undefined) => {
	const query = useQuery({
		queryKey: ["classUsers", classId],
		queryFn: async () => {
			const res = await fetch(`/api/class/${classId}/users`);

			if (!res.ok) {
				throw new Error("Server error");
			}

			const data = await res.json();
			return data;
		},
		enabled: !!classId,
	});

	return query;
};
