import React, { useEffect, useState } from 'react';
import useDebounce from '../../hooks/use-debounce';
import { useSearch } from '../../store/search';

import styles from './SearchForm.module.css';

function SearchForm() {
  const [query, setQuery] = useState('');
  const search = useDebounce(query, 500);
  const toggleSearch = useSearch((state) => state.toggleSearch);
  const setSearch = useSearch((state) => state.setSearch);

  useEffect(() => {
    setSearch(search);
  }, [search, setSearch]);

  return (
    <input
      className={styles.searchFormInput}
      type="search"
      placeholder="Search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onFocus={() => toggleSearch(true)}
    />
  );
}

export default SearchForm;
