import bcrypt from 'bcrypt';
import crypto from 'crypto';
import fs from 'fs-extra';

// **** Variables **** //

const SALT_ROUNDS = 12;

// **** Functions **** //

/**
 * Get a hash from the password.
 */
function getHash(pwd: string): Promise<string> {
  return bcrypt.hash(pwd, SALT_ROUNDS);
}

/**
 * Useful for testing.
 */
function hashSync(pwd: string): string {
  return bcrypt.hashSync(pwd, SALT_ROUNDS);
}

/**
 * See if a password passes the hash.
 */
function compare(pwd: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pwd, hash);
}

/**
 * Decrypt data
 */
function decryptData(data: NodeJS.ArrayBufferView) {
  return crypto.privateDecrypt(
    {
      key: fs.readFileSync('../private_key.pem', 'utf8'),
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    data
  );
}
// **** Export Default **** //

export default {
  getHash,
  hashSync,
  compare,
  decryptData,
} as const;
