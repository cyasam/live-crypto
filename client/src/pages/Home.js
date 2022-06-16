import loadable from '@loadable/component';
import React from 'react';
import { Outlet } from 'react-router-dom';

const CoinTable = loadable(() => import('../components/coin-table/CoinTable'));

function Home() {
  return (
    <>
      <CoinTable />
      <Outlet />
    </>
  );
}

export default Home;
