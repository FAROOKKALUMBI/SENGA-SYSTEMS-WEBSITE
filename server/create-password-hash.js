import crypto from 'crypto';

const password = process.argv[2];
if (!password || password.length < 12) {
  console.error('Usage: node server/create-password-hash.js "a-strong-password" (12+ characters)');
  process.exit(1);
}
const salt = crypto.randomBytes(16).toString('hex');
const key = crypto.scryptSync(password, salt, 64).toString('hex');
console.log(`${salt}:${key}`);
