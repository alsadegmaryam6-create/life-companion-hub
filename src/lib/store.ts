import { useCallback, useEffect, useState } from "react";
import { getProvider } from "./data";

export type Review = {
  id: string;
  providerId: string;
  stars: number;
  comment?: string | undefined;
  date: string;
};

const REVIEWS_KEY = "sanadak.reviews";
const FAVORITES_KEY = "sanadak.favorites";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("sanadak-store"));
}

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const sync = () => setReviews(read<Review[]>(REVIEWS_KEY, []));
    sync();
    window.addEventListener("sanadak-store", sync);
    return () => window.removeEventListener("sanadak-store", sync);
  }, []);

  const addReview = useCallback((providerId: string, stars: number, comment?: string) => {
    const current = read<Review[]>(REVIEWS_KEY, []);
    const next: Review[] = [
      ...current,
      {
        id: `${Date.now()}`,
        providerId,
        stars,
        comment: comment?.trim() || undefined,
        date: new Date().toISOString(),
      },
    ];
    write(REVIEWS_KEY, next);
    setReviews(next);
  }, []);

  return { reviews, addReview };
}

export function computeRating(providerId: string, reviews: Review[]) {
  const provider = getProvider(providerId);
  const base = provider ? { sum: provider.baseRating * provider.baseCount, count: provider.baseCount } : { sum: 0, count: 0 };
  const mine = reviews.filter((r) => r.providerId === providerId);
  const sum = base.sum + mine.reduce((a, r) => a + r.stars, 0);
  const count = base.count + mine.length;
  return { average: count ? sum / count : 0, count };
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setFavorites(read<string[]>(FAVORITES_KEY, []));
    sync();
    window.addEventListener("sanadak-store", sync);
    return () => window.removeEventListener("sanadak-store", sync);
  }, []);

  const toggle = useCallback((id: string) => {
    const current = read<string[]>(FAVORITES_KEY, []);
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    write(FAVORITES_KEY, next);
    setFavorites(next);
  }, []);

  return { favorites, toggle };
}
