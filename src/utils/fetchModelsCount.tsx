interface CategoryCount {
  category: string;
  count: number;
}

const baseUrl = import.meta.env.VITE_API_URL;

export async function fetchModelsCount(): Promise<{ phones: number; tablets: number; accessories: number }> {
  const response = await fetch(`${baseUrl}/home`);
  if (!response.ok) {
    throw new Error('Failed to fetch category counts');
  }

  const data: CategoryCount[] = await response.json();
  const counts = { phones: 0, tablets: 0, accessories: 0 };

  data.forEach(category => {
    if (category.category === 'phones') counts.phones = category.count;
    else if (category.category === 'tablets') counts.tablets = category.count;
    else if (category.category === 'accessories') counts.accessories = category.count;
  });

  return counts;
}
