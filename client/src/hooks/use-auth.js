import { createContext, useContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

const isExpired = (loginTime, expiresTime) => {
  return expiresTime && new Date().getTime() > loginTime + expiresTime;
};

const isLoggedIn = () => {
  return localStorage.getItem('token') || localStorage.getItem('logintime');
};

const removeSession = (callback) => {
  localStorage.removeItem('token');
  localStorage.removeItem('logintime');

  if (typeof callback === 'function') callback();
};

const createSession = (token, loginTime) => {
  localStorage.setItem('token', token);
  localStorage.setItem('logintime', loginTime);
};

const checkAuth = () => {
  const existedToken = localStorage.getItem('token');
  const existedLoginTime = localStorage.getItem('logintime');

  if (!existedToken || !existedLoginTime) {
    removeSession();
  }

  return {
    existedToken,
    existedLoginTime,
  };
};

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProvideAuth = () => {
  const { existedToken, existedLoginTime } = checkAuth();

  const [loginTime, setLoginTime] = useState(() => {
    return existedLoginTime && Number(existedLoginTime);
  });
  const [token, setToken] = useState(existedToken);

  const login = (token) => {
    const time = new Date().getTime();
    setToken(token);
    setLoginTime(time);
    createSession(token, time);
  };

  const logout = () => {
    removeSession(() => {
      setToken(null);
      setLoginTime(null);
    });
  };

  const user = token ? jwt_decode(token) : null;
  const expiresTime = user ? (user?.exp - user?.iat) * 1000 : null;

  useEffect(() => {
    isExpired(loginTime, expiresTime) && logout();
  }, [loginTime, user, expiresTime]);

  return {
    user: user && {
      email: user.email,
      name: user.name,
      picture: user.picture,
      expiresDate: loginTime + expiresTime,
    },
    isLoggedIn,
    login,
    logout,
  };
};

export default useAuth;
