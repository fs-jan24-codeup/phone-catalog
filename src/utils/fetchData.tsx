export function apiRequest(url: string) {
  const baseUrl = import.meta.env.VITE_API_URL;

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
