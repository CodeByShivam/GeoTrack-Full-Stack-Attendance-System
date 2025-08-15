import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L, { LatLng } from "leaflet";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { Button } from "../ui/button";

const DrawPolygon: React.FC<{
	setMapCoordinates: (coords: LatLng[]) => void;
}> = ({ setMapCoordinates }) => {
	const map = useMap();

	useEffect(() => {
		const drawnItems = new L.FeatureGroup();
		map.addLayer(drawnItems);

		const drawControl = new L.Control.Draw({
			edit: { featureGroup: drawnItems },
			draw: {
				polygon: { allowIntersection: false, showArea: true },
				rectangle: {},
				circle: {},
				marker: false,
				circlemarker: false,
			},
		});

		map.addControl(drawControl);

		map.on(L.Draw.Event.CREATED, (event) => {
			const layer = event.layer;
			drawnItems.addLayer(layer);

			if (layer instanceof L.Polygon || layer instanceof L.Rectangle) {
				// Get the latLngs and flatten them
				const coords = layer.getLatLngs();

				// Function to flatten LatLng arrays
				const flattenCoords = (
					latlngs: L.LatLng[] | L.LatLng[][] | L.LatLng[][][] | L.LatLng
				): LatLng[] => {
					if (latlngs instanceof L.LatLng) {
						return [latlngs];
					} else if (Array.isArray(latlngs)) {
						return latlngs.flatMap(flattenCoords); // Recursively flatten arrays
					}
					return [];
				};

				const flattenedCoords = flattenCoords(coords);
				setMapCoordinates(flattenedCoords);
			}
		});

		return () => {
			map.off(L.Draw.Event.CREATED);
			map.removeControl(drawControl);
			map.removeLayer(drawnItems);
		};
	}, [map, setMapCoordinates]);

	return <></>;
};

const Geofence: React.FC<{
	setMapCoordinates: (coords: LatLng[]) => void;
	closeDialog: () => void;
}> = ({ setMapCoordinates, closeDialog }) => {
	const [localCoords, setLocalCoords] = useState<LatLng[]>([]);
	const handleSaveCoordinates = () => {
		setMapCoordinates(localCoords);
		closeDialog();
	};
	return (
		<div>
			<MapContainer
				center={[19.197725, 72.827111]} // Example coordinates (Mumbai)
				zoom={20}
				style={{ height: "100%", width: "100%" }}
			>
				<TileLayer
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				<DrawPolygon setMapCoordinates={setLocalCoords} />
			</MapContainer>
			<Button
				onClick={handleSaveCoordinates}
				className='text-white font-ClashGrotex text-lg p-6 absolute bottom-8 right-10 z-[500] rounded-lg bg-black hover:bg-gray-700'
			>
				Save Coordinates
			</Button>
		</div>
	);
};

export default Geofence;
