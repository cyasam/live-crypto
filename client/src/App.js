import CoinTable from './components/CoinTable';
import { AuthProvider } from './hooks/use-auth';

import styles from './App.module.css';
import Header from './components/header-area/Header';

function App() {
  return (
    <AuthProvider>
      <div className={styles.app}>
        <Header />

        <div className="container">
          <CoinTable />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
