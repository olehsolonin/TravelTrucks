// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";

export const initialState = {
	data: {
		items: [],
	},
	filters: {
		status: 'all',
	},
	details: {
		items: null,
	},
};

// Поки що використовуємо редюсер який
// тільки повертає отриманий стан Redux
const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'data/addCatalog':
			return {
				...state,
				data: {
					...state.data,
					items: action.payload,
				},
			};
		case 'details/addDetails':
			return {
				...state,
				details: {
					...state.details,
					items: action.payload,
				},
			};
		default:
			return state;
	}
};


export const store = configureStore({
	reducer: rootReducer,
});
