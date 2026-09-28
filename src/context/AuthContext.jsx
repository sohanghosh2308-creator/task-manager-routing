import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  generateJwtToken, 
  decodeJwtToken, 
  verifyJwtToken, 
  tamperJwtToken, 
  expireJwtToken 
} from '../utils/jwt';

const AuthContext = createContext();

const DEFAULT_USER = {
  name: 'Sohan Ghosh',
  username: 'sohanghosh',
  title: 'Sohan Ghosh (Chief Architect)',
  id: 'AEGIS-089',
  role: 'Chief Security & Systems Architect',
  clearance: 'Alpha Clearance [L5]',
  email: 'sohan.ghosh@aegis.core',
  avatarInitials: 'SG'
};

export const AuthProvider = ({ children }) => {
  // Clean up legacy storage keys from previous builds
  useEffect(() => {
    try {
      ['legacy_auth_user', 'legacy_auth_state', 'legacy_jwt_token', 'synapse_auth_user', 'synapse_auth_state'].forEach(k => localStorage.removeItem(k));
    } catch {
      // ignore
    }
  }, []);

  // Determine initial rememberMe preference
  const [rememberMe, setRememberMe] = useState(() => {
    try {
      const saved = localStorage.getItem('aegis_remember_me');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // Load initial token from localStorage or sessionStorage
  const [jwtToken, setJwtToken] = useState(() => {
    try {
      const localToken = localStorage.getItem('aegis_jwt_token');
      if (localToken) return localToken;
      const sessionToken = sessionStorage.getItem('aegis_jwt_token');
      if (sessionToken) return sessionToken;

      // Generate a default active token for Sohan Ghosh on initial start
      const token = generateJwtToken(DEFAULT_USER, 3600);
      localStorage.setItem('aegis_jwt_token', token);
      localStorage.setItem('aegis_auth_user', JSON.stringify(DEFAULT_USER));
      return token;
    } catch {
      return generateJwtToken(DEFAULT_USER, 3600);
    }
  });

  // Authenticated state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (!jwtToken) return false;
    const verification = verifyJwtToken(jwtToken);
    return verification.valid;
  });

  // Current active user
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('aegis_auth_user') || sessionStorage.getItem('aegis_auth_user');
      if (savedUser) return JSON.parse(savedUser);
      return DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [tokenError, setTokenError] = useState(null);
  const [tokenDetails, setTokenDetails] = useState(() => decodeJwtToken(jwtToken));

  // Sync token state and storage
  const persistTokenAndUser = useCallback((token, userData, remember) => {
    try {
      if (remember) {
        localStorage.setItem('aegis_jwt_token', token);
        localStorage.setItem('aegis_auth_user', JSON.stringify(userData));
        localStorage.setItem('aegis_remember_me', 'true');
        sessionStorage.removeItem('aegis_jwt_token');
        sessionStorage.removeItem('aegis_auth_user');
      } else {
        sessionStorage.setItem('aegis_jwt_token', token);
        sessionStorage.setItem('aegis_auth_user', JSON.stringify(userData));
        localStorage.removeItem('aegis_jwt_token');
        localStorage.removeItem('aegis_auth_user');
        localStorage.setItem('aegis_remember_me', 'false');
      }
    } catch (e) {
      console.warn('Storage sync warning:', e);
    }
  }, []);

  // Update token details and check validity periodically
  useEffect(() => {
    if (!jwtToken) {
      setTokenDetails(null);
      setIsAuthenticated(false);
      return;
    }

    const verification = verifyJwtToken(jwtToken);
    if (!verification.valid) {
      setIsAuthenticated(false);
      setTokenError(verification.reason || 'Token invalid');
    } else {
      setIsAuthenticated(true);
      setTokenError(null);
    }

    setTokenDetails(decodeJwtToken(jwtToken));

    // Live countdown timer for token expiry
    const timer = setInterval(() => {
      const decoded = decodeJwtToken(jwtToken);
      if (!decoded) {
        setIsAuthenticated(false);
        setTokenError('Malformed JWT token structure');
        return;
      }

      setTokenDetails(decoded);

      if (decoded.isExpired) {
        setIsAuthenticated(false);
        setTokenError('JWT Token expired. Clearance automatically revoked.');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [jwtToken]);

  /**
   * Login operative with credentials, rememberMe setting, and role
   */
  const login = ({ username, role = 'Chief Security & Systems Architect', remember = true } = {}) => {
    const operativeName = 'Sohan Ghosh';
    const updatedUser = {
      ...DEFAULT_USER,
      username: username || 'sohanghosh',
      name: operativeName,
      title: `${operativeName} (${role.includes('Architect') ? 'Chief Architect' : 'Operative'})`,
      role: role || 'Chief Security & Systems Architect',
      clearance: 'Alpha Clearance [L5]'
    };

    // Generate fresh JWT token valid for 1 hour (3600 seconds)
    const newToken = generateJwtToken(updatedUser, 3600);

    setUser(updatedUser);
    setRememberMe(remember);
    setJwtToken(newToken);
    setIsAuthenticated(true);
    setTokenError(null);

    persistTokenAndUser(newToken, updatedUser, remember);
    return { success: true, token: newToken, user: updatedUser };
  };

  /**
   * Logout and revoke clearance
   */
  const logout = () => {
    setIsAuthenticated(false);
    setJwtToken('');
    setTokenDetails(null);
    setTokenError(null);

    try {
      localStorage.removeItem('aegis_jwt_token');
      localStorage.removeItem('aegis_auth_user');
      sessionStorage.removeItem('aegis_jwt_token');
      sessionStorage.removeItem('aegis_auth_user');
    } catch {
      // ignore
    }
  };

  /**
   * Refresh JWT token (simulating POST /api/auth/refresh)
   */
  const refreshToken = () => {
    if (!user) return false;
    const freshToken = generateJwtToken(user, 3600); // Reset to 1 hour
    setJwtToken(freshToken);
    persistTokenAndUser(freshToken, user, rememberMe);
    return true;
  };

  /**
   * Simulate a tampered token to test route security
   */
  const simulateTamper = () => {
    if (!jwtToken) return;
    const tampered = tamperJwtToken(jwtToken);
    setJwtToken(tampered);
  };

  /**
   * Simulate an expired token to test automatic logout & route protection
   */
  const simulateExpire = () => {
    if (!jwtToken) return;
    const expired = expireJwtToken(jwtToken);
    setJwtToken(expired);
  };

  const [isJwtModalOpen, setIsJwtModalOpen] = useState(false);
  const openJwtModal = () => setIsJwtModalOpen(true);
  const closeJwtModal = () => setIsJwtModalOpen(false);

  const tokenStatus = !jwtToken 
    ? 'none' 
    : tokenError?.includes('expired') 
      ? 'expired' 
      : tokenError 
        ? 'tampered' 
        : 'valid';

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      jwtToken,
      tokenDetails,
      tokenStatus,
      tokenError,
      rememberMe,
      setRememberMe,
      isJwtModalOpen,
      openJwtModal,
      closeJwtModal,
      login,
      logout,
      refreshToken,
      simulateTamper,
      simulateExpire
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
