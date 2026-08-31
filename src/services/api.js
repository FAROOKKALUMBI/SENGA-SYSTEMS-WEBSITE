const API_BASE = '/api';

export async function fetchApi(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.warn(`API request to ${endpoint} failed, utilizing local fallback state:`, error.message);
    throw error;
  }
}

export const api = {
  // Auth
  login: (email, password) => fetchApi('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  getStats: () => fetchApi('/stats'),

  // Posts
  getPosts: (type) => fetchApi(`/posts${type ? `?type=${type}` : ''}`),
  createPost: (post) => fetchApi('/posts', { method: 'POST', body: JSON.stringify(post) }),
  deletePost: (id) => fetchApi(`/posts/${id}`, { method: 'DELETE' }),

  // Vacancies
  getVacancies: () => fetchApi('/vacancies'),
  createVacancy: (vacancy) => fetchApi('/vacancies', { method: 'POST', body: JSON.stringify(vacancy) }),
  deleteVacancy: (id) => fetchApi(`/vacancies/${id}`, { method: 'DELETE' }),

  // Quotes
  getQuotes: () => fetchApi('/quotes'),
  createQuote: (quote) => fetchApi('/quotes', { method: 'POST', body: JSON.stringify(quote) }),
  updateQuoteStatus: (id, status) => fetchApi(`/quotes/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }),

  // Consultations
  getConsultations: () => fetchApi('/consultations'),
  createConsultation: (data) => fetchApi('/consultations', { method: 'POST', body: JSON.stringify(data) }),

  // Users & Roles
  getUsers: () => fetchApi('/users'),
  createUser: (user) => fetchApi('/users', { method: 'POST', body: JSON.stringify(user) }),
  updateUserRole: (id, roleCode) => fetchApi(`/users/${id}`, { method: 'PUT', body: JSON.stringify({ roleCode }) }),

  // Partners & Activities
  getPartners: () => fetchApi('/partners'),
  getActivities: () => fetchApi('/activities')
};
