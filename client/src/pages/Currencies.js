import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import Loading from '../components/Loading';
import Price from '../components/Price';
import usePriceSocket from '../hooks/use-price-socket';
import { fetcher, processOneData } from '../utils';

function Currencies() {
  const params = useParams();
  const { currencyId } = params;

  const { data: asset, error } = useSWR(`/api/assets/${currencyId}`, fetcher, {
    refreshInterval: 60 * 1000,
  });

  const { changes } = usePriceSocket(currencyId);

  if (!asset) return <Loading />;

  if (error) return <div>Failed to Load.</div>;

  const currency = processOneData(asset.data, changes);

  return (
    <div>
      Currencies:{' '}
      <Price
        key={currency.priceUsd}
        value={currency.priceUsd}
        changeDirection={currency.changed}
      />
    </div>
  );
}

export default Currencies;
