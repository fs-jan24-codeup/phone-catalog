import { Product } from '../types/Product';

export function getProducts(url: string): Promise<Product[]> {
  return fetch(url)
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
