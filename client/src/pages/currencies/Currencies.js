import { useParams } from 'react-router-dom';
import Modal from '../../components/Modal';

import CurrenciesHeader from './CurrenciesHeader';
import PriceChartContainer from './PriceChartContainer';

import styles from './Currencies.module.css';
import Chat from '../../components/chat/Chat';

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
