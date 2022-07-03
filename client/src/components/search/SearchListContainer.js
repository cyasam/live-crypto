import React from 'react';
import useSWR from 'swr';
import { useSearch } from '../../store/search';
import { fetcher } from '../../utils';
import SearchList from './SearchList';

import styles from './SearchListContainer.module.css';

function SearchListContainer() {
  const open = useSearch((state) => state.open);
  const search = useSearch((state) => state.search);

  const { data: searchResults } = useSWR(
    search.length > 2 && `/api/assets?search=${search}&limit=5`,
    fetcher
  );

  if (!open) return null;

  if (!searchResults)
    return (
      <div className={styles.container}>
        <p className={styles.loading}>Loading...</p>
      </div>
    );

  if (searchResults?.data?.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <SearchList assets={searchResults?.data} />
    </div>
  );
}

export default SearchListContainer;
