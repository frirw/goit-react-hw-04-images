import { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ imageUrl, alt, close }) => {
  useEffect(() => {
    const backDropClose = e => {
      if (e.target.classList.contains(css.overlay)) {
        close();
      }
    };

    const handleEsc = e => {
      e.code === 'Escape' && close();
    };

    document.addEventListener('keydown', handleEsc);
    document.addEventListener('click', backDropClose);

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('click', backDropClose);
    };
  }, [close]);

  return (
    <div className={css.overlay}>
      {' '}
      <div className={css.modalContainer}>
        {' '}
        <img className={css.modalImage} src={imageUrl} alt={alt} />{' '}
      </div>
    </div>
  );
};

export default Modal;
