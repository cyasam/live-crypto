import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { processOneData } from '../../utils';
import SupplyPrice from '../SupplyPrice';
import styles from './CoinTableRow.module.css';
import PercentageArea from '../percentage-area/PercentageArea';
import PriceArea from '../price-area/PriceArea';
import Price from '../price-area/Price';

function CoinTableRow({ asset }) {
  const navigate = useNavigate();

  asset = processOneData(asset);

  const price = asset.priceUsd;
  const image_url = asset.img_url;

  return (
    <tr
      className={styles.tbodytr}
      key={asset.id}
      onClick={() => navigate(`/currencies/${asset.id}`)}
    >
      <td className={classNames(styles.td, styles.rank)}>{asset.rank}</td>
      <td className={classNames(styles.td, styles.name)}>
        <div className={styles.namearea}>
          <img
            loading="lazy"
            src={image_url}
            width={30}
            height={30}
            alt={asset.name}
            className={styles.image}
          />
          <div className={styles.nameblock}>
            <span>{asset.name}</span>
            <span className={styles.symbol}>{asset.symbol}</span>
          </div>
        </div>
      </td>
      <td className={styles.td}>
        <PriceArea id={asset.id} value={price} color="rgb(23, 25, 36)" />
      </td>
      <td className={styles.td}>
        <Price value={asset.marketCapUsd} />
      </td>
      <td className={styles.td}>
        <Price value={asset.volumeUsd24Hr} />
      </td>
      <td className={styles.td}>
        <SupplyPrice
          value={asset.supply}
          symbol={asset.symbol}
          max={asset.maxSupply}
        />
      </td>
      <td className={styles.td}>
        <PercentageArea
          id={asset.id}
          value={price}
          price24hUsd={asset.price24hUsd}
        />
      </td>
    </tr>
  );
}

export default CoinTableRow;
