import { Phone } from '../types/Phone';

const API_URL = './api/phones.json';

export function getAllPhones(): Promise<Phone[]> {
  return fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching phones:', error);
      return [];
    });
}
