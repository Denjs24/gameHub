// app/store.ts
"use client";

import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  games: string[];
  isLoading: boolean;
}

const initialState: FavoritesState = {
  games: [],
  isLoading: false,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<string[]>) {
      state.games = action.payload;
      state.isLoading = false;
    },
    addFavorite(state, action: PayloadAction<string>) {
      if (!state.games.includes(action.payload)) {
        state.games.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.games = state.games.filter(id => id !== action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite, setLoading } = favoritesSlice.actions;

export const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
