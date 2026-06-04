import API_BASE_URL from '../config/api.js';

// Timeout en ms — Render free tier puede tardar hasta 60s en despertar
const REQUEST_TIMEOUT = 65000;

// Función helper para hacer peticiones con timeout
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(url, { ...config, signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('El servidor tardó demasiado en responder. Intentá de nuevo en un momento.');
    }
    console.error('API Error:', error);
    throw error;
  }
}

// API de Proyectos
export const projectsAPI = {
  getAll: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `/projects/?${queryParams}` : '/projects/';
    return request(url);
  },
  getById: (id) => request(`/projects/${id}`),
  getFull: (id) => request(`/projects/${id}/full`),
  search: (query) => request(`/projects/search?q=${encodeURIComponent(query)}`),
  create: (data) => request('/projects/', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/projects/${id}`, { method: 'DELETE' }),
};

// API de Materiales Académicos
export const materialsAPI = {
  getAll: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `/academic-materials/?${queryParams}` : '/academic-materials/';
    return request(url);
  },
  getById: (id) => request(`/academic-materials/${id}`),
  search: (query) => request(`/academic-materials/search?q=${encodeURIComponent(query)}`),
  create: (data) => request('/academic-materials/', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/academic-materials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/academic-materials/${id}`, { method: 'DELETE' }),
};

// API de Creadores
export const creatorsAPI = {
  getAll: () => request('/creators/'),
  getById: (id) => request(`/creators/${id}`),
  getSummary: (id) => request(`/creators/${id}/summary`),
  create: (data) => request('/creators/', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/creators/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/creators/${id}`, { method: 'DELETE' }),
};

// API de Juegos
export const gamesAPI = {
  getAll: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `/games/?${queryParams}` : '/games/';
    return request(url);
  },
  getById: (id) => request(`/games/${id}`),
  search: (query) => request(`/games/search?q=${encodeURIComponent(query)}`),
  create: (data) => request('/games/', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/games/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/games/${id}`, { method: 'DELETE' }),
};

// API de Categorías
export const categoriesAPI = {
  getAll: () => request('/categories/'),
  getById: (id) => request(`/categories/${id}`),
  create: (data) => request('/categories/', { method: 'POST', body: JSON.stringify(data) }),
};

// API del Dashboard
export const dashboardAPI = {
  getStats: () => request('/dashboard'),
};

// API de Admin (git push)
export const adminAPI = {
  gitPush: (message) =>
    request('/admin/git-push', {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),
};
