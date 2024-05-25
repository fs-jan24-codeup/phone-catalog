import { apiRequest } from './fetchData';

export async function fetchModelsCount() {
  try {
    const counts = await Promise.all([
      fetchModelsCountFromApi('/products/phones?perPage=200'),
      fetchModelsCountFromApi('/products/tablets?perPage=200'),
      fetchModelsCountFromApi('/products/accessories?perPage=200'),
    ]);
    return {
      phones: counts[0],
      tablets: counts[1],
      accessories: counts[2],
    };
  } catch (error) {
    console.error('Error fetching model counts:', error);
    return {
      phones: 0,
      tablets: 0,
      accessories: 0,
    };
  }
}

async function fetchModelsCountFromApi(endpoint: string) {
  try {
    const models = await apiRequest(endpoint);
    return models.length;
  } catch (error) {
    console.error(`Error fetching models count from API ${endpoint}:`, error);
    return 0;
  }
}
