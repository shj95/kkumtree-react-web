import axios from 'axios';

const axiosClient = axios.create();
axiosClient.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

export async function getStoresByLatLng({ lat, lng, diameter }) {
	// XXX : API에 위경도가 뒤집혀있음
	return await axiosClient.get(
		`https://api.kkumtree.xyz/stores/nearby?latitude=${lng}&longitude=${lat}&diameter=${Math.ceil(
			diameter,
		)}`,
	);
}

export async function getStoreById(id) {
	return await axiosClient.get(`https://api.kkumtree.xyz/stores/${id}`);
}
