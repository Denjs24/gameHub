"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch, setFavorites, setLoading } from "@/app/store";
import { getFavorites } from "@/app/lib/favorite";

export function useFavorites() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session, status } = useSession();
  const { games, isLoading } = useSelector((state: RootState) => state.favorites);

  // Load favorites when user is authenticated
  useEffect(() => {
    const loadFavorites = async () => {
      if (status === "loading") return;
      
      if (session?.user) {
        dispatch(setLoading(true));
        try {
          const favorites = await getFavorites();
          dispatch(setFavorites(favorites.map(String)));
        } catch (error) {
          console.error("Failed to load favorites:", error);
          dispatch(setFavorites([]));
        }
      } else {
        // Clear favorites when user is not authenticated
        dispatch(setFavorites([]));
      }
    };

    loadFavorites();
  }, [session, status, dispatch]);

  return {
    favorites: games,
    isLoading,
    isAuthenticated: !!session?.user,
  };
}
