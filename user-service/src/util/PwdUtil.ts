import bcrypt from 'bcrypt';
import crypto from 'crypto';
import fs from 'fs-extra';
import path from 'path';

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
function decryptData<T>(data: Buffer): T {
  const keyPath = path.join(__dirname, '../../private_key.pem');
  const bufferedData = crypto.privateDecrypt(
    {
      key: fs.readFileSync(keyPath, 'utf8'),
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(data)
  );
  const parsedData = bufferedData.toString();
  const dataObject = JSON.parse(parsedData) as T;
  return dataObject;
}
// **** Export Default **** //

export default {
  getHash,
  hashSync,
  compare,
  decryptData,
} as const;
