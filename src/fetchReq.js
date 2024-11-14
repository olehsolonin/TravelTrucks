import axios from 'axios';

axios.defaults.baseURL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';

export const fetchCatalog = async () => {
	// const response = await axios.get(`/photos?page=1&query=${searchReq}`);
	const response = await axios.get();
	return response.data;

};