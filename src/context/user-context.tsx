'use client';

import * as React from 'react';
import type { User } from '@/lib/types';
import { sampleUser } from '@/lib/placeholder-data';

interface UserContextType {
  user: User;
  updateUser: (newUserDetails: Partial<User>) => void;
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User>(sampleUser);

  const updateUser = (newUserDetails: Partial<User>) => {
    setUser((prevUser) => ({ ...prevUser, ...newUserDetails }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
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
