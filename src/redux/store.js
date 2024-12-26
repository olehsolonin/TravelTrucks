// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";

export const initialState = {
	data: {
		items: [],
		totalItems: false,
	},
	filters: {
		status: {
			location: '',
			AC: '',
			transmission: '',
			kitchen: '',
			TV: '',
			bathroom: '',
			form: '',
			limit: 5,
			page: 1,
		},
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
					items: [
						...state.data.items,
						...action.payload.filter(
							newItem => !state.data.items.some(existingItem => existingItem.id === newItem.id)
						),
					],
				},
			};

		case 'data/toggler': // Переключение значения
			return {
				...state,
				data: {
					...state.data,
					totalItems: !state.toggler,
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
		case 'filters/addFilters':
			return {
				...state,
				filters: {
					...state.filters,
					status: action.payload,
				},
			};
		case 'filters/addMorePage':
			return {
				...state,
				filters: {
					...state.filters,
					status: {
						...state.filters.status, // Сохраняем все остальные поля status
						page: action.payload, // Обновляем только поле page
					},
				},
			};

		default:
			return state;
	}
};


export const store = configureStore({
	reducer: rootReducer,
});
