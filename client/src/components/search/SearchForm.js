import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSearch } from '../../store/search';

import styles from './SearchForm.module.css';

function SearchForm() {
  const query = useSearch((state) => state.query);
  const toggleSearch = useSearch((state) => state.toggleSearch);
  const setQuery = useSearch((state) => state.setQuery);
  const setSearch = useSearch((state) => state.setSearch);
  const location = useLocation();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.blur();
  }, [location, toggleSearch]);

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        className={styles.input}
        type="search"
        placeholder="Search"
        value={query}
        onChange={(e) => {
          const value = e.target.value;
          setQuery(value);
          setSearch(value);
          toggleSearch(true);
        }}
        onFocus={() => {
          toggleSearch(true);
        }}
      />
      <svg
        className={styles.icon}
        width="20"
        height="21"
        viewBox="0 0 20 21"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.7479 18.579L14.0096 12.8366C15.1409 11.4799 15.8213 9.74609 15.8213 7.85245C15.8213 3.53234 12.2758 0.0196838 7.91475 0.0196838C3.55364 0.0196838 0 3.53644 0 7.85655C0 12.1767 3.54545 15.6893 7.90655 15.6893C9.7592 15.6893 11.4643 15.054 12.8169 13.9924L18.5757 19.7512C18.9118 20.0873 19.4118 20.0873 19.7479 19.7512C20.084 19.4151 20.084 18.9151 19.7479 18.579ZM1.6805 7.85655C1.6805 4.46276 4.47587 1.70428 7.90655 1.70428C11.3372 1.70428 14.1326 4.46276 14.1326 7.85655C14.1326 11.2503 11.3372 14.0088 7.90655 14.0088C4.47587 14.0088 1.6805 11.2462 1.6805 7.85655Z"
          fill="black"
        />
      </svg>
    </div>
  );
}

export default SearchForm;
