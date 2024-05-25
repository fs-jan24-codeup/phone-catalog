// import { apiRequest } from './fetchData';

// export async function fetchAllProducts() {
//   try {
  
//     const products = await apiRequest(endpoint);

//     // const phones = await fetchProductsFromApi('./api/phones.json');
//     // const tablets = await fetchProductsFromApi('./api/tablets.json');
//     // const accessories = await fetchProductsFromApi('./api/accessories.json');

//     const allProducts = [...phones, ...tablets, ...accessories];

//     return allProducts;
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return [];
//   }
// }

// async function fetchProductsFromApi(endpoint: string) {
//   try {
//     // const products = await getProducts(endpoint);
//     const products = await apiRequest(endpoint);
//     return products;
//   } catch (error) {
//     console.error(`Error fetching products from API ${endpoint}:`, error);
//     return [];
//   }
// }
