import axios from 'axios';

const axiosClient = axios.create();
axiosClient.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

export async function getStoresByLatLng({ lat, lng }) {
	return await axiosClient.get(`/stores/nearby?latitude=${lat}&longitude=${lng}`);
}

export async function getStoreById(id) {
	return await axiosClient.get(`/stores/${id}`);
}
