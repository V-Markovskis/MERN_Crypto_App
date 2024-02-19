import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import supabase from '../config/supabaseClient.ts';

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

  useEffect(() => {
    async function preloadSession() {
      const localStorageToken = localStorage.getItem('sb-cpvlcpdcwwsjyzzfmaxk-auth-token');
      if (localStorageToken) {
        const tokenObject = JSON.parse(localStorageToken);
        const accessToken = tokenObject.access_token;
        const refreshToken = tokenObject.refresh_token;

        if (accessToken && refreshToken) {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
          });

          if (error) {
            console.log('Error login on preload');
          }
        }
      }
    }
    preloadSession();
  }, []);

  return <AuthContext.Provider value={{ session, setSession }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
