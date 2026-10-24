export type CategoryId =
  | 'todos'
  | 'entradas'
  | 'especiais'
  | 'sushi'
  | 'principais'
  | 'sobremesas'
  | 'bebidas';

export interface MenuItem {
  id: string;
  name: string;
  japaneseName?: string;
  category: Exclude<CategoryId, 'todos'>;
  description: string;
  ingredients: string[];
  price: number;
  image: string;
  badge?: 'Destaque do Chef' | 'Mais Pedido' | 'Novidade' | 'Autoral';
  spiciness?: 0 | 1 | 2 | 3;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  preparationTime?: string;
}

export interface CartItem {
  id: string; // unique cart entry id
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
  spiceLevel?: 'Suave' | 'Médio' | 'Picante';
  meatPoint?: 'Mal Passado' | 'Ao Ponto' | 'Bem Passado';
  allergens?: string[];
}

export type OrderType = 'mesa' | 'retirada' | 'delivery';

export interface ReservationData {
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  area: string;
  occasion?: string;
  specialRequests?: string;
}

export interface BusinessStatus {
  isOpen: boolean;
  statusLabel: string;
  detail: string;
  badgeColor: 'emerald' | 'amber' | 'rose';
}
