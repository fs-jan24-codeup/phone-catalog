import { Product } from "../types/Product";

export const filterProducts = (query: string, products: Product[]) => {
  const normalized = query.toLowerCase().trim();

  if (query) {
    return products.filter(product => {
      const lowerName = product.name.toLowerCase();

      return lowerName.includes(normalized);
    });
  }

  return [];
};