import React, { useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../utils';

import usePriceSocket from '../../hooks/use-price-socket';
import CoinPageLoader from './CoinPageLoader';
import CoinTableRow from './CoinTableRow';

import coinMaps from '../../coin_map.json';

function CoinPage({ page, onSuccess, onLoading, onError, limit }) {
  const urlSearchParams = { limit, offset: (page - 1) * limit };

  const params = new URLSearchParams(urlSearchParams);
  const queryString = params.toString();

  const { data: assets, error } = useSWR(
    `/api/assets${queryString && `?${queryString}`}`,
    fetcher,
    {
      refreshInterval: 60 * 1000,
      onSuccess() {
        onSuccess();
      },
    }
  );

  const selectedAssets = assets?.data.map((asset) => asset.id);
  const socketParams = selectedAssets?.join(',') ?? null;

  usePriceSocket(socketParams);

  useEffect(() => {
    !assets && onLoading();
  }, [assets, onLoading]);

  useEffect(() => {
    error && onError();
  }, [error, onError]);

  if (!assets) return <CoinPageLoader />;

  return (
    <>
      {assets.data.map((asset) => {
        const coinMap = coinMaps.find((coin) => coin.symbol === asset.symbol);
        return <CoinTableRow key={asset.id} asset={asset} coinMap={coinMap} />;
      })}
    </>
  );
}

export default CoinPage;
