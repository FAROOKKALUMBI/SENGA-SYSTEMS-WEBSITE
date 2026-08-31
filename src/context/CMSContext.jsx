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
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
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
    return saved ? JSON.parse(saved) : DEFAULT_COO_USER;
  });
  
  const [posts, setPosts] = useState([
    {
      id: 'p1',
      title: 'Senga Systems Deploys Enterprise AI Infrastructure in Malawi',
      excerpt: 'Empowering regional banks and government institutions with high-throughput neural processing clusters.',
      content: 'Full article content detailing the strategic AI hardware and model deployment across Central Africa.',
      type: 'news',
      category: 'NEWS',
      date: '2026-08-28',
      author: 'Farook Kalumbi',
      status: 'PUBLISHED'
    },
    {
      id: 'p2',
      title: 'Annual Cybersecurity & SengaShield Defense Summit 2026',
      excerpt: 'Join leading cloud architects and threat intelligence officers for a hands-on zero-trust security workshop.',
      content: 'Register for live technical demonstrations on automated threat mitigation and encryption standards.',
      type: 'events',
      category: 'EVENT',
      date: '2026-09-15',
      location: 'Ufulu Gardens Conference Centre, Lilongwe',
      author: 'Farook Kalumbi',
      status: 'PUBLISHED'
    }
  ]);

  const [vacancies, setVacancies] = useState([
    {
      id: 'v1',
      title: 'Senior AI & Machine Learning Systems Architect',
      department: 'AI & Data Intelligence',
      type: 'Full-Time',
      location: 'Mzuzu / Remote',
      deadline: '2026-09-30',
      description: 'Lead model optimization, distributed training pipelines, and RAG architectures for client systems.',
      requirements: ['5+ years Python & PyTorch', 'LLM fine-tuning experience', 'BSc/MSc Computer Science'],
      status: 'ACTIVE'
    },
    {
      id: 'v2',
      title: 'Cybersecurity Operations & Threat Analyst',
      department: 'Security Operations',
      type: 'Full-Time',
      location: 'Lilongwe Office',
      deadline: '2026-09-25',
      description: 'Monitor SengaShield SOC telemetry, conduct vulnerability assessments, and respond to incidents.',
      requirements: ['CEH/CISSP certification', 'SIEM log monitoring', 'Network packet analysis'],
      status: 'ACTIVE'
    }
  ]);

  const [quotes, setQuotes] = useState([
    {
      id: 'q1',
      clientName: 'Malawi National Microfinance Bank',
      email: 'tech@microfinance.mw',
      company: 'MNMB',
      serviceRequested: 'AI & Automation Integration',
      details: 'Requesting automated document processing and loan scoring system audit.',
      attachedFile: 'RFP_Microfinance_2026.pdf',
      date: '2026-08-30',
      status: 'PENDING'
    }
  ]);

  const [consultations, setConsultations] = useState([
    {
      id: 'c1',
      clientName: 'Blantyre Commercial Logistics Ltd',
      email: 'info@bcl.mw',
      phone: '+265 888 123 789',
      consultantNeeded: 'Cloud & ICT Infrastructure Audit',
      preferredDate: '2026-09-05',
      timeSlot: '10:00 AM',
      status: 'CONFIRMED'
    }
  ]);

  const [users, setUsers] = useState([
    DEFAULT_COO_USER,
    {
      id: 'usr_002',
      name: 'Grace Phiri',
      email: 'grace@sengasystems.com',
      title: 'Head of Content & Communications',
      role: 'Content Administrator',
      roleCode: 'CONTENT_ADMIN',
      status: 'ACTIVE',
      lastLogin: 'Yesterday at 04:15 PM'
    },
    {
      id: 'usr_003',
      name: 'Chisomo Banda',
      email: 'chisomo@sengasystems.com',
      title: 'HR & Talent Lead',
      role: 'HR Manager',
      roleCode: 'HR_MANAGER',
      status: 'ACTIVE',
      lastLogin: '2 days ago'
    },
    {
      id: 'usr_004',
      name: 'Tamandani Mwale',
      email: 'tamandani@sengasystems.com',
      title: 'Senior Security Specialist',
      role: 'Security Auditor',
      roleCode: 'SECURITY_AUDITOR',
      status: 'ACTIVE',
      lastLogin: 'Today at 09:10 AM'
    }
  ]);

  const [partners, setPartners] = useState([
    { id: 'pt1', name: 'Microsoft Cloud Partner', category: 'Cloud Infrastructure', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', status: 'ACTIVE' },
    { id: 'pt2', name: 'NVIDIA AI Inception', category: 'Hardware Acceleration', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', status: 'ACTIVE' }
  ]);

  const [activities, setActivities] = useState([
    { id: 'act_1', user: 'Farook Kalumbi', avatar: DEFAULT_COO_USER.avatar, action: 'Published AI Infrastructure News Post', timeAgo: '10 mins ago', type: 'post' },
    { id: 'act_2', user: 'Chisomo Banda', avatar: null, action: 'Posted Senior AI Systems Architect Vacancy', timeAgo: '2 hours ago', type: 'vacancy' },
    { id: 'act_3', user: 'System Telemetry', avatar: null, action: 'Received Quote Request from Malawi Microfinance', timeAgo: '4 hours ago', type: 'quote' },
    { id: 'act_4', user: 'Farook Kalumbi', avatar: DEFAULT_COO_USER.avatar, action: 'Updated System Security Firewall & Passed Audit', timeAgo: 'Yesterday', type: 'security' }
  ]);

  const [stats, setStats] = useState({
    publishedPosts: 12,
    postsTrend: '↑ 12%',
    activeVacancies: 2,
    vacanciesTrend: '↑ 25%',
    quoteRequests: 18,
    quotesTrend: '↑ 18%',
    bookedSessions: 8,
    sessionsTrend: '↑ 8%',
    totalUsers: 4,
    usersTrend: '↑ 10%',
    activePartners: 6,
    partnersTrend: '↑ 15%'
  });

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [quoteServicePrefill, setQuoteServicePrefill] = useState('');

  const login = async (email, password) => {
    let matchedUser = users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
    if (!matchedUser) {
      const lowerEmail = (email || '').toLowerCase();
      if (lowerEmail.includes('editor')) {
        matchedUser = { id: 'usr_ed', name: 'Grace Phiri', email: lowerEmail, title: 'Content Editor', role: 'Content Administrator', roleCode: 'CONTENT_ADMIN', avatar: null };
      } else if (lowerEmail.includes('hr')) {
        matchedUser = { id: 'usr_hr', name: 'Chisomo Banda', email: lowerEmail, title: 'HR & Talent Lead', role: 'HR Manager', roleCode: 'HR_MANAGER', avatar: null };
      } else if (lowerEmail.includes('support')) {
        matchedUser = { id: 'usr_sup', name: 'John Kaunda', email: lowerEmail, title: 'Support Lead', role: 'Client Support', roleCode: 'CLIENT_SUPPORT', avatar: null };
      } else if (lowerEmail.includes('biz') || lowerEmail.includes('sales')) {
        matchedUser = { id: 'usr_biz', name: 'Memory Musonda', email: lowerEmail, title: 'Sales Manager', role: 'Sales Manager', roleCode: 'SALES_MANAGER', avatar: null };
      } else if (lowerEmail.includes('auditor') || lowerEmail.includes('security')) {
        matchedUser = { id: 'usr_sec', name: 'Tamandani Mwale', email: lowerEmail, title: 'Security Specialist', role: 'Security Auditor', roleCode: 'SECURITY_AUDITOR', avatar: null };
      } else if (lowerEmail.includes('partner')) {
        matchedUser = { id: 'usr_part', name: 'Patricia Gondwe', email: lowerEmail, title: 'Partner Liaison', role: 'Partner Manager', roleCode: 'PARTNER_MANAGER', avatar: null };
      } else if (lowerEmail.includes('analytics')) {
        matchedUser = { id: 'usr_an', name: 'Kelvin Chirwa', email: lowerEmail, title: 'Data Analyst', role: 'Analytics Viewer', roleCode: 'ANALYTICS_VIEWER', avatar: null };
      } else {
        matchedUser = { ...DEFAULT_COO_USER, email: email || DEFAULT_COO_USER.email };
      }
    }
    const loggedInUser = { ...matchedUser, lastLogin: 'Just now' };
    setUser(loggedInUser);
    localStorage.setItem('senga_admin_user', JSON.stringify(loggedInUser));
    return { success: true, user: loggedInUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('senga_admin_user');
  };

  const addPost = async (postData) => {
    const newPost = {
      id: 'p_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      author: user?.name || 'Farook Kalumbi',
      status: 'PUBLISHED',
      ...postData
    };
    setPosts(prev => [newPost, ...prev]);
    addActivity(`Published new post: "${newPost.title}"`);
    return newPost;
  };

  const deletePost = async (id) => {
    setPosts(prev => prev.filter(p => p.id !== id));
    addActivity('Deleted news article post');
  };

  const addVacancy = async (vacData) => {
    const newVac = {
      id: 'v_' + Date.now(),
      status: 'ACTIVE',
      ...vacData
    };
    setVacancies(prev => [newVac, ...prev]);
    addActivity(`Posted new job vacancy: "${newVac.title}"`);
    return newVac;
  };

  const deleteVacancy = async (id) => {
    setVacancies(prev => prev.filter(v => v.id !== id));
    addActivity('Removed job vacancy position');
  };

  const addUser = async (userData) => {
    const newUser = {
      id: 'usr_' + Date.now(),
      status: 'ACTIVE',
      lastLogin: 'Never',
      ...userData
    };
    setUsers(prev => [...prev, newUser]);
    addActivity(`Created new user account: ${newUser.name} (${newUser.role})`);
    return newUser;
  };

  const updateUserRole = async (id, roleCode) => {
    const roleObj = SYSTEM_ROLES.find(r => r.id === roleCode) || SYSTEM_ROLES[0];
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: roleObj.name, roleCode: roleObj.id } : u));
    addActivity(`Updated role permissions for user`);
  };

  const submitQuote = async (quoteData) => {
    const newQuote = {
      id: 'q_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'PENDING',
      ...quoteData
    };
    setQuotes(prev => [newQuote, ...prev]);
    addActivity(`Received project quote request from ${newQuote.clientName}`);
    return newQuote;
  };

  const submitConsultation = async (consultData) => {
    const newConsult = {
      id: 'c_' + Date.now(),
      status: 'CONFIRMED',
      ...consultData
    };
    setConsultations(prev => [newConsult, ...prev]);
    addActivity(`Booked consultation session for ${newConsult.clientName}`);
    return newConsult;
  };

  const addActivity = (actionDescription) => {
    const newAct = {
      id: 'act_' + Date.now(),
      user: user?.name || 'Farook Kalumbi',
      avatar: user?.avatar || null,
      action: actionDescription,
      timeAgo: 'Just now'
    };
    setActivities(prev => [newAct, ...prev.slice(0, 9)]);
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
        users,
        partners,
        activities,
        stats,
        systemRoles: SYSTEM_ROLES,
        addPost,
        deletePost,
        addVacancy,
        deleteVacancy,
        addUser,
        updateUserRole,
        submitQuote,
        submitConsultation,
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
