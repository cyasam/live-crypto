import React from 'react';
import { Outlet } from 'react-router-dom';
import CoinTable from '../components/coin-table/CoinTable';

function Home() {
  return (
    <>
      <CoinTable />
      <Outlet />
    </>
  );
}

export default Home;
