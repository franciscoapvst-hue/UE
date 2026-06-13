import { Restaurant } from '../data/restaurants';

const API_URL = 'http://localhost:3000';

export interface FetchRestaurantsParams {
  lat: number;
  lng: number;
}

export interface FetchRestaurantsResponse {
  success: boolean;
  total: number;
  data: Restaurant[];
}

export async function fetchRestaurants(
  params: FetchRestaurantsParams
): Promise<Restaurant[]> {
  const { lat, lng } = params;
  const response = await fetch(`${API_URL}/fetch-restaurants?lat=${lat}&lng=${lng}`);

  if (!response.ok) {
    throw new Error(`Error al obtener restaurantes: ${response.status}`);
  }

  const json: FetchRestaurantsResponse = await response.json();
  return json.data;
}
