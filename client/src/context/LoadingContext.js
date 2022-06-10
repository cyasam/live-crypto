import { createContext, useState } from 'react';
import Loading from '../components/Loading';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const setLoadingStatus = (status) => {
    setLoading(status);
  };

  return (
    <LoadingContext.Provider value={{ loading, setLoadingStatus }}>
      <div style={{ position: 'relative' }}>
        {loading && (
          <div style={{ dislay: 'flex', alignItems: 'center', height: 300 }}>
            <Loading />
          </div>
        )}
        <div style={{ display: loading ? 'none' : 'inherit' }}>{children}</div>
      </div>
    </LoadingContext.Provider>
  );
};

export default LoadingContext;
