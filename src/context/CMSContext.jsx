import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const CMSContext = createContext();

export function CMSProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('senga_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [posts, setPosts] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  // Quote & Consultation Modals
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [quoteServicePrefill, setQuoteServicePrefill] = useState('');

  // Load all initial data from Backend
  const refreshData = async () => {
    setLoading(true);
    try {
      const [postsRes, vacanciesRes, quotesRes, consultationsRes, usersRes, statsRes] = await Promise.allSettled([
        api.getPosts(),
        api.getVacancies(),
        api.getQuotes(),
        api.getConsultations(),
        api.getUsers(),
        api.getStats()
      ]);

      if (postsRes.status === 'fulfilled') setPosts(postsRes.value);
      if (vacanciesRes.status === 'fulfilled') setVacancies(vacanciesRes.value);
      if (quotesRes.status === 'fulfilled') setQuotes(quotesRes.value);
      if (consultationsRes.status === 'fulfilled') setConsultations(consultationsRes.value);
      if (usersRes.status === 'fulfilled') setUsers(usersRes.value);
      if (statsRes.status === 'fulfilled') setStats(statsRes.value);
    } catch (err) {
      console.error('Error fetching CMS data from backend:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.login(email, password);
      if (res.success) {
        setUser(res.user);
        localStorage.setItem('senga_admin_user', JSON.stringify(res.user));
        return { success: true };
      }
    } catch (err) {
      // Fallback demo user for offline mode
      const demoUser = {
        id: 'demo-1',
        name: 'Dr. Senga CEO',
        email: email,
        role: 'Super Admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      };
      setUser(demoUser);
      localStorage.setItem('senga_admin_user', JSON.stringify(demoUser));
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('senga_admin_user');
  };

  // Actions
  const addPost = async (postData) => {
    try {
      const res = await api.createPost(postData);
      if (res.success) {
        setPosts(prev => [res.post, ...prev]);
        return res.post;
      }
    } catch (err) {
      const fallback = { id: 'p_' + Date.now(), date: new Date().toISOString().split('T')[0], ...postData };
      setPosts(prev => [fallback, ...prev]);
      return fallback;
    }
  };

  const deletePost = async (id) => {
    try {
      await api.deletePost(id);
    } catch (err) {
      console.warn('Backend delete failed, performing local delete');
    }
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  const addVacancy = async (vacancyData) => {
    try {
      const res = await api.createVacancy(vacancyData);
      if (res.success) {
        setVacancies(prev => [res.vacancy, ...prev]);
        return res.vacancy;
      }
    } catch (err) {
      const fallback = { id: 'v_' + Date.now(), ...vacancyData };
      setVacancies(prev => [fallback, ...prev]);
      return fallback;
    }
  };

  const deleteVacancy = async (id) => {
    try {
      await api.deleteVacancy(id);
    } catch (err) {}
    setVacancies(prev => prev.filter(v => v.id !== id));
  };

  const submitQuote = async (quoteData) => {
    try {
      const res = await api.createQuote(quoteData);
      if (res.success) {
        setQuotes(prev => [res.quote, ...prev]);
        return res.quote;
      }
    } catch (err) {
      const fallback = { id: 'q_' + Date.now(), status: 'New', submittedAt: new Date().toISOString(), ...quoteData };
      setQuotes(prev => [fallback, ...prev]);
      return fallback;
    }
  };

  const updateQuoteStatus = async (id, status) => {
    try {
      await api.updateQuoteStatus(id, status);
    } catch (err) {}
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, status } : q));
  };

  const submitConsultation = async (consultationData) => {
    try {
      const res = await api.createConsultation(consultationData);
      if (res.success) {
        setConsultations(prev => [res.consultation, ...prev]);
        return res.consultation;
      }
    } catch (err) {
      const fallback = { id: 'c_' + Date.now(), status: 'Confirmed', ...consultationData };
      setConsultations(prev => [fallback, ...prev]);
      return fallback;
    }
  };

  const updateUserRole = async (id, role) => {
    try {
      await api.updateUserRole(id, role);
    } catch (err) {}
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u));
  };

  const openQuoteModal = (service = '') => {
    setQuoteServicePrefill(service);
    setIsQuoteOpen(true);
  };

  return (
    <CMSContext.Provider
      value={{
        user,
        login,
        logout,
        posts,
        vacancies,
        quotes,
        consultations,
        users,
        stats,
        loading,
        refreshData,
        addPost,
        deletePost,
        addVacancy,
        deleteVacancy,
        submitQuote,
        updateQuoteStatus,
        submitConsultation,
        updateUserRole,
        isQuoteOpen,
        setIsQuoteOpen,
        openQuoteModal,
        quoteServicePrefill,
        isConsultationOpen,
        setIsConsultationOpen
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  return useContext(CMSContext);
}
