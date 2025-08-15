import { useQuery } from "@tanstack/react-query";

export const getCoordinates = (classId: string | string[] | undefined) => {
	const query = useQuery({
		queryKey: ["coordinates", classId],
		queryFn: async () => {
			const res = await fetch(`/api/class/${classId}/coordinates`);

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
