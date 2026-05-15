import { validateResponse } from "./validateResponse";

export interface Auth {
  favorites: string[]
  name: string,
  surname: string,
  email: string
}

export async function profile(): Promise<Auth> {
  const res = await fetch(`https://cinemaguide.skillbox.cc/profile`, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
    },
    credentials: 'include'
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  const data: Auth = await res.json();
  return data;
}

export interface RegisterResponse {
  result: boolean;
}

export interface RegisterData {
  email: string
  password: string
  name: string
  surname: string
}

export async function registerAuth(data: RegisterData): Promise<RegisterResponse> {
  const response = await fetch('https://cinemaguide.skillbox.cc/user', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
    credentials: 'include'
  });

  const result: RegisterResponse = await response.json();
  return result;
};

interface AuthInfo {
  email: string,
  password: string
}

export async function login(data: AuthInfo): Promise<void> {
  const response = await fetch('https://cinemaguide.skillbox.cc/auth/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
    credentials: 'include'
  });

  await validateResponse(response);
  await profile();
  return await response.json();
};

export async function logout(): Promise<void> {
  const response = await fetch('https://cinemaguide.skillbox.cc/auth/logout', {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
    credentials: 'include'
  });
  await validateResponse(response);
};
