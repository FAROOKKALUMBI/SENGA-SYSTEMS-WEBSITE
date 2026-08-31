import express from 'express';
import { readDB, writeDB } from '../db.js';

const router = express.Router();

// Helper to generate unique ID
const uid = () => Math.random().toString(36).substring(2, 9);

// 1. Auth Login Route (Returns User ID, Title, Role, and Permissions)
router.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDB();
  const lowerEmail = (email || '').toLowerCase();
  
  let matchedUser = db.users.find(u => u.email.toLowerCase() === lowerEmail);

  if (!matchedUser) {
    if (lowerEmail.includes('editor')) {
      matchedUser = { id: 'usr_002', name: 'Grace Phiri', email: lowerEmail, title: 'Content Editor', role: 'Content Administrator', roleCode: 'CONTENT_ADMIN', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' };
    } else if (lowerEmail.includes('hr')) {
      matchedUser = { id: 'usr_003', name: 'Chisomo Banda', email: lowerEmail, title: 'HR Manager', role: 'HR Manager', roleCode: 'HR_MANAGER', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' };
    } else if (lowerEmail.includes('auditor') || lowerEmail.includes('security')) {
      matchedUser = { id: 'usr_004', name: 'Tamandani Mwale', email: lowerEmail, title: 'Security Lead', role: 'Security Auditor', roleCode: 'SECURITY_AUDITOR', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' };
    } else {
      matchedUser = db.users[0]; // Default to Mr. Farook Kalumbi (COO)
    }
  }

  // Update last login in database
  matchedUser.lastLogin = 'Just now';
  writeDB(db);

  return res.json({
    success: true,
    token: 'senga-jwt-token-' + uid(),
    user: matchedUser
  });
});

// 2. Stats endpoint for Admin Dashboard
router.get('/stats', (req, res) => {
  const db = readDB();
  res.json({
    publishedPosts: db.posts.length,
    activeVacancies: db.vacancies.length,
    quoteRequests: db.quotes.length,
    bookedSessions: db.consultations.length,
    totalUsers: db.users.length,
    activePartners: db.partners ? db.partners.length : 0
  });
});

// 3. Posts Endpoints (News, Events, Insights, Announcements) with authorId / userId
router.get('/posts', (req, res) => {
  const db = readDB();
  const { type } = req.query;
  let posts = db.posts;
  if (type && type !== 'all') {
    posts = posts.filter(p => p.type === type);
  }
  res.json(posts);
});

router.post('/posts', (req, res) => {
  const db = readDB();
  const { userId, author, title, content, excerpt, type, category, image } = req.body;
  const authorUser = db.users.find(u => u.id === userId) || db.users[0];

  const newPost = {
    id: 'p_' + uid(),
    title,
    type: type || 'news',
    category: category || 'NEWS',
    author: author || authorUser.name,
    authorId: authorUser.id,
    date: new Date().toISOString().split('T')[0],
    excerpt: excerpt || '',
    content: content || '',
    image: image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    status: 'PUBLISHED',
    createdAt: new Date().toISOString()
  };

  db.posts.unshift(newPost);
  
  // Add Audit Activity Log in DB
  const activity = {
    id: 'act_' + uid(),
    userId: authorUser.id,
    userName: authorUser.name,
    avatar: authorUser.avatar,
    action: `Published new post: "${title}"`,
    entity: 'POST',
    entityId: newPost.id,
    timeAgo: 'Just now',
    createdAt: new Date().toISOString()
  };
  if (!db.activities) db.activities = [];
  db.activities.unshift(activity);

  writeDB(db);
  res.status(201).json({ success: true, post: newPost, activity });
});

router.delete('/posts/:id', (req, res) => {
  const db = readDB();
  db.posts = db.posts.filter(p => p.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// 4. Vacancies Endpoints with createdBy / userId
router.get('/vacancies', (req, res) => {
  const db = readDB();
  res.json(db.vacancies);
});

router.post('/vacancies', (req, res) => {
  const db = readDB();
  const { userId, title, department, type, location, deadline, description, requirements } = req.body;
  const creatorUser = db.users.find(u => u.id === userId) || db.users[0];

  const newVacancy = {
    id: 'v_' + uid(),
    title,
    department: department || 'Software Engineering',
    type: type || 'Full-Time',
    location: location || 'Mzuzu / Remote',
    deadline: deadline || '2026-09-30',
    description: description || '',
    requirements: Array.isArray(requirements) ? requirements : [],
    createdBy: creatorUser.id,
    creatorName: creatorUser.name,
    status: 'ACTIVE',
    createdAt: new Date().toISOString()
  };

  db.vacancies.unshift(newVacancy);

  // Audit Activity
  const activity = {
    id: 'act_' + uid(),
    userId: creatorUser.id,
    userName: creatorUser.name,
    avatar: creatorUser.avatar,
    action: `Posted new job vacancy: "${title}"`,
    entity: 'VACANCY',
    entityId: newVacancy.id,
    timeAgo: 'Just now',
    createdAt: new Date().toISOString()
  };
  if (!db.activities) db.activities = [];
  db.activities.unshift(activity);

  writeDB(db);
  res.status(201).json({ success: true, vacancy: newVacancy, activity });
});

router.delete('/vacancies/:id', (req, res) => {
  const db = readDB();
  db.vacancies = db.vacancies.filter(v => v.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// 5. Quote Requests Endpoints
router.get('/quotes', (req, res) => {
  const db = readDB();
  res.json(db.quotes);
});

router.post('/quotes', (req, res) => {
  const db = readDB();
  const newQuote = {
    id: 'q_' + uid(),
    clientName: req.body.clientName || `${req.body.firstName || ''} ${req.body.surname || ''}`.trim(),
    email: req.body.email,
    phone: req.body.phone || '',
    company: req.body.company || '',
    serviceRequested: req.body.serviceRequested || req.body.inquiryType || 'General Project Quote',
    details: req.body.details || req.body.projectDescription || '',
    attachedFile: req.body.attachedFile || null,
    status: 'PENDING',
    submittedAt: new Date().toISOString()
  };

  db.quotes.unshift(newQuote);

  // System Activity Log
  const activity = {
    id: 'act_' + uid(),
    userId: 'system',
    userName: 'Client Portal',
    avatar: null,
    action: `Received new quote request from ${newQuote.clientName}`,
    entity: 'QUOTE',
    entityId: newQuote.id,
    timeAgo: 'Just now',
    createdAt: new Date().toISOString()
  };
  if (!db.activities) db.activities = [];
  db.activities.unshift(activity);

  writeDB(db);
  res.status(201).json({ success: true, quote: newQuote });
});

// 6. Consultations Endpoints
router.get('/consultations', (req, res) => {
  const db = readDB();
  res.json(db.consultations);
});

router.post('/consultations', (req, res) => {
  const db = readDB();
  const newConsultation = {
    id: 'c_' + uid(),
    status: 'CONFIRMED',
    createdAt: new Date().toISOString(),
    ...req.body
  };
  db.consultations.unshift(newConsultation);
  writeDB(db);
  res.status(201).json({ success: true, consultation: newConsultation });
});

// 7. Users / Roles Management Endpoints with createdBy / userId
router.get('/users', (req, res) => {
  const db = readDB();
  res.json(db.users);
});

router.post('/users', (req, res) => {
  const db = readDB();
  const { name, email, title, role, roleCode, createdBy } = req.body;
  const creatorUser = db.users.find(u => u.id === createdBy) || db.users[0];

  const newUser = {
    id: 'usr_' + uid(),
    name,
    email,
    title: title || 'Staff Member',
    role: role || 'Content Author',
    roleCode: roleCode || 'CONTENT_AUTHOR',
    status: 'ACTIVE',
    avatar: '/farook_avatar.jpg',
    createdBy: creatorUser.id,
    lastLogin: 'Never',
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);

  // Activity Log
  const activity = {
    id: 'act_' + uid(),
    userId: creatorUser.id,
    userName: creatorUser.name,
    avatar: creatorUser.avatar,
    action: `Created new staff account: ${name} (${role})`,
    entity: 'USER',
    entityId: newUser.id,
    timeAgo: 'Just now',
    createdAt: new Date().toISOString()
  };
  if (!db.activities) db.activities = [];
  db.activities.unshift(activity);

  writeDB(db);
  res.status(201).json({ success: true, user: newUser });
});

router.put('/users/:id', (req, res) => {
  const db = readDB();
  const index = db.users.findIndex(u => u.id === req.params.id);
  if (index !== -1) {
    db.users[index] = { ...db.users[index], ...req.body };
    writeDB(db);
    return res.json({ success: true, user: db.users[index] });
  }
  res.status(404).json({ error: 'User not found' });
});

// 8. Partners Endpoints
router.get('/partners', (req, res) => {
  const db = readDB();
  res.json(db.partners || []);
});

// 9. Activities Feed Endpoint
router.get('/activities', (req, res) => {
  const db = readDB();
  res.json(db.activities || []);
});

export default router;
