

export interface Movie {
  id: number;
  title: string;
  plot: string;
  releaseYear: number,
  tmdbRating: number;
  posterUrl: string;
  backdropUrl: string;
  runtime: number;
  genres: string[];
  language: string;
  budget: number;
  revenue: number;
  director: string;
  production: string;
  awardsSummary: string;
  trailerUrl: string;
}

export const ratingFilm = async (): Promise<Movie[]> => {
  const res = await fetch(`https://cinemaguide.skillbox.cc/movie/top10`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return await res.json();
}

export const randomFilm = async (): Promise<Movie> => {
  const res = await fetch(`https://cinemaguide.skillbox.cc/movie/random`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return await res.json();
}

export const movieId = async (id:string): Promise<Movie> => {
  const res = await fetch(`https://cinemaguide.skillbox.cc/movie/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return await res.json();
}

export interface Genre {
  name: string;
}

export const genreFilm = async (): Promise<string[]> => {
  const res = await fetch(`https://cinemaguide.skillbox.cc/movie/genres`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  const data: string[] = await res.json();

  if (!Array.isArray(data)) {
    throw new Error('Expected array of strings from API');
  }

  return data;
};

export const movie = async (): Promise<Movie[]> => {
  const res = await fetch(`https://cinemaguide.skillbox.cc/movie`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return await res.json();
}


