import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const saved = localStorage.getItem('synapse_auth_state');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      localStorage.removeItem('nexus_auth_user');
      localStorage.removeItem('nexus_auth_state');
    } catch {
      // ignore
    }

    const defaultUser = {
      name: 'Sohan Ghosh',
      title: 'Sohan Ghosh (Architect)',
      id: 'SYNAPSE-089',
      role: 'Lead Core Systems Engineer',
      clearance: 'Alpha Clearance [L5]',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    };

    try {
      localStorage.setItem('synapse_auth_user', JSON.stringify(defaultUser));
    } catch {
      // ignore
    }
    return defaultUser;
  });

  useEffect(() => {
    try {
      localStorage.removeItem('nexus_auth_user');
      localStorage.removeItem('nexus_auth_state');
      localStorage.setItem('synapse_auth_state', JSON.stringify(isAuthenticated));
      localStorage.setItem('synapse_auth_user', JSON.stringify(user));
    } catch {
      // ignore
    }
  }, [isAuthenticated, user]);

  const login = (userData = null) => {
    setIsAuthenticated(true);
    const updated = {
      name: 'Sohan Ghosh',
      title: 'Sohan Ghosh (Architect)',
      id: 'SYNAPSE-089',
      ...(userData || {})
    };
    setUser(updated);
    try {
      localStorage.setItem('synapse_auth_user', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const toggleAuth = () => {
    setIsAuthenticated(prev => !prev);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, toggleAuth }}>
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
