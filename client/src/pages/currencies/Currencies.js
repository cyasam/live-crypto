import { useParams } from 'react-router-dom';
import loadable from '@loadable/component';

import Modal from '../../components/generic/Modal';
import CurrenciesHeader from './CurrenciesHeader';

import styles from './Currencies.module.css';
import Chat from '../../components/chat/Chat';

const PriceChartContainer = loadable(() => import('./PriceChartContainer'));

function Currencies() {
  const params = useParams();
  const { currencyId } = params;

  return (
    <Modal backUrl="/">
      <div className="page">
        <CurrenciesHeader currencyId={currencyId} />
        <div className={styles.row}>
          <div className={styles.colchart}>
            <PriceChartContainer currencyId={currencyId} />
          </div>
          <div className={styles.colchat}>
            <Chat room={currencyId} />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Currencies;
