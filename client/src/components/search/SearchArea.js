import React, { useEffect, useRef } from 'react';
import SearchForm from './SearchForm';

import styles from './SearchArea.module.css';
import SearchListContainer from './SearchListContainer';
import { useLocation } from 'react-router-dom';
import { useSearch } from '../../store/search';

function SearchArea() {
  const location = useLocation();
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

  useEffect(() => {
    toggleSearch(false);
  }, [location, toggleSearch]);

  return (
    <div className={styles.container} ref={containerRef}>
      <SearchForm />
      <SearchListContainer />
    </div>
  );
}

export default SearchArea;
