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
  <Portal visible={false}>
    <div style={modalStyles}>{props.children}</div>
  </Portal>
);



const EditBookModal: React.FC<{children: ReactNode} & {setOpen: Function, title: string}> = (param: {children: ReactNode} & {setOpen: Function,  title: string}) => {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    param.setOpen(true);
  };

  const closeModal = () => {
    console.log("===========");
    // console.log(isModalOpen);
    param.setOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>{param.title}</button>

      
        <Modal>
            <ModalOverlay onClick={closeModal}></ModalOverlay>
            <div>
            <div className="modal-header">
              <h2>{param.title}</h2>
              <button onClick={(e)=>{console.log(e); closeModal()}}>Close</button>
            </div>
            <div className="modal-content">
              {param.children}
            </div>
          </div>
        </Modal>
      
    </div>
  );
};

export default EditBookModal;