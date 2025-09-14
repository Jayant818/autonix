import * as crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const KEY = crypto.scryptSync(
  process.env.CREDENTIALS_ENCRYPTION_KEY,
  'salt',
  32,
);

export function encrypt(text: string): {
  content: string;
  iv: string;
  tag: string;
} {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

  const encrypted = Buffer.concat([
    cipher.update(text, 'utf8'),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return {
    content: encrypted.toString('hex'),
    iv: iv.toString('hex'),
    tag: tag.toString('hex'),
  };
}

export function decrypt(encrypted: {
  content: string;
  iv: string;
  tag: string;
}): string {
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    KEY,
    Buffer.from(encrypted.iv, 'hex'),
  );
  decipher.setAuthTag(Buffer.from(encrypted.tag, 'hex'));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encrypted.content, 'hex')),
    decipher.final(),
  ]);

  return decrypted.toString('utf8');
}
