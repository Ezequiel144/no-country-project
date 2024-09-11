/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function Vets() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState({
    lat: -34.58836,
    lng: -58.41053,
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error(error);
          }
        );
      }
    };

    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
      });

      const { Map } = await loader.importLibrary("maps");
      const { PlacesService } = await loader.importLibrary("places");

      const mapOptions: google.maps.MapOptions = {
        center: location,
        zoom: 15,
        mapId: "VETS",
      };

      const newMap = new Map(mapRef.current as HTMLDivElement, mapOptions);
      setMap(newMap);

      const newPlacesService = new PlacesService(newMap);
      setPlacesService(newPlacesService);
    };

    getUserLocation();
    initMap();
  }, []);

  useEffect(() => {
    if (map && placesService) {
      map.setCenter(location);

      const request: google.maps.places.PlaceSearchRequest = {
        location: new google.maps.LatLng(location.lat, location.lng),
        radius: 500,
        type: "veterinary_care",
      };

      placesService.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          console.log(results);
          setPlaces(results);

          results.forEach((place) => {
            if (place.geometry && place.geometry.location) {
              new google.maps.marker.AdvancedMarkerElement({
                map,
                position: place.geometry.location,
                title: place.name || "Veterinaria",
              });
            }
          });
        } else {
          console.error("Error al buscar lugares: ", status);
        }
      });
    }
  }, [location, map, placesService]);

  return (
    <div className="min-h-screen lg:px-28 my-12">
      <div className="h-[500px] w-full" ref={mapRef}></div>
      <div className="flex flex-col mt-4 gap-4">
        {places.slice(0, 10).map((place) => (
          <div
            key={place.place_id}
            className="flex justify-between p-4 border rounded-md shadow-sm"
          >
            <div>
              <h4 className="font-semibold">{place.name}</h4>
              <p>{place.vicinity}</p>
              <p>{place.formatted_phone_number}</p>
            </div>
            {place.photos && place.photos[0] ? (
              <img
                src={place.photos[0].getUrl({ maxWidth: 200 })}
                alt={place.name}
              />
            ) : (
              <img
                src="/images/cat-and-dog/amico.svg"
                alt="Imagen predeterminada"
                className="size-48"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
