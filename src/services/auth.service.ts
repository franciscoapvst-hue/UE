import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config/app.config';
import { MOCK_USERS, User } from '../data/users.mock';

export type { User };

export interface Session {
  token: string;
  user: User;
}

// ── Mock ──────────────────────────────────────────────
const MOCK_OTP_CODE = '123456';

async function mockLogin(email: string, password: string): Promise<Session> {
  await new Promise(r => setTimeout(r, 600));
  const found = MOCK_USERS.find(u => u.email === email && u.password === password);
  if (!found) throw new Error('Email o contraseña incorrectos');
  const { password: _, ...user } = found;
  return { token: `mock-token-${user.id}`, user };
}

async function mockRequestOtp(_nombre: string, _email: string, _password: string): Promise<void> {
  await new Promise(r => setTimeout(r, 600));
  // En mock el código siempre es 123456 — lo mostramos en consola
  console.log(`[MOCK OTP] Código de verificación: ${MOCK_OTP_CODE}`);
}

async function mockVerifyOtp(email: string, code: string): Promise<Session> {
  await new Promise(r => setTimeout(r, 400));
  if (code !== MOCK_OTP_CODE) throw new Error('Código incorrecto o expirado');
  const user: User = { id: String(Date.now()), nombre: 'Usuario Demo', email, rol: 'cliente' };
  return { token: `mock-token-${user.id}`, user };
}

// ── Real ──────────────────────────────────────────────
async function realLogin(email: string, password: string): Promise<Session> {
  const res = await fetch(`${config.API_USUARIOS}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Error al iniciar sesión');
  return { token: data.token, user: data.user };
}

async function realRequestOtp(nombre: string, email: string, password: string): Promise<void> {
  const res = await fetch(`${config.API_USUARIOS}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Error al registrarse');
}

async function realVerifyOtp(email: string, code: string): Promise<Session> {
  const res = await fetch(`${config.API_USUARIOS}/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Código incorrecto o expirado');
  return { token: data.token, user: data.user };
}

// ── Exports ───────────────────────────────────────────
export async function login(email: string, password: string): Promise<Session> {
  return config.MOCK_USERS ? mockLogin(email, password) : realLogin(email, password);
}

export async function requestOtp(nombre: string, email: string, password: string): Promise<void> {
  return config.MOCK_USERS ? mockRequestOtp(nombre, email, password) : realRequestOtp(nombre, email, password);
}

export async function verifyOtp(email: string, code: string): Promise<Session> {
  return config.MOCK_USERS ? mockVerifyOtp(email, code) : realVerifyOtp(email, code);
}

export async function saveSession(session: Session) {
  await AsyncStorage.setItem('ue_session', JSON.stringify(session));
}

export async function getSession(): Promise<Session | null> {
  const raw = await AsyncStorage.getItem('ue_session');
  return raw ? JSON.parse(raw) : null;
}

export async function clearSession() {
  await AsyncStorage.removeItem('ue_session');
}
