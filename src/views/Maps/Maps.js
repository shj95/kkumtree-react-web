import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { useState, useEffect, useRef } from 'react';
import { SyncLoader } from 'halogenium';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/modules/store/actions';
import swal from 'sweetalert';

const CustomSkinMap = withScriptjs(
	withGoogleMap(({ props }) => {
		const [LatLng, setLatLng] = useState({ lat: 37.5305195, lng: 126.9634576 }); // 기본 좌표 : 용산역
		const [isLoading, setIsLoading] = useState(false);
		const mapRef = useRef(null);
		useEffect(() => {
			setIsLoading(true);
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					position => {
						setLatLng({
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						});
						console.log(props);
						props.requestStoreMapList({
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						});
						setTimeout(() => {
							setIsLoading(false);
						}, 500);
					},
					err => {
						swal(
							'현재 위치를 알 수 없습니다.',
							'현재 위치를 받아오기 위하여, 위치 정보 이용 동의가 필요합니다. ',
							'error',
						);

						setTimeout(() => {
							setIsLoading(false);
						}, 500);
					},
				);
			}
		}, []);

		function handleLoad(map) {
			mapRef.current = map;
		}

		function handleDragEnded() {
			if (!mapRef.current) return;
			const newPos = mapRef.current.getCenter().toJSON();
			props.requestStoreMapList(newPos.lat, newPos.lng);
		}

		return isLoading ? (
			<div>
				<SyncLoader
					loading={isLoading}
					size="20px"
					color="#36D7B7"
					style={{ position: 'absolute', top: '50%', left: 'calc(50% - 30px)' }}
				/>
			</div>
		) : (
			<GoogleMap
				ref={handleLoad}
				defaultZoom={15}
				center={LatLng}
				onDragEnd={handleDragEnded}
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

function Maps(props) {
	return (
		<CustomSkinMap
			googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCBVhZH8Q5rxjZKnGAQKvrkm3Kb18xuKkI"
			loadingElement={<div style={{ height: `100%` }} />}
			containerElement={<div style={{ height: `calc(100vh - 70px)` }} />}
			mapElement={<div style={{ height: `100%` }} />}
			props={props}
		/>
	);
}

export default connect(
	state => ({
		isLoading: state.store.isLoading,
		storeMapList: state.store.storeMapList.data,
	}),
	{
		requestStoreMapList: actionCreators.requestStoreMapList,
	},
)(Maps);
