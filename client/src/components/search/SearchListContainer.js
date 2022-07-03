import React from 'react';
import useSWR from 'swr';
import { useSearch } from '../../store/search';
import { fetcher } from '../../utils';
import SearchList from './SearchList';

import styles from './SearchListContainer.module.css';

function SearchListContainer() {
  const open = useSearch((state) => state.open);
  const search = useSearch((state) => state.search);
  const toggleSearch = useSearch((state) => state.toggleSearch);

  const { data: searchResults } = useSWR(
    search.length > 0 && `/api/assets?search=${search}&limit=5`,
    fetcher,
    {
      onSuccess: () => {
        toggleSearch(true);
      },
    }
  );

  if (!open) return null;
  if (!searchResults) return null;

  return (
    <div className={styles.container}>
      <SearchList assets={searchResults?.data} />
    </div>
  );
}

export default SearchListContainer;
