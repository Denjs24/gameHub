// const STORAGE_KEY = "favoritesGames";

// export function getFavorites(): number[] {
//   if (typeof window === "undefined") return [];
//   const raw = localStorage.getItem(STORAGE_KEY);
//   return raw ? JSON.parse(raw) : [];
// }

// export function addFavorite(id: number) {
//   const current = getFavorites();
//   if (!current.includes(id)) {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, id]));
//   }
// }

// export function removeFavorite(id: number) {
//   const current = getFavorites();
//   const updated = current.filter(favId => favId !== id);
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
// }

// export function isFavorite(id: number): boolean {
//   return getFavorites().includes(id);
// }


export async function getFavorites(): Promise<number[]> {
  const res = await fetch("/api/favorites");
  if (!res.ok) return [];
  return res.json();
}

export async function addFavorite(id: number) {
  await fetch("/api/favorites", {
    method: "POST",
    body: JSON.stringify({ gameId: id }),
    headers: { "Content-Type": "application/json" }
  });
}

export async function removeFavorite(id: number) {
  await fetch("/api/favorites", {
    method: "DELETE",
    body: JSON.stringify({ gameId: id }),
    headers: { "Content-Type": "application/json" }
  });
}

export async function isFavorite(id: number): Promise<boolean> {
  const favs = await getFavorites();
  return favs.includes(id);
}
