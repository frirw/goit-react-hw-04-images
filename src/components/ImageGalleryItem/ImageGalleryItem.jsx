import { useState } from 'react';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <li className={css.galleryItem} onClick={openModal}>
        <img
          className={css.galleryItemImage}
          src={image.webformatURL}
          alt={image.id}
        />
      </li>
      {isModalOpen && (
        <Modal
          imageUrl={image.largeImageURL}
          alt={image.id}
          close={closeModal}
        />
      )}
    </>
  );
};

export default ImageGalleryItem;
