export interface User {
  id: string;
  nombre: string;
  email: string;
  rol: 'cliente' | 'operador' | 'admin';
}

export const MOCK_USERS: (User & { password: string })[] = [
  { id: '1', nombre: 'Cliente Demo', email: 'cliente@ue.com', password: '123456', rol: 'cliente' },
  { id: '2', nombre: 'Admin Demo',   email: 'admin@ue.com',   password: 'admin123', rol: 'admin' },
];
