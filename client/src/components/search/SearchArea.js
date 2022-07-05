import React, { useEffect, useRef } from 'react';
import SearchForm from './SearchForm';

import styles from './SearchArea.module.css';
import SearchListContainer from './SearchListContainer';
import { useSearch } from '../../store/search';

function SearchArea() {
  const query = useSearch((state) => state.query);
  const toggleSearch = useSearch((state) => state.toggleSearch);

  const containerRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!containerRef.current.contains(event.target)) {
        toggleSearch(false);
      }
    };
    document.addEventListener('mousedown', handler);

    return () => document.removeEventListener('mousedown', handler);
  });

  return (
    <div className={styles.container} ref={containerRef}>
      <SearchForm />

      {query.length > 2 && <SearchListContainer />}
    </div>
  );
}

export default SearchArea;
