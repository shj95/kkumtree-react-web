/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import CustomTabs from 'components/CustomTabs/CustomTabs.js';
import Table from 'components/Table/Table.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import { useState, useEffect, useRef } from 'react';

import { SyncLoader } from 'halogenium';
import { connect } from 'react-redux';
import chiken from 'assets/img/marker/chiken.png';
import bread from 'assets/img/marker/bread.png';
import { actionCreators } from '../../store/modules/store/actions';

const styles = {
	typo: {
		paddingLeft: '25%',
		marginBottom: '40px',
		position: 'relative',
	},
	note: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		bottom: '10px',
		color: '#c0c1c2',
		display: 'block',
		fontWeight: '400',
		fontSize: '13px',
		lineHeight: '13px',
		left: '0',
		marginLeft: '20px',
		position: 'absolute',
		width: '260px',
	},
	cardCategoryWhite: {
		color: 'rgba(255,255,255,.62)',
		margin: '0',
		fontSize: '14px',
		marginTop: '0',
		marginBottom: '0',
	},
	cardTitleWhite: {
		color: '#FFFFFF',
		marginTop: '0px',
		minHeight: 'auto',
		fontWeight: '300',
		fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		marginBottom: '3px',
		textDecoration: 'none',
	},
};

const useStyles = makeStyles(styles);

function makeKoreanCategoryName(categoryName) {
	// TODO : 매핑 추가
	switch (categoryName) {
		case 'BAKERY':
			return '빵';
	}
}

const CustomSkinMap = withScriptjs(
	withGoogleMap(({ props }) => {
		return props.storeDetail ? (
			<GoogleMap
				defaultZoom={15}
				center={{ lat: props.storeDetail.latitude, lng: props.storeDetail.longitude }}
				defaultOptions={{
					scrollwheel: false,
					zoomControl: true,
					fullscreenControl: false,
					mapTypeControl: false,
					minZoom: 10,
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
				<MarkerWithLabel
					position={{ lat: props.storeDetail.latitude, lng: props.storeDetail.longitude }}
					labelAnchor={new google.maps.Point(0, 0)}
					labelStyle={{
						backgroundColor: 'white',
						fontSize: '12px',
						padding: '5px',
						minWidth: '80px',
						textAlign: 'center',
						borderRadius: '5px',
						border: '1px solid #ccc',
						zIndex: '99999',
						transform: 'translateX(-50%)',
					}}
					icon={{
						// TODO : 이미지 매핑
						url: [chiken, bread][Math.floor(Math.random() * 2)],
					}}
				>
					<div>{props.storeDetail.name}</div>
				</MarkerWithLabel>
			</GoogleMap>
		) : null;
	}),
);

function Store(props) {
	useEffect(() => {
		props.requestStoreDetail(props.match.params.id);
	}, []);
	const classes = useStyles();
	return props.isLoading || !props.storeDetail ? (
		<div>
			<SyncLoader
				loading={true}
				size="20px"
				color="#36D7B7"
				style={{ position: 'absolute', top: '50%', left: 'calc(50% - 30px)' }}
			/>
		</div>
	) : (
		<Card style={{ marginTop: 80 }}>
			<CardHeader color="info">
				<h4 className={classes.cardTitleWhite}>
					{props.storeDetail.name + '  /  ' + makeKoreanCategoryName(props.storeDetail.category)}
				</h4>
				<p className={classes.cardCategoryWhite}>{props.storeDetail.telNumber}</p>
				<p className={classes.cardCategoryWhite}>{props.storeDetail.address}</p>
			</CardHeader>
			<CardBody>
				<CustomSkinMap
					googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCBVhZH8Q5rxjZKnGAQKvrkm3Kb18xuKkI"
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={<div style={{ height: `30vh` }} />}
					mapElement={<div style={{ height: `30vh` }} />}
					props={props}
				></CustomSkinMap>
				<GridContainer>
					<GridItem xs={12}>
						<CustomTabs
							headerColor="info"
							tabs={[
								{
									tabName: '메뉴',
									// tabIcon: BugReport,
									tabContent: (
										<Table
											tableHeaderColor="primary"
											tableHead={['메뉴', '가격']}
											tableData={props.storeDetail.menus.map(v => {
												return [v.name, `${v.price.toLocaleString()} 원`];
											})}
										/>
									),
								},
								{
									tabName: '혜택',
									// tabIcon: Code,
									tabContent: (
										<Table
											tableHeaderColor="primary"
											tableHead={['혜택', '설명']}
											tableData={props.storeDetail.benefits.map(v => {
												return [v.name, v.description];
											})}
										/>
									),
								},
							]}
						/>
					</GridItem>
				</GridContainer>
			</CardBody>
		</Card>
	);
}

export default connect(
	state => ({
		isLoading: state.store.isLoading,
		storeDetail: state.store.storeDetail.data.store,
	}),
	{
		requestStoreDetail: actionCreators.requestStoreDetail,
	},
)(Store);
