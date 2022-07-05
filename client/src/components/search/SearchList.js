import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useSearch } from '../../store/search';

import styles from './SearchList.module.css';

function SearchList({ assets }) {
  const [selectedItem, setSelectedItem] = useState(-1);
  const toggleSearch = useSearch((state) => state.toggleSearch);
  const setQuery = useSearch((state) => state.setQuery);
  const setSearch = useSearch((state) => state.setSearch);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (e.keyCode === 40) {
        setSelectedItem((state) => {
          if (state === assets.length - 1) return -1;

          return state >= 0 ? state + 1 : 0;
        });
      } else if (e.keyCode === 38) {
        setSelectedItem((state) => {
          if (state === 0) return -1;

          return state >= 0 ? state - 1 : assets.length - 1;
        });
      } else if (e.keyCode === 13) {
        setQuery(assets[selectedItem].name);
        toggleSearch(false);

        setSearch('');
        navigate(`/currencies/${assets[selectedItem].id}`);
      }
    };

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [assets, navigate, selectedItem, setQuery, toggleSearch, setSearch]);

  return (
    <>
      {assets?.map((asset, index) => (
        <div
          className={classNames(styles.item, {
            [styles.active]: selectedItem === index,
          })}
          key={asset.id}
          onClick={() => {
            setQuery(asset.name);
            toggleSearch(false);
            setSearch('');
            navigate(`/currencies/${asset.id}`);
          }}
        >
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
        </div>
      ))}
    </>
  );
}

export default SearchList;
