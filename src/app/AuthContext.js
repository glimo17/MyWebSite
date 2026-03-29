import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { comparePasswordToHash } from '../utils/auth';

const SESSION_STORAGE_KEY = 'portfolio.auth.session';

const AuthContext = createContext(null);

function readStoredSession(configuredUsername) {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const rawSession = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!rawSession) {
      return null;
    }

    const parsedSession = JSON.parse(rawSession);

    if (!parsedSession?.username || parsedSession.username !== configuredUsername) {
      return null;
    }

    return parsedSession;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const configuredUsername = String(process.env.REACT_APP_AUTH_USERNAME ?? '').trim();
  const configuredPasswordHash = String(process.env.REACT_APP_AUTH_PASSWORD_HASH ?? '').trim();
  const hasAuthConfig = Boolean(configuredUsername && configuredPasswordHash);

  const [authUser, setAuthUser] = useState(() => readStoredSession(configuredUsername));

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!hasAuthConfig) {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
      setAuthUser(null);
      return;
    }

    if (!authUser) {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(authUser));
  }, [authUser, hasAuthConfig]);

  useEffect(() => {
    if (!hasAuthConfig) {
      return;
    }

    if (authUser && authUser.username !== configuredUsername) {
      setAuthUser(null);
    }
  }, [authUser, configuredUsername, hasAuthConfig]);

  const login = useCallback(async ({ username, password }) => {
    if (!hasAuthConfig) {
      return {
        ok: false,
        reason: 'missing-config',
      };
    }

    const normalizedUsername = String(username ?? '').trim();
    const isPasswordValid = await comparePasswordToHash(password, configuredPasswordHash);

    if (normalizedUsername !== configuredUsername || !isPasswordValid) {
      return {
        ok: false,
        reason: 'invalid-credentials',
      };
    }

    const nextSession = {
      username: configuredUsername,
      authenticatedAt: new Date().toISOString(),
    };

    setAuthUser(nextSession);

    return {
      ok: true,
      user: nextSession,
    };
  }, [configuredPasswordHash, configuredUsername, hasAuthConfig]);

  const logout = useCallback(() => {
    setAuthUser(null);
  }, []);

  const value = useMemo(
    () => ({
      hasAuthConfig,
      isAuthenticated: Boolean(authUser),
      user: authUser,
      login,
      logout,
    }),
    [authUser, hasAuthConfig, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
