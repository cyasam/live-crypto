import { BrowserRouter, Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';
import { AuthProvider } from './hooks/use-auth';

import Header from './components/header-area/Header';
import Loading from './components/generic/Loading';

const Home = loadable(() => import('./pages/Home'));
const Currencies = loadable(() => import('./pages/currencies/Currencies'));
const NotFound = loadable(() => import('./pages/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <Header />

          <div className="container">
            <Routes>
              <Route path="/" element={<Home fallback={<Loading />} />}>
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
