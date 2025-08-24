# Favorites System

This document explains how the new favorites system works in the GameHub application.

## Overview

The favorites system now uses Redux for state management and automatically loads user favorites when the application starts. This provides instant access to favorite games without needing to fetch them on each page.

## Components

### 1. Store (`app/store.ts`)
- Manages favorites state in Redux
- Includes loading state for better UX
- Actions: `setFavorites`, `addFavorite`, `removeFavorite`, `setLoading`

### 2. Favorites Initializer (`app/lib/components/FavoritesInitializer.tsx`)
- Automatically loads favorites when the app starts
- Called from the main Providers component
- Handles authentication state changes

### 3. Custom Hook (`app/lib/hooks/useFavorites.ts`)
- Provides easy access to favorites state
- Handles loading favorites from API
- Manages authentication state

### 4. Action Utilities (`app/lib/favoriteActions.ts`)
- Provides functions to add/remove favorites
- Handles both API calls and Redux store updates
- Includes error handling

## Usage

### In Components

```tsx
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { addFavoriteToStore, removeFavoriteFromStore } from "@/app/lib/favoriteActions";

function MyComponent() {
  const favorites = useSelector((state: RootState) => state.favorites.games);
  const isLoading = useSelector((state: RootState) => state.favorites.isLoading);

  const handleToggleFavorite = async (gameId: number) => {
    if (favorites.includes(gameId.toString())) {
      await removeFavoriteFromStore(gameId);
    } else {
      await addFavoriteToStore(gameId);
    }
  };

  return (
    <div>
      {isLoading ? "Loading favorites..." : `You have ${favorites.length} favorites`}
    </div>
  );
}
```

### Using the Custom Hook

```tsx
import { useFavorites } from "@/app/lib/hooks/useFavorites";

function MyComponent() {
  const { favorites, isLoading, isAuthenticated } = useFavorites();

  if (!isAuthenticated) {
    return <div>Please log in to see your favorites</div>;
  }

  return (
    <div>
      {isLoading ? "Loading..." : `Favorites: ${favorites.length}`}
    </div>
  );
}
```

## How It Works

1. **App Initialization**: When the app loads, `FavoritesInitializer` component is rendered
2. **Authentication Check**: The hook checks if user is authenticated
3. **API Call**: If authenticated, favorites are fetched from `/api/favorites`
4. **Store Update**: Favorites are stored in Redux state
5. **Component Updates**: All components using favorites automatically update

## Benefits

- **Instant Loading**: Favorites are loaded once and cached
- **Real-time Updates**: Changes are reflected immediately across all components
- **Better UX**: Loading states and error handling
- **Consistent State**: Single source of truth for favorites data
- **Performance**: No repeated API calls for the same data

## API Endpoints

- `GET /api/favorites` - Get user's favorite games
- `POST /api/favorites` - Add a game to favorites
- `DELETE /api/favorites` - Remove a game from favorites

## Error Handling

The system includes error handling for:
- Network failures
- Authentication errors
- Invalid game IDs
- Server errors

All errors are logged to console and the UI gracefully handles failures.
