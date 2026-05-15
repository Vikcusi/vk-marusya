import type { Movie } from "./Movie";


export const favoritesFilms = async (): Promise<Movie[]> => {
  const res = await fetch(`https://cinemaguide.skillbox.cc/favorites`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    credentials: 'include'
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return await res.json();
}

export const addFavoritesFilms = async (id: string): Promise<void> => {

  const res = await fetch(`https://cinemaguide.skillbox.cc/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
    credentials: 'include'
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return await res.json()
}

export const removeFavoritesFilms = async (id: string): Promise<void> => {
  const res = await fetch(`https://cinemaguide.skillbox.cc/favorites/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
    },
    credentials: 'include'
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return await res.json();
}