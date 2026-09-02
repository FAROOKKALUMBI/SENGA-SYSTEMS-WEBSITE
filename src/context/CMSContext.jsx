import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const CMSContext = createContext();

// 10 SYSTEM ROLES AND DETAILED PERMISSIONS AS PER RBAC SPECIFICATION
export const SYSTEM_ROLES = [
  { 
    id: 'SYSTEM_ADMIN', 
    name: 'System Administrator', 
    permissions: 'Full system access, can create/edit/delete all users, manage all content and settings',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
  },
  { 
    id: 'CONTENT_ADMIN', 
    name: 'Content Administrator', 
    permissions: 'Create, edit, publish, and delete all content across the website',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
  },
  { 
    id: 'CONTENT_AUTHOR', 
    name: 'Content Author', 
    permissions: 'Create and edit own drafts, submit for approval (cannot publish)',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
  },
  { 
    id: 'SERVICE_MANAGER', 
    name: 'Service Manager', 
    permissions: 'Manage service pages, sub-services, and service descriptions',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
  },
  { 
    id: 'HR_MANAGER', 
    name: 'HR Manager', 
    permissions: 'Manage vacancies, job postings, and job applications',
    badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/30'
  },
  { 
    id: 'CLIENT_SUPPORT', 
    name: 'Client Support', 
    permissions: 'View and respond to contact form submissions and support tickets',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
  },
  { 
    id: 'SALES_MANAGER', 
    name: 'Sales Manager', 
    permissions: 'Manage quote requests, payments, and client consultations',
    badgeColor: 'bg-[#2563EB]/20 text-[#2563EB] border-[#2563EB]/30'
  },
  { 
    id: 'SECURITY_AUDITOR', 
    name: 'Security Auditor', 
    permissions: 'Read-only access to system logs, user activity, and security monitoring',
    badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30'
  },
  { 
    id: 'PARTNER_MANAGER', 
    name: 'Partner Manager', 
    permissions: 'Manage partner profiles, logos, and partnership descriptions',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30'
  },
  { 
    id: 'ANALYTICS_VIEWER', 
    name: 'Analytics Viewer', 
    permissions: 'View analytics dashboard only (no content changes)',
    badgeColor: 'bg-slate-500/20 text-slate-300 border-slate-500/30'
  }
];

export const ACCESS_POLICIES = {
  SYSTEM_ADMIN: {
    accessLevel: 'Full Access',
    permissions: 'System configuration, users, content, media, security, backups, logs, and all staff functions',
    paths: ['/admin/dashboard', '/admin/posts', '/admin/vacancies', '/admin/leads', '/admin/roles', '/admin/partners', '/admin/analytics', '/admin/settings', '/admin/users', '/admin/security', '/admin/logs']
  },
  STAFF: {
    accessLevel: 'Medium Access',
    permissions: 'Content, services, vacancies, partners, quotes, support, and analytics',
    paths: ['/admin/dashboard', '/admin/posts', '/admin/vacancies', '/admin/leads', '/admin/partners', '/admin/analytics']
  }
};

export const getAccessPolicy = (roleCode) => roleCode === 'SYSTEM_ADMIN' ? ACCESS_POLICIES.SYSTEM_ADMIN : ACCESS_POLICIES.STAFF;

// DEFAULT SYSTEM ADMINISTRATOR: MR. FAROOK KALUMBI (COO)
export const DEFAULT_COO_USER = {
  id: 'usr_farook_001',
  name: 'Mr. Farook Kalumbi',
  email: 'farook@sengasystems.com',
  title: 'Chief Operating Officer',
  role: 'System Administrator',
  roleCode: 'SYSTEM_ADMIN',
  status: 'ACTIVE',
  avatar: '/farook_avatar.jpg',
  lastLogin: 'Today at 08:30 AM'
};

export function CMSProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('senga_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [posts, setPosts] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [users, setUsers] = useState([]);
  const [partners, setPartners] = useState([]);
  const [activities, setActivities] = useState([]);
  const [settings, setSettings] = useState({});
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [quoteServicePrefill, setQuoteServicePrefill] = useState('');

  // Load all initial database state from REST API
  const refreshData = async () => {
    setLoading(true);
    try {
      const [
        postsRes, 
        vacanciesRes, 
        quotesRes, 
        consultationsRes, 
        contactsRes,
        paymentsRes,
        usersRes, 
        partnersRes, 
        activitiesRes, 
        settingsRes,
        statsRes
      ] = await Promise.allSettled([
        api.getPosts(),
        api.getVacancies(),
        api.getQuotes(),
        api.getConsultations(),
        api.getContacts(),
        api.getPayments(),
        api.getUsers(),
        api.getPartners(),
        api.getActivities(),
        api.getSettings(),
        api.getStats()
      ]);

      if (postsRes.status === 'fulfilled') setPosts(postsRes.value);
      if (vacanciesRes.status === 'fulfilled') setVacancies(vacanciesRes.value);
      if (quotesRes.status === 'fulfilled') setQuotes(quotesRes.value);
      if (consultationsRes.status === 'fulfilled') setConsultations(consultationsRes.value);
      if (contactsRes.status === 'fulfilled') setContacts(contactsRes.value);
      if (paymentsRes.status === 'fulfilled') setPayments(paymentsRes.value);
      if (usersRes.status === 'fulfilled') setUsers(usersRes.value);
      if (partnersRes.status === 'fulfilled') setPartners(partnersRes.value);
      if (activitiesRes.status === 'fulfilled') setActivities(activitiesRes.value);
      if (settingsRes.status === 'fulfilled') setSettings(settingsRes.value);
      if (statsRes.status === 'fulfilled') setStats(statsRes.value);
    } catch (err) {
      console.warn('Backend offline, using current memory state:', err);
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
        const authenticatedUser = {
          ...res.user,
          accessLevel: getAccessPolicy(res.user.roleCode).accessLevel,
          accessPermissions: getAccessPolicy(res.user.roleCode).permissions
        };
        setUser(authenticatedUser);
        localStorage.setItem('senga_admin_user', JSON.stringify(authenticatedUser));
        localStorage.setItem('senga_admin_token', res.token);
        await refreshData();
        return { success: true, user: authenticatedUser };
      }
    } catch (err) {
      setUser(null);
      localStorage.removeItem('senga_admin_user');
      localStorage.removeItem('senga_admin_token');
      return { success: false, error: err.message || 'Unable to sign in.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('senga_admin_user');
    localStorage.removeItem('senga_admin_token');
  };

  const isSystemAdmin = () => user?.roleCode === 'SYSTEM_ADMIN';

  // Posts CRUD
  const addPost = async (postData) => {
    const payload = {
      ...postData,
      userId: user?.id || DEFAULT_COO_USER.id,
      author: postData.author || user?.name || DEFAULT_COO_USER.name
    };
    try {
      const res = await api.createPost(payload);
      if (res.success) {
        setPosts(prev => [res.post, ...prev]);
        if (res.activity) setActivities(prev => [res.activity, ...prev]);
        return res.post;
      }
    } catch (err) {
      const newPost = {
        id: 'p_' + Date.now(),
        date: new Date().toISOString().split('T')[0],
        author: payload.author,
        authorId: payload.userId,
        status: 'PUBLISHED',
        ...postData
      };
      setPosts(prev => [newPost, ...prev]);
      return newPost;
    }
  };

  const updatePost = async (id, postData) => {
    try {
      const res = await api.updatePost(id, postData);
      if (res.success) {
        setPosts(prev => prev.map(p => p.id === id ? res.post : p));
        return res.post;
      }
    } catch (err) {
      console.warn('API update error:', err);
    }
    setPosts(prev => prev.map(p => p.id === id ? { ...p, ...postData } : p));
  };

  const deletePost = async (id) => {
    if (!isSystemAdmin()) return false;
    try {
      await api.deletePost(id);
    } catch (err) {
      console.warn('API delete error:', err);
    }
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  // Vacancies CRUD
  const addVacancy = async (vacData) => {
    const payload = {
      ...vacData,
      userId: user?.id || DEFAULT_COO_USER.id,
      creatorName: user?.name || DEFAULT_COO_USER.name
    };
    try {
      const res = await api.createVacancy(payload);
      if (res.success) {
        setVacancies(prev => [res.vacancy, ...prev]);
        if (res.activity) setActivities(prev => [res.activity, ...prev]);
        return res.vacancy;
      }
    } catch (err) {
      const newVac = {
        id: 'v_' + Date.now(),
        createdBy: payload.userId,
        creatorName: payload.creatorName,
        status: 'ACTIVE',
        ...vacData
      };
      setVacancies(prev => [newVac, ...prev]);
      return newVac;
    }
  };

  const updateVacancy = async (id, vacData) => {
    try {
      const res = await api.updateVacancy(id, vacData);
      if (res.success) {
        setVacancies(prev => prev.map(v => v.id === id ? res.vacancy : v));
        return res.vacancy;
      }
    } catch (err) {
      console.warn('API update error:', err);
    }
    setVacancies(prev => prev.map(v => v.id === id ? { ...v, ...vacData } : v));
  };

  const deleteVacancy = async (id) => {
    if (!isSystemAdmin()) return false;
    try {
      await api.deleteVacancy(id);
    } catch (err) {
      console.warn('API delete error:', err);
    }
    setVacancies(prev => prev.filter(v => v.id !== id));
  };

  // Quotes CRUD
  const submitQuote = async (quoteData) => {
    try {
      const res = await api.createQuote(quoteData);
      if (res.success) {
        setQuotes(prev => [res.quote, ...prev]);
        return res.quote;
      }
    } catch (err) {
      const newQuote = {
        id: 'q_' + Date.now(),
        date: new Date().toISOString().split('T')[0],
        status: 'PENDING',
        ...quoteData
      };
      setQuotes(prev => [newQuote, ...prev]);
      return newQuote;
    }
  };

  const updateQuoteStatus = async (id, status) => {
    try {
      await api.updateQuoteStatus(id, status);
    } catch (err) {
      console.warn('API quote update error:', err);
    }
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, status } : q));
  };

  const deleteQuote = async (id) => {
    if (!isSystemAdmin()) return false;
    try {
      await api.deleteQuote(id);
    } catch (err) {
      console.warn('API quote delete error:', err);
    }
    setQuotes(prev => prev.filter(q => q.id !== id));
  };

  // Consultations CRUD
  const submitConsultation = async (consultData) => {
    try {
      const res = await api.createConsultation(consultData);
      if (res.success) {
        setConsultations(prev => [res.consultation, ...prev]);
        return res.consultation;
      }
    } catch (err) {
      const newConsult = {
        id: 'c_' + Date.now(),
        status: 'CONFIRMED',
        ...consultData
      };
      setConsultations(prev => [newConsult, ...prev]);
      return newConsult;
    }
  };

  // Contact Messages
  const submitContact = async (contactData) => {
    try {
      const res = await api.submitContact(contactData);
      if (res.success) {
        setContacts(prev => [res.contact, ...prev]);
        return res.contact;
      }
    } catch (err) {
      const newContact = {
        id: 'cnt_' + Date.now(),
        status: 'NEW',
        createdAt: new Date().toISOString(),
        ...contactData
      };
      setContacts(prev => [newContact, ...prev]);
      return newContact;
    }
  };

  // Payment Gateway
  const submitPayment = async (paymentData) => {
    if (!isSystemAdmin()) return false;
    try {
      const res = await api.submitPayment(paymentData);
      if (res.success) {
        setPayments(prev => [res.payment, ...prev]);
        return res.payment;
      }
    } catch (err) {
      const newPayment = {
        id: 'pay_' + Date.now(),
        status: 'COMPLETED',
        transactionId: 'TXN-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        createdAt: new Date().toISOString(),
        ...paymentData
      };
      setPayments(prev => [newPayment, ...prev]);
      return newPayment;
    }
  };

  // Users & Roles CRUD
  const addUser = async (userData) => {
    if (!isSystemAdmin()) return false;
    const payload = {
      ...userData,
      createdBy: user?.id || DEFAULT_COO_USER.id
    };
    try {
      const res = await api.createUser(payload);
      if (res.success) {
        setUsers(prev => [...prev, res.user]);
        return res.user;
      }
    } catch (err) {
      const newUser = {
        id: 'usr_' + Date.now(),
        status: 'ACTIVE',
        lastLogin: 'Never',
        createdBy: payload.createdBy,
        ...userData
      };
      setUsers(prev => [...prev, newUser]);
      return newUser;
    }
  };

  const updateUser = async (id, userData) => {
    if (!isSystemAdmin()) return false;
    try {
      const res = await api.updateUser(id, userData);
      if (res.success) {
        setUsers(prev => prev.map(u => u.id === id ? res.user : u));
        return res.user;
      }
    } catch (err) {
      console.warn('API update user error:', err);
    }
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...userData } : u));
  };

  const updateUserRole = async (id, roleCode) => {
    if (!isSystemAdmin()) return false;
    const roleObj = SYSTEM_ROLES.find(r => r.id === roleCode) || SYSTEM_ROLES[0];
    try {
      await api.updateUserRole(id, roleCode);
    } catch (err) {
      console.warn('API update error:', err);
    }
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: roleObj.name, roleCode: roleObj.id } : u));
  };

  const deleteUser = async (id) => {
    if (!isSystemAdmin()) return false;
    try {
      await api.deleteUser(id);
    } catch (err) {
      console.warn('API delete user error:', err);
    }
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  // Partners CRUD
  const addPartner = async (partnerData) => {
    try {
      const res = await api.createPartner(partnerData);
      if (res.success) {
        setPartners(prev => [...prev, res.partner]);
        return res.partner;
      }
    } catch (err) {
      const newPartner = {
        id: 'pt_' + Date.now(),
        status: 'ACTIVE',
        ...partnerData
      };
      setPartners(prev => [...prev, newPartner]);
      return newPartner;
    }
  };

  const deletePartner = async (id) => {
    if (!isSystemAdmin()) return false;
    try {
      await api.deletePartner(id);
    } catch (err) {
      console.warn('API delete partner error:', err);
    }
    setPartners(prev => prev.filter(p => p.id !== id));
  };

  // Settings
  const updateSettings = async (newSettings) => {
    if (!isSystemAdmin()) return false;
    try {
      const res = await api.updateSettings(newSettings);
      if (res.success) {
        setSettings(res.settings);
        return res.settings;
      }
    } catch (err) {
      console.warn('API update settings error:', err);
    }
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const openQuoteModal = (service = '') => {
    setQuoteServicePrefill(service);
    if (typeof window !== 'undefined') {
      window.location.href = '/quote';
    }
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
        contacts,
        payments,
        users,
        partners,
        activities,
        settings,
        stats,
        systemRoles: SYSTEM_ROLES,
        loading,
        addPost,
        updatePost,
        deletePost,
        addVacancy,
        updateVacancy,
        deleteVacancy,
        submitQuote,
        updateQuoteStatus,
        deleteQuote,
        submitConsultation,
        submitContact,
        submitPayment,
        addUser,
        updateUser,
        updateUserRole,
        deleteUser,
        addPartner,
        deletePartner,
        updateSettings,
        isQuoteOpen,
        setIsQuoteOpen,
        openQuoteModal,
        quoteServicePrefill,
        isConsultationOpen,
        setIsConsultationOpen,
        refreshData
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  return useContext(CMSContext);
}
