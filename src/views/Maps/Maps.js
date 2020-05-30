import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { useState, useEffect } from 'react';
import { SyncLoader } from 'halogenium';

const CustomSkinMap = withScriptjs(
	withGoogleMap(() => {
		const [LatLng, setLatLng] = useState({ lat: 37.5305195, lng: 126.9634576 });
		const [isLoading, setIsLoading] = useState(true);
		useEffect(() => {
			setIsLoading(true);
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(position => {
					setLatLng({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
					setTimeout(() => {
						setIsLoading(false);
					}, 1000);
				});
			}
		}, []);
		return isLoading ? (
			<div>
				<SyncLoader
					loading={isLoading}
					size="30px"
					color="#123abc"
					style={{ position: 'absolute', top: '50%', left: '50%' }}
				/>
			</div>
		) : (
			<GoogleMap
				defaultZoom={15}
				center={LatLng}
				defaultOptions={{
					scrollwheel: false,
					zoomControl: true,
					styles: [
						{
							featureType: 'water',
							stylers: [{ saturation: 43 }, { lightness: -11 }, { hue: '#0088ff' }],
						},
						{
							featureType: 'road',
							elementType: 'geometry.fill',
							stylers: [{ hue: '#ff0000' }, { saturation: -100 }, { lightness: 99 }],
						},
						{
							featureType: 'road',
							elementType: 'geometry.stroke',
							stylers: [{ color: '#808080' }, { lightness: 54 }],
						},
						{
							featureType: 'landscape.man_made',
							elementType: 'geometry.fill',
							stylers: [{ color: '#ece2d9' }],
						},
						{
							featureType: 'poi.park',
							elementType: 'geometry.fill',
							stylers: [{ color: '#ccdca1' }],
						},
						{
							featureType: 'road',
							elementType: 'labels.text.fill',
							stylers: [{ color: '#767676' }],
						},
						{
							featureType: 'road',
							elementType: 'labels.text.stroke',
							stylers: [{ color: '#ffffff' }],
						},
						{ featureType: 'poi', stylers: [{ visibility: 'off' }] },
						{
							featureType: 'landscape.natural',
							elementType: 'geometry.fill',
							stylers: [{ visibility: 'on' }, { color: '#b8cb93' }],
						},
						{ featureType: 'poi.park', stylers: [{ visibility: 'on' }] },
						{
							featureType: 'poi.sports_complex',
							stylers: [{ visibility: 'on' }],
						},
						{ featureType: 'poi.medical', stylers: [{ visibility: 'on' }] },
						{
							featureType: 'poi.business',
							stylers: [{ visibility: 'simplified' }],
						},
					],
				}}
			>
				<Marker position={LatLng} />
			</GoogleMap>
		);
	}),
);

export default function Maps() {
	return (
		<CustomSkinMap
			googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCBVhZH8Q5rxjZKnGAQKvrkm3Kb18xuKkI"
			loadingElement={<div style={{ height: `100%` }} />}
			containerElement={<div style={{ height: `100vh` }} />}
			mapElement={<div style={{ height: `100%` }} />}
		/>
	);
}
