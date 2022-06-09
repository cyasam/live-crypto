import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './hooks/use-auth';

import styles from './App.module.css';
import Header from './components/header-area/Header';
import Home from './pages/Home';
import Currencies from './pages/Currencies';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className={styles.app}>
          <Header />

          <div className="container">
            <Routes>
              <Route path="/" element={<Home />}>
                <Route path="currencies/:currencyId" element={<Currencies />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
