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

export function getProduct(url: string, productId: string): Promise<Product> {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(products => {
      const product = products.find(
        (product: Product) => product.id === productId,
      );
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    })
    .catch(error => {
      console.error('Error fetching products:', error);
      return error;
    });
}
