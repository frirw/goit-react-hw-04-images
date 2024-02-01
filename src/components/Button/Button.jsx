import React from 'react';
import css from './Button.module.css';

const Button = ({ handleLoad }) => {
  return (
    <button className={css.loadMoreButton} onClick={handleLoad}>
      Load More
    </button>
  );
};

export default Button;
