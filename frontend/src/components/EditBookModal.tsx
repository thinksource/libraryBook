import React, { useState, MouseEventHandler, CSSProperties, ReactNode} from 'react';
import {Book} from '../model/book';
import {Portal} from './Portal';
// import { useToggle } from 'ahooks';

interface IModalOverlayProps {
  onClick?: MouseEventHandler;
}

const modalOverlayStyles: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  background: "rgba(0,0,0,0.5)",
};

export const ModalOverlay = ({ onClick }: IModalOverlayProps) => <div onClick={onClick} style={modalOverlayStyles} />;


const modalStyles: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000,
};

export const Modal: React.FC<{ children: ReactNode }> = (props: { children: ReactNode }) => (
  <Portal>
    <div style={modalStyles}>{props.children}</div>
  </Portal>
);

const EditBookModal: React.FC<Book & {modalStatus: boolean, title: string}> = (param: Book & {modalStatus: boolean,  title: string}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(param.modalStatus);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("===========");
    console.log(isModalOpen);
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>{param.title}</button>

      {isModalOpen && (
        <Modal>
            <ModalOverlay onClick={closeModal}></ModalOverlay>
            <div>
            <div className="modal-header">
              <h2>{param.title}</h2>
              <button onClick={(e)=>{console.log(e); closeModal()}}>Close</button>
            </div>
            <div className="modal-content">
              <p>This is the content of the modal.</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EditBookModal;