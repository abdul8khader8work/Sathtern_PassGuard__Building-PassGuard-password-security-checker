import { HIBP_RANGE_URL, BREACH_FETCH_TIMEOUT_MS } from './constants';
import type { BreachResult } from './types';

async function sha1Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

export async function checkBreach(password: string): Promise<BreachResult> {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return { status: 'error', message: 'Breach lookup unavailable offline.' };
  }

  // crypto.subtle requires a secure context; fail gracefully otherwise
  if (typeof crypto === 'undefined' || !crypto.subtle) {
    return { status: 'error', message: 'Breach lookup unavailable. Try again later.' };
  }

  const hash = await sha1Hex(password);
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), BREACH_FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(`${HIBP_RANGE_URL}${prefix}`, {
      signal: controller.signal,
      headers: { 'Add-Padding': 'true' },
    });
    if (!response.ok) {
      return { status: 'error', message: 'Breach lookup unavailable. Try again later.' };
    }
    const text = await response.text();
    const found = text
      .split('\n')
      .some((line) => line.split(':')[0].trim().toUpperCase() === suffix);

    return found
      ? { status: 'breached', message: 'This password appears in known data breaches. Do not use it.' }
      : { status: 'safe', message: 'No match found in the checked breach dataset.' };
  } catch {
    return { status: 'error', message: 'Breach lookup unavailable. Try again later.' };
  } finally {
    clearTimeout(timeoutId);
  }
}