export interface Restaurant {
  id: string;
  name: string;
  category: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  imageUrl: string;
  tags: string[];
  isOpen: boolean;
  distance: string;
}

// Mock data — reemplazar por fetch a BD
export const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Burger Palace',
    category: 'Hamburguesas',
    rating: 4.8,
    deliveryTime: '20-30 min',
    deliveryFee: 2.5,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    tags: ['Hamburguesas', 'Papas', 'Bebidas'],
    isOpen: true,
    distance: '1.2 km',
  },
  {
    id: '2',
    name: 'Pizza Roma',
    category: 'Pizza',
    rating: 4.6,
    deliveryTime: '30-45 min',
    deliveryFee: 0,
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
    tags: ['Pizza', 'Pasta', 'Italiana'],
    isOpen: true,
    distance: '0.8 km',
  },
  {
    id: '3',
    name: 'Sushi Zen',
    category: 'Sushi',
    rating: 4.9,
    deliveryTime: '35-50 min',
    deliveryFee: 3.0,
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',
    tags: ['Sushi', 'Japonesa', 'Rolls'],
    isOpen: true,
    distance: '2.1 km',
  },
  {
    id: '4',
    name: 'Tacos El Rey',
    category: 'Mexicana',
    rating: 4.5,
    deliveryTime: '15-25 min',
    deliveryFee: 1.5,
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400',
    tags: ['Tacos', 'Burritos', 'Mexicana'],
    isOpen: false,
    distance: '0.5 km',
  },
  {
    id: '5',
    name: 'Pollo Dorado',
    category: 'Pollo',
    rating: 4.3,
    deliveryTime: '20-35 min',
    deliveryFee: 2.0,
    imageUrl: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400',
    tags: ['Pollo', 'Frito', 'Combos'],
    isOpen: true,
    distance: '1.8 km',
  },
];

export const CATEGORIES = ['Todos', 'Hamburguesas', 'Pizza', 'Sushi', 'Mexicana', 'Pollo'];
