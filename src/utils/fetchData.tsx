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
