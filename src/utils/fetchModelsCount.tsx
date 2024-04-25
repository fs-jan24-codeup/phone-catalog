import { getProducts } from './fetchData';

export async function fetchModelsCount() {
  try {
    const counts = await Promise.all([
      fetchModelsCountFromApi('./api/phones.json'),
      fetchModelsCountFromApi('./api/tablets.json'),
      fetchModelsCountFromApi('./api/accessories.json'),
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
    const models = await getProducts(endpoint);
    return models.length;
  } catch (error) {
    console.error(`Error fetching models count from API ${endpoint}:`, error);
    return 0;
  }
}
