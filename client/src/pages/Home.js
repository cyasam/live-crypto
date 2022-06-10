import React from 'react';
import { Outlet } from 'react-router-dom';
import CoinTable from '../components/coin-table/CoinTable';
import { LoadingProvider } from '../context/LoadingContext';

function Home() {
  return (
    <LoadingProvider>
      <CoinTable />
      <Outlet />
    </LoadingProvider>
  );
}

export default Home;
