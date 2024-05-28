import { accessTokenService } from '../services/accessTokenService';

const baseUrl = import.meta.env.VITE_API_URL;

export function apiRequest(url: string) {
  return fetch(`${baseUrl}${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    })
    .catch(error => {
      console.error('Error fetching products:', error);
      return [];
    });
}

export async function registerRequest(userData: {
  email: string;
  password: string;
  name?: string;
}) {
  return fetch(`${baseUrl}/registration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    })
    .catch(error => {
      console.error('Error during registration', error);
    });
}

export async function loginRequest(userData: {
  name?: string;
  email: string;
  password: string;
}) {
  return fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    })
    .catch(error => {
      console.error('Error during login', error);
    });
}

export async function privateRequest(url: string) {
  const accessToken = accessTokenService.get();

  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  if (accessToken) {
    headers.append('Authorization', `Bearer ${accessToken}`);
  }

  return fetch(`${baseUrl}${url}`, {
    method: 'GET',
    headers,
  })
    .then(response => {
      console.log({response});
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error during request', error);
    });
}

export async function privatePostRequest<T>(url: string, data: T) {
  const accessToken = accessTokenService.get();

  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  if (accessToken) {
    headers.append('Authorization', `Bearer ${accessToken}`);
  }

  return fetch(`${baseUrl}${url}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  })
    .then(response => {
      console.log({response});
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error during request', error);
    });
}

export async function deleteRequest<T>(url: string, data: T) {
  const accessToken = accessTokenService.get();

  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  if (accessToken) {
    headers.append('Authorization', `Bearer ${accessToken}`);
  }

  return fetch(`${baseUrl}${url}`, {
    method: 'DELETE',
    headers,
    body: JSON.stringify(data)
  })
    .then(response => {
      console.log({response});
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error during request', error);
    });
}
