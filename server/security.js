import crypto from 'crypto';

const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const sessions = new Map();
const attempts = new Map();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[\s'-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;

export const clean = (value) => typeof value === 'string' ? value.trim() : value;
export const isEmail = (value) => emailPattern.test(clean(value) || '');
export const isName = (value) => { const v = clean(value) || ''; return v.length >= 2 && namePattern.test(v); };
export const isPhone = (value) => { const v = clean(value) || ''; const digits = v.replace(/\D/g, ''); return /^[0-9+()\s-]+$/.test(v) && digits.length >= 7 && digits.length <= 15; };
export const isMessage = (value) => { const v = clean(value) || ''; return v.length >= 10 && v.length <= 2000; };

export function createSession(user) {
  const token = crypto.randomBytes(32).toString('base64url');
  sessions.set(token, { userId: user.id, roleCode: user.roleCode, expiresAt: Date.now() + SESSION_TTL_MS });
  return token;
}

export function requireAuth(req, res, next) {
  const token = req.get('Authorization')?.replace(/^Bearer\s+/i, '');
  const session = token && sessions.get(token);
  if (!session || session.expiresAt < Date.now()) { if (token) sessions.delete(token); return res.status(401).json({ error: 'Authentication is required.' }); }
  req.session = session;
  next();
}

export const requireRoles = (...roles) => [requireAuth, (req, res, next) => roles.includes(req.session.roleCode) ? next() : res.status(403).json({ error: 'You do not have permission for this action.' })];

export function allowLoginAttempt(ip) {
  const entry = attempts.get(ip) || { count: 0, started: Date.now() };
  if (Date.now() - entry.started > 15 * 60 * 1000) { attempts.set(ip, { count: 1, started: Date.now() }); return true; }
  entry.count += 1; attempts.set(ip, entry);
  return entry.count <= 10;
}

export function verifyPassword(password, storedHash) {
  if (!storedHash || typeof password !== 'string') return false;
  const [salt, key] = storedHash.split(':');
  if (!salt || !key) return false;
  const derived = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(key, 'hex'), Buffer.from(derived, 'hex'));
}
