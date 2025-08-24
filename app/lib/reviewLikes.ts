const STORAGE_KEY = "reviewLikes";

export function getReviewLikes(): number[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function addReviewLikes(id: number) {
  const current = getReviewLikes();
  if (!current.includes(id)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, id]));
  }
}

export function removeReviewLikes(id: number) {
  const current = getReviewLikes();
  const updated = current.filter(favId => favId !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function isReviewLiked(id: number): boolean {
  return getReviewLikes().includes(id);
}
