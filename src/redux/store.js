// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";

// Поки що використовуємо редюсер який
// тільки повертає отриманий стан Redux
const rootReducer = (state, action) => {
	return state;
};

export const store = configureStore({
	reducer: rootReducer,
});
