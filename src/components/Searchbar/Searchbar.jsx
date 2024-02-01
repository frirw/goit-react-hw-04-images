import { useState } from 'react';
import Notiflix from 'notiflix';
import css from './Searchbar.module.css';

const Searchbar = ({ submit }) => {
  const [query, setQuery] = useState('');

  const handleChange = evt => {
    setQuery(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (query.trim() === '') {
      Notiflix.Notify.warning('Please, fill in the field!');
      return;
    }
    submit(query);
  };

  return (
    <header className={css.searchbarWrapper}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchFormButton}></button>
        <input
          type="text"
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={css.searchInput}
        />
      </form>
    </header>
  );
};

export default Searchbar;
