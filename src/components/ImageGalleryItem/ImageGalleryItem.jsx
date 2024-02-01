import { useState } from 'react';
import Modal from '../Modal/Modal';
import styled from 'styled-components';

const GalleryItem = styled.li`
  border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

const GalleryItemImage = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.03);
    cursor: zoom-in;
  }
`;

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
      <GalleryItem onClick={openModal}>
        <GalleryItemImage src={image.webformatURL} alt={image.id} />
      </GalleryItem>
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
