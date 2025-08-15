// CLIENT SIDE LEAFLET COMPONENT
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";
export const Map = dynamic(() => import("./GeoFence"), {
	loading: () => (
		<>
			<Skeleton className="bg-skeleton w-[80%] h-[80%]" />
		</>
	),
	ssr: false,
});
