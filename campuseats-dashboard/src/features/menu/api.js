// Vite substitutes this public URL at build time. Never put secrets in VITE_*.
export const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
export const MENU_URL = API_URL ? `${API_URL}/api/menu` : '/menu.json';
export const IS_DEMO = !API_URL;
