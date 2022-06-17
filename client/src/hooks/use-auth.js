import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../utils/supabase';

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const login = async () => {
    const { error } = await supabase.auth.signIn(
      {
        provider: 'google',
      },
      {
        redirectTo: window.location.href,
      }
    );

    if (error) throw error;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  };

  const getSession = () => {
    return supabase.auth.session();
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          const { data: user } = await axios.get('/api/auth/login', {
            withCredentials: true,
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'X-Supabase-Auth': session?.access_token,
            },
          });

          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          localStorage.removeItem('user');
        }
      }
    );

    return () => authListener.unsubscribe();
  }, []);

  const session = getSession();
  useEffect(() => {
    const localUser = localStorage.getItem('user');
    const user = localUser ? JSON.parse(localUser) : null;

    setUser(user);
  }, [session]);

  return {
    user,
    token: session?.access_token,
    isLoggedIn: !!user,
    login,
    logout,
  };
};

export default useAuth;
