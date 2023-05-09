import React, { Component } from 'react';
import { Overlay, Container } from './Modal.styled';
// import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  render() {
    return createPortal(
      <Overlay>
        <Container></Container>
      </Overlay>,
      modalRoot
    );
  }
}
