import config from '../config/app.config';
import { Restaurant, RESTAURANTS } from '../data/restaurants';

export interface FetchRestaurantsParams {
  lat: number;
  lng: number;
}

async function mockFetchRestaurants(_params: FetchRestaurantsParams): Promise<Restaurant[]> {
  await new Promise(r => setTimeout(r, 800));
  return RESTAURANTS;
}

async function realFetchRestaurants(params: FetchRestaurantsParams): Promise<Restaurant[]> {
  const { lat, lng } = params;
  const response = await fetch(`${config.API_RESTAURANTES}/fetch-restaurants?lat=${lat}&lng=${lng}`);
  if (!response.ok) throw new Error(`Error al obtener restaurantes: ${response.status}`);
  const json = await response.json();
  return json.data;
}

export async function fetchRestaurants(params: FetchRestaurantsParams): Promise<Restaurant[]> {
  return config.MOCK_RESTAURANTS ? mockFetchRestaurants(params) : realFetchRestaurants(params);
}
