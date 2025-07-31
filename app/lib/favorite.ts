const STORAGE_KEY = "favoritesGames";

export function getFavorites(): number[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function addFavorite(id: number) {
  const current = getFavorites();
  if (!current.includes(id)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, id]));
  }
}

export function removeFavorite(id: number) {
  const current = getFavorites();
  const updated = current.filter(favId => favId !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function isFavorite(id: number): boolean {
  return getFavorites().includes(id);
}
