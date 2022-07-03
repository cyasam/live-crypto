import React from 'react';
import { Link } from 'react-router-dom';

import styles from './SearchList.module.css';

function SearchList({ assets }) {
  return (
    <>
      {assets?.map((asset) => (
        <div className={styles.item} key={asset.id}>
          <Link to={`/currencies/${asset.id}`}>
            {asset.img_url && (
              <img
                loading="lazy"
                src={asset.img_url}
                width={24}
                height={24}
                alt={asset.name}
                className={styles.image}
              />
            )}
            <p>{asset.name}</p>
          </Link>
        </div>
      ))}
    </>
  );
}

export default SearchList;
