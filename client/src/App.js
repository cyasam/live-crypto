import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './hooks/use-auth';

import styles from './App.module.css';
import Header from './components/header-area/Header';
import Home from './pages/Home';
import Currencies from './pages/Currencies';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className={styles.app}>
          <Header />

          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/currencies" element={<Currencies />}>
                <Route path=":currencyId" element={<Currencies />} />
              </Route>
              <Route
                path="*"
                element={
                  <main style={{ padding: '1rem' }}>
                    <p>There's nothing here!</p>
                  </main>
                }
              />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
