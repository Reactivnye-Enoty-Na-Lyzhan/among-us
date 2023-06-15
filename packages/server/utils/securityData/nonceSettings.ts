import * as crypto from 'crypto';

export const nonce = () => crypto.randomBytes(16).toString('base64');
