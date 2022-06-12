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
    const { error } = await supabase.auth.signIn({
      provider: 'google',
    });

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
    const session = getSession();
    setUser(session?.user?.user_metadata);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') {
          setUser(session?.user?.user_metadata);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => authListener.unsubscribe();
  }, []);

  return {
    userId: getSession()?.user?.id,
    user,
    isLoggedIn: !!user,
    login,
    logout,
  };
};

export default useAuth;
