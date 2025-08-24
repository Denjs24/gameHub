"use client";

import { useFavorites } from "../hooks/useFavorites";

export function FavoritesInitializer() {
  // This component just calls the hook to initialize favorites
  // It doesn't render anything, it just triggers the effect
  useFavorites();
  
  return null;
}
