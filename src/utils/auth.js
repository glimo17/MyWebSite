export async function sha256Hex(value) {
  const input = String(value ?? '');

  if (!window.crypto?.subtle) {
    throw new Error('Web Crypto is not available in this browser.');
  }

  const encoded = new TextEncoder().encode(input);
  const buffer = await window.crypto.subtle.digest('SHA-256', encoded);

  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export async function comparePasswordToHash(password, expectedHash) {
  const normalizedExpectedHash = String(expectedHash ?? '').trim().toLowerCase();

  if (!normalizedExpectedHash) {
    return false;
  }

  const computedHash = await sha256Hex(password);
  return computedHash === normalizedExpectedHash;
}
