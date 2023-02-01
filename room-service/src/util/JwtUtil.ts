import jsonwebtoken from 'jsonwebtoken';
import EnvVars from '../constants/EnvVars';

// **** Variables **** //

// Errors
const Errors = {
  Validation: 'JSON-web-token validation failed.',
} as const;

// Options
const Options = {
  expiresIn: EnvVars.Jwt.Exp,
};

// **** Functions **** //

/**
 * Encrypt data and return jwt.
 */
function sign(data: string | object | Buffer): Promise<string> {
  return new Promise((res, rej) => {
    jsonwebtoken.sign(data, EnvVars.Jwt.Secret, Options, (err, token) => {
      return err ? rej(err) : res(token || '');
    });
  });
}

/**
 * Decrypt JWT and extract client data.
 */
function verify<T>(jwt: string): Promise<string | undefined | T> {
  const parts = jwt.split(' ');
  return new Promise((res, rej) => {
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        jsonwebtoken.verify(credentials, EnvVars.Jwt.Secret, (err, decoded) => {
          return err ? rej(Errors.Validation) : res(decoded as T);
        });
      }
    }
  });
}

// **** Export default **** //

export default {
  sign,
  verify,
} as const;
