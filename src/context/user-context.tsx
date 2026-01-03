'use client';

import * as React from 'react';
import type { User } from '@/lib/types';
import { sampleUser } from '@/lib/placeholder-data';

interface UserContextType {
  user: User;
  updateUser: (newUserDetails: Partial<User>) => void;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

// A default user for the logged-out state
const defaultUser: User = {
  id: '',
  fullName: 'Guest',
  email: '',
  role: 'user',
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User>(defaultUser);

  const updateUser = (newUserDetails: Partial<User>) => {
    setUser((prevUser) => ({ ...prevUser, ...newUserDetails }));
  };

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(defaultUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
