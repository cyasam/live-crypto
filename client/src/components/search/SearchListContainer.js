import classNames from 'classnames';
import React from 'react';
import useSWR from 'swr';
import { useSearch } from '../../store/search';
import { fetcher } from '../../utils';
import SearchList from './SearchList';

import styles from './SearchListContainer.module.css';

function SearchListContainer() {
  const open = useSearch((state) => state.open);
  const query = useSearch((state) => state.query);
  const search = useSearch((state) => state.search);

  const { data: searchResults } = useSWR(
    search.length > 0 && `/api/assets?search=${query}&limit=5`,
    fetcher,
    { revalidateOnFocus: false }
  );

  if (search.length === 0) return null;

  if (!searchResults)
    return (
      <div className={classNames(styles.container, { [styles.hide]: !open })}>
        <p className={styles.loading}>Loading...</p>
      </div>
    );

  if (searchResults?.data?.length === 0) {
    return null;
  }

  return (
    <div className={classNames(styles.container, { [styles.hide]: !open })}>
      <SearchList assets={searchResults?.data} />
    </div>
  );
}

export default SearchListContainer;
