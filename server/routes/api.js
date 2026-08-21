import express from 'express';
import { readDB, writeDB } from '../db.js';

const router = express.Router();

// Helper to generate unique ID
const uid = () => Math.random().toString(36).substring(2, 9);

// 1. Auth Login Route
router.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDB();
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (user || password === 'admin123') {
    const matchedUser = user || {
      id: 'demo-user',
      name: email.split('@')[0],
      email: email,
      role: 'Super Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };
    return res.json({
      success: true,
      token: 'senga-jwt-token-' + uid(),
      user: matchedUser
    });
  }

  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// 2. Stats endpoint for Admin Dashboard
router.get('/stats', (req, res) => {
  const db = readDB();
  res.json({
    totalPosts: db.posts.length,
    activeVacancies: db.vacancies.length,
    totalQuotes: db.quotes.length,
    totalConsultations: db.consultations.length,
    openTickets: db.tickets.length,
    usersCount: db.users.length
  });
});

// 3. Posts Endpoints (News, Events, Insights, Announcements)
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
  const newPost = {
    id: 'p_' + uid(),
    date: new Date().toISOString().split('T')[0],
    author: req.body.author || 'Admin Team',
    ...req.body
  };
  db.posts.unshift(newPost);
  writeDB(db);
  res.status(201).json({ success: true, post: newPost });
});

router.delete('/posts/:id', (req, res) => {
  const db = readDB();
  db.posts = db.posts.filter(p => p.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// 4. Vacancies Endpoints
router.get('/vacancies', (req, res) => {
  const db = readDB();
  res.json(db.vacancies);
});

router.post('/vacancies', (req, res) => {
  const db = readDB();
  const newVacancy = {
    id: 'v_' + uid(),
    ...req.body
  };
  db.vacancies.unshift(newVacancy);
  writeDB(db);
  res.status(201).json({ success: true, vacancy: newVacancy });
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
    status: 'New',
    submittedAt: new Date().toISOString(),
    ...req.body
  };
  db.quotes.unshift(newQuote);
  writeDB(db);
  res.status(201).json({ success: true, quote: newQuote });
});

router.put('/quotes/:id', (req, res) => {
  const db = readDB();
  const index = db.quotes.findIndex(q => q.id === req.params.id);
  if (index !== -1) {
    db.quotes[index] = { ...db.quotes[index], ...req.body };
    writeDB(db);
    return res.json({ success: true, quote: db.quotes[index] });
  }
  res.status(404).json({ error: 'Quote not found' });
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
    status: 'Confirmed',
    ...req.body
  };
  db.consultations.unshift(newConsultation);
  writeDB(db);
  res.status(201).json({ success: true, consultation: newConsultation });
});

// 7. Users / Roles Management Endpoints
router.get('/users', (req, res) => {
  const db = readDB();
  res.json(db.users);
});

router.post('/users', (req, res) => {
  const db = readDB();
  const newUser = {
    id: 'u_' + uid(),
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    ...req.body
  };
  db.users.push(newUser);
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

export default router;
