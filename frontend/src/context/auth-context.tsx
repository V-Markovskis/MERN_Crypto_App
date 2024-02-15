import React, { createContext, useContext, useState } from 'react';
import type { Session } from '@supabase/supabase-js';

const AuthContext = createContext({
  session: {} as Session | null,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  setSession: (session: Session | null) => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  return <AuthContext.Provider value={{ session, setSession }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
