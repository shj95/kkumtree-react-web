import axios from 'axios';

const axiosClient = axios.create();

export async function getStoresByLatLng(lat, lng) {
	return await axiosClient.get(`/stores/nearby?latitude=${lat}&longitude=${lng}`);
}

export async function getStoreById(id) {
	return await axiosClient.get(`/stores/${id}`);
}
