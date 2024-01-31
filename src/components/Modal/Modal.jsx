import { Component } from 'react';
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

class Modal extends Component {
  backDropClose = e => {
    if (e.target.classList.contains('overlay')) {
      this.props.close();
    }
  };

  handleEsc = e => {
    e.code === 'Escape' && this.props.close();
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc);
    document.addEventListener('click', this.backDropClose);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
    document.removeEventListener('click', this.backDropClose);
  }

  render() {
    const { imageUrl, id } = this.props;

    return (
      <Overlay className="overlay" onClick={this.backDropClose}>
        <ModalContainer className="modal">
          <ModalImage src={imageUrl} alt={id} />
        </ModalContainer>
      </Overlay>
    );
  }
}

export default Modal;
