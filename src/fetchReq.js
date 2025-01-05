import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';






axios.defaults.baseURL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';

export const fetchCatalog = async (filter) => {
	const params = new URLSearchParams(filter);
	// const response = await axios.get(`/photos?page=1&query=${searchReq}`);
	const response = await axios.get(`?${params}`);
	return response.data;

};

export const getOneCarDetails = async (id) => {
	const response = await axios.get(`/${id}`);
	return response;

};

export const getFilteredRequest = async (filters) => {


	try {
		const response = await axios.get('/', { params: filters });
		// toast.success('The request is successful, the data are loading)');
		return response.data;
	} catch (error) {
		console.error('Error fetching filtered data:', error);
		toast.error('There are no matches for the specified filters');
		throw error;
	}
};