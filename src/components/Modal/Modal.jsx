import { useEffect } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

const ModalContainer = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
`;

const Modal = ({ imageUrl, alt, close }) => {
  useEffect(() => {
    const backDropClose = e => {
      if (e.target.classList.contains('overlay')) {
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
    <Overlay className="overlay">
      <ModalContainer className="modal">
        <ModalImage src={imageUrl} alt={alt} />
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
