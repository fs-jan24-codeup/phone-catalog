const key = 'accessToken';

function get(): string | null {
  return localStorage.getItem(key);
}

function save(token: string): void {
  localStorage.setItem(key, token);
}

function remove(): void {
  localStorage.removeItem(key);
}

export const accessTokenService = { get, save, remove };
