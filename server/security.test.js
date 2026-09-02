import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'crypto';
import { isEmail, isMessage, isName, isPhone, verifyPassword } from './security.js';

test('input validators accept valid public form data and reject invalid values', () => {
  assert.equal(isEmail('user+test@example.com'), true);
  assert.equal(isEmail('abc@.com'), false);
  assert.equal(isName("Anne-Marie O'Brien"), true);
  assert.equal(isName('A1'), false);
  assert.equal(isPhone('+265 (888) 539-882'), true);
  assert.equal(isPhone('call-me'), false);
  assert.equal(isMessage('This is a meaningful enquiry.'), true);
  assert.equal(isMessage('hi'), false);
});

test('password hash verification uses a constant-time comparison', () => {
  const salt = 'test-salt';
  const hash = crypto.scryptSync('AsecurePassword123', salt, 64).toString('hex');
  assert.equal(verifyPassword('AsecurePassword123', `${salt}:${hash}`), true);
  assert.equal(verifyPassword('wrong-password', `${salt}:${hash}`), false);
});
