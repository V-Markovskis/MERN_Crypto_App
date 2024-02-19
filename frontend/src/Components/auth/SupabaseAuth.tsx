import { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import supabase from '../../config/supabaseClient.ts';
import { useAuth } from '../../context/auth-context.tsx';
import { Result } from 'antd';

export async function handleLogout() {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
  }
}

export default function SupabaseAuth() {
  const { session, setSession } = useAuth();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]} />;
  } else {
    return (
      <Result
        status="success"
        title="You have successfully logged in!"
        subTitle="Now you can delete and edit assets. You can close this window."
      />
    );
  }
}
