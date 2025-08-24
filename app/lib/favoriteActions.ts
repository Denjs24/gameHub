"use client";

import { store } from "@/app/store";
import { addFavorite as addFavoriteAction, removeFavorite as removeFavoriteAction } from "@/app/store";
import { addFavorite, removeFavorite } from "./favorite";

export async function addFavoriteToStore(gameId: number) {
  try {
    // Add to API
    await addFavorite(gameId);
    // Add to Redux store
    store.dispatch(addFavoriteAction(String(gameId)));
    return true;
  } catch (error) {
    console.error("Failed to add favorite:", error);
    return false;
  }
}

export async function removeFavoriteFromStore(gameId: number) {
  try {
    // Remove from API
    await removeFavorite(gameId);
    // Remove from Redux store
    store.dispatch(removeFavoriteAction(String(gameId)));
    return true;
  } catch (error) {
    console.error("Failed to remove favorite:", error);
    return false;
  }
}

export function isFavoriteInStore(gameId: number): boolean {
  const state = store.getState();
  return state.favorites.games.includes(String(gameId));
}
