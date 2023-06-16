import { randomBytes } from 'crypto';

export const nonce = () => randomBytes(16).toString('base64');
