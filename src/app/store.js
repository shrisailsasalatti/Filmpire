import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMDB"; // Update the path based on your project structure
import genreOrCategoryReducer from '../features/currentGenreOrCategory'
import userReducer from '../features/auth'
const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory:genreOrCategoryReducer,
    user: userReducer,
    // Add other reducers here if necessary
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

export default store;
