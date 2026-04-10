// src/lib/api.js
import useAuthStore from '@/store/authStore';

const BASE_URL = process.env.NEXT_PUBLIC_LARAVEL_API_URL;

async function api(endpoint, { method = 'GET', body } = {}) {
  // grab token directly from store
  const token = useAuthStore.getState().token;

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = { method, headers };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}/${endpoint}`, config);
  const data = await res.json();

  if (!res.ok) {
    // auto logout if token expired
    if (res.status === 401) {
      useAuthStore.getState().clearAuth();
    }
    throw { status: res.status, ...data };
  }

  return data;
}

export const get   = (endpoint)        => api(endpoint, { method: 'GET' });
export const post  = (endpoint, body)  => api(endpoint, { method: 'POST', body });
export const put   = (endpoint, body)  => api(endpoint, { method: 'PUT', body });
export const patch = (endpoint, body)  => api(endpoint, { method: 'PATCH', body });
export const del   = (endpoint)        => api(endpoint, { method: 'DELETE' });

export default api;