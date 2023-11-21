import { useState, ReactNode} from 'react'
import './Modal.css'
import { Portal } from './Portal'
import styled from "styled-components";
const ModalContainer = styled.div`
  position: fixed;
  background-color: grey;
  opacity: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 100px 20px;
  z-Index: 1000;
`
const ModalDialog = styled.div`
background-color: white;
display: block;
margin: auto;
width: 50%;
opacity: 1;
z-Index: 1001;
min-height: 200;
`
const ModalTitle = styled.div`
width: 100%;
height: 50px;
line-height: 50px;
border: 2px solid #73AD21;
`
const ModalClose = styled.div`
margin-right: 10px;
float: right;
`

const ModalContent = styled.div`
  overflow: auto;
  min-height: 200px;
  padding: 0px 40px;
  padding-bottom: 80px;
  position: relative;
`;

const modalStyles = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000,
};

const Modaloperator=styled.div`
    width: 100%;
    height: 50px;
`




function Modal(props: {children: ReactNode, title: string, buttonTxt: string}) {
  const [visible, setVisible] = useState(false);

  function close(){
    setVisible(false);
  }
  return (
    <>
      <button onClick={() => setVisible(prevVisible => !prevVisible)}>{props.buttonTxt}</button>
      {visible && (
          <Portal>
            <ModalContainer onClick={close}>
              <ModalDialog onClick={(e)=>{e.stopPropagation()}}>
              <ModalTitle>{props.title}
                <ModalClose onClick={close}>X</ModalClose>
              </ModalTitle>
              <form>
                <fieldset>
              <ModalContent>{props.children}</ModalContent>
              <Modaloperator>
                <button className="modal-operator-close">Cancel</button>
                <button className="modal-operator-confirm">Confirm</button>
              </Modaloperator>
              </fieldset>
            </form>
              </ModalDialog> 
            </ModalContainer>
          </Portal>
      )}
    </>
  );
}

export default Modal