const API_BASE = '/api';

export async function fetchApi(endpoint, options = {}) {
  try {
    const token = localStorage.getItem('senga_admin_token');
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      ...options,
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.warn(`API request to ${endpoint} failed:`, error.message);
    throw error;
  }
}

export const api = {
  // Auth
  login: (email, password) => fetchApi('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  getStats: () => fetchApi('/stats'),
  getAnalytics: () => fetchApi('/analytics'),
  subscribeNewsletter: (email) => fetchApi('/newsletter', { method: 'POST', body: JSON.stringify({ email }) }),

  // Posts
  getPosts: (type) => fetchApi(`/posts${type ? `?type=${type}` : ''}`),
  createPost: (post) => fetchApi('/posts', { method: 'POST', body: JSON.stringify(post) }),
  updatePost: (id, post) => fetchApi(`/posts/${id}`, { method: 'PUT', body: JSON.stringify(post) }),
  deletePost: (id) => fetchApi(`/posts/${id}`, { method: 'DELETE' }),

  // Vacancies
  getVacancies: () => fetchApi('/vacancies'),
  createVacancy: (vacancy) => fetchApi('/vacancies', { method: 'POST', body: JSON.stringify(vacancy) }),
  updateVacancy: (id, vacancy) => fetchApi(`/vacancies/${id}`, { method: 'PUT', body: JSON.stringify(vacancy) }),
  deleteVacancy: (id) => fetchApi(`/vacancies/${id}`, { method: 'DELETE' }),

  // Quotes
  getQuotes: () => fetchApi('/quotes'),
  createQuote: (quote) => fetchApi('/quotes', { method: 'POST', body: JSON.stringify(quote) }),
  updateQuoteStatus: (id, status) => fetchApi(`/quotes/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }),
  deleteQuote: (id) => fetchApi(`/quotes/${id}`, { method: 'DELETE' }),

  // Consultations
  getConsultations: () => fetchApi('/consultations'),
  createConsultation: (data) => fetchApi('/consultations', { method: 'POST', body: JSON.stringify(data) }),

  // Contact Submissions
  getContacts: () => fetchApi('/contacts'),
  submitContact: (data) => fetchApi('/contact', { method: 'POST', body: JSON.stringify(data) }),

  // Payments
  getPayments: () => fetchApi('/payments'),
  submitPayment: (data) => fetchApi('/payments', { method: 'POST', body: JSON.stringify(data) }),

  // Users & Roles
  getUsers: () => fetchApi('/users'),
  createUser: (user) => fetchApi('/users', { method: 'POST', body: JSON.stringify(user) }),
  updateUser: (id, user) => fetchApi(`/users/${id}`, { method: 'PUT', body: JSON.stringify(user) }),
  updateUserRole: (id, roleCode) => fetchApi(`/users/${id}`, { method: 'PUT', body: JSON.stringify({ roleCode }) }),
  deleteUser: (id) => fetchApi(`/users/${id}`, { method: 'DELETE' }),

  // Partners & Activities
  getPartners: () => fetchApi('/partners'),
  createPartner: (partner) => fetchApi('/partners', { method: 'POST', body: JSON.stringify(partner) }),
  deletePartner: (id) => fetchApi(`/partners/${id}`, { method: 'DELETE' }),
  getActivities: () => fetchApi('/activities'),

  // Settings
  getSettings: () => fetchApi('/settings'),
  updateSettings: (settings) => fetchApi('/settings', { method: 'PUT', body: JSON.stringify(settings) })
};
