/**
 * AEGIS Cryptographic JWT Simulation Engine
 * Assignment 7: Authentication System
 * Operative Lead: Sohan Ghosh
 * 
 * Simulates real RFC 7519 JSON Web Tokens (Header.Payload.Signature)
 * using Base64URL encoding, payload decoding, cryptographic signature simulation,
 * token verification, and expiration tracking.
 */

// Helper to encode string to Base64URL
export const base64UrlEncode = (str) => {
  try {
    const base64 = btoa(unescape(encodeURIComponent(str)));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (e) {
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
};

// Helper to decode Base64URL to string
export const base64UrlDecode = (base64Url) => {
  try {
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    return decodeURIComponent(escape(atob(base64)));
  } catch (e) {
    try {
      return atob(base64Url);
    } catch {
      return null;
    }
  }
};

// Simple deterministic hash to simulate HMAC-SHA256 signature
const simulateHmacSignature = (data, secret = 'aegis-quantum-secret-2026') => {
  let hash = 0;
  const combined = data + ':' + secret;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0') + 
              (Math.abs(hash * 31)).toString(16).padStart(8, '0') + 
              'aegis_sig_valid';
  return base64UrlEncode(hex);
};

/**
 * Generate a simulated JWT token
 * @param {Object} user - User information
 * @param {number} expiresInSeconds - Token lifetime in seconds (default 3600 = 1 hour)
 * @returns {string} The simulated JWT token
 */
export const generateJwtToken = (user, expiresInSeconds = 3600) => {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
    iss: 'AEGIS_AUTH_GATEWAY'
  };

  const nowInSeconds = Math.floor(Date.now() / 1000);
  const payload = {
    sub: user.id || 'AEGIS-OPERATIVE-007',
    name: user.name || 'Sohan Ghosh',
    username: user.username || 'sohanghosh',
    role: user.role || 'Chief Security Architect',
    clearance: user.clearance || 'Alpha Clearance [L5]',
    email: user.email || 'sohan.ghosh@aegis.core',
    iat: nowInSeconds,
    exp: nowInSeconds + expiresInSeconds,
    iss: 'aegis-auth-sentinel',
    jti: 'jti_' + Math.random().toString(36).substring(2, 10)
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = simulateHmacSignature(`${encodedHeader}.${encodedPayload}`);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

/**
 * Safely parse and decode a JWT token into its parts
 * @param {string} token 
 * @returns {Object|null}
 */
export const decodeJwtToken = (token) => {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    const headerStr = base64UrlDecode(parts[0]);
    const payloadStr = base64UrlDecode(parts[1]);

    if (!headerStr || !payloadStr) return null;

    const header = JSON.parse(headerStr);
    const payload = JSON.parse(payloadStr);
    const signature = parts[2];

    const now = Math.floor(Date.now() / 1000);
    const isExpired = payload.exp ? now >= payload.exp : false;
    const remainingSeconds = payload.exp ? Math.max(0, payload.exp - now) : 0;

    return {
      header,
      payload,
      signature,
      rawHeader: parts[0],
      rawPayload: parts[1],
      rawSignature: parts[2],
      isExpired,
      remainingSeconds
    };
  } catch (e) {
    return null;
  }
};

/**
 * Verify a simulated JWT token's integrity and expiration
 * @param {string} token 
 * @returns {{ valid: boolean, reason?: string, decoded?: Object }}
 */
export const verifyJwtToken = (token) => {
  if (!token) {
    return { valid: false, reason: 'Token missing' };
  }

  const decoded = decodeJwtToken(token);
  if (!decoded) {
    return { valid: false, reason: 'Malformed JWT structure' };
  }

  // Check expiration
  if (decoded.isExpired) {
    return { valid: false, reason: 'Token expired', decoded };
  }

  // Check signature
  const expectedSignature = simulateHmacSignature(`${decoded.rawHeader}.${decoded.rawPayload}`);
  if (decoded.signature !== expectedSignature) {
    return { valid: false, reason: 'Invalid or tampered signature', decoded };
  }

  return { valid: true, decoded };
};

/**
 * Create a tampered version of a token for demonstration/testing
 */
export const tamperJwtToken = (token) => {
  if (!token) return token;
  const parts = token.split('.');
  if (parts.length !== 3) return token;

  // Corrupt the signature by appending bad bytes
  return `${parts[0]}.${parts[1]}.${parts[2]}_TAMPERED`;
};

/**
 * Force-expire a token for demonstration/testing
 */
export const expireJwtToken = (token) => {
  const decoded = decodeJwtToken(token);
  if (!decoded) return token;

  // Modify exp to 10 seconds in the past
  const expiredPayload = {
    ...decoded.payload,
    exp: Math.floor(Date.now() / 1000) - 10
  };

  const encodedHeader = decoded.rawHeader;
  const encodedPayload = base64UrlEncode(JSON.stringify(expiredPayload));
  const signature = simulateHmacSignature(`${encodedHeader}.${encodedPayload}`);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};
