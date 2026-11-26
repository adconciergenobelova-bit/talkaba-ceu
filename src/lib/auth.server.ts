import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { getProjectRoot } from './events-store';

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'talkaba_secret_salt_2026_super_secure';

function getAuthFilePaths(): string[] {
  const root = getProjectRoot();
  return [path.join(root, 'src', 'data', 'auth-config.json')];
}

export async function getStoredPassword(): Promise<string> {
  const paths = getAuthFilePaths();
  for (const filePath of paths) {
    try {
      if (fsSync.existsSync(filePath)) {
        const raw = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(raw);
        if (data.password) {
          return data.password;
        }
      }
    } catch (err) {
      // Continue
    }
  }
  return 'TalkABA#Organizer2026';
}

export async function setStoredPassword(newPassword: string): Promise<boolean> {
  const paths = getAuthFilePaths();
  const content = JSON.stringify({ password: newPassword }, null, 2);
  let written = false;

  for (const filePath of paths) {
    try {
      const dir = path.dirname(filePath);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(filePath, content, 'utf-8');
      written = true;
    } catch (err) {
      console.error(`Error saving new password to ${filePath}:`, err);
    }
  }

  return written;
}

export function generateSessionToken(password: string): string {
  const timestamp = Date.now();
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(`${password}:${timestamp}`)
    .digest('hex');
  return Buffer.from(`${timestamp}:${signature}`).toString('base64');
}

export async function verifySessionToken(token: string | null | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [timestampStr, signature] = decoded.split(':');
    const timestamp = parseInt(timestampStr, 10);

    // Expire session after 7 days
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - timestamp > SEVEN_DAYS) {
      return false;
    }

    const currentPassword = await getStoredPassword();
    const expectedSig = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(`${currentPassword}:${timestamp}`)
      .digest('hex');

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig));
  } catch (error) {
    return false;
  }
}
