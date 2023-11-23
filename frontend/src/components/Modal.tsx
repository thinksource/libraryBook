import { useState, ReactNode, useContext, useRef} from 'react'
import './Modal.css'
import { Portal } from './Portal'
import styled from "styled-components";
import {Global, site} from "../environment"
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




function Modal(props: {children: ReactNode, title: string, buttonTxt: string, url: string, method: string, book_id: number}) {
  const [visible, setVisible] = useState(false);
  let Globalcontext=useContext(Global);
  const formRef = useRef(null);
  function close(){
    setVisible(false);
  }

  async function update_book(id: number, content: any){
    fetch(site+`books/${id}`, { method: "PUT", body: JSON.stringify(content),  headers: new Headers({
      'Content-Type': 'application/json'
    })})
    .then(result=>{
      if(result.status==200){
        return true;
      }else{
        let feed= result.json();
        // error=useContext(JSON.stringify(feed));
        return false;
      }
    })
  }
  async function create_book(content: any){
    fetch(site+`books/`, { method: "POST", body: JSON.stringify(content),  headers: new Headers({
      'Content-Type': 'application/json'
    })})
    .then(result=>{
      if(result.status==200){
        return true;
      }else{
        let feed= result.json();
        // error=useContext(JSON.stringify(feed));
        return false;
      }
    })
  }
  async function confirm(){
    // if(props.book_id>0){
    //   update_book(props.book_id, Mycontext.currentbook);
    // }else if(props.book_id==0){
    //   create_book(Mycontext.currentbook);
    // }
    const form = formRef.current?formRef.current:undefined;
    const formData = new FormData(form);
    console.log("=======Modal=========")
    console.log(Globalcontext?.currentBook);
    console.log(formData)
    fetch(props.url+props.book_id+"/", {method:props.method, body: JSON.stringify(formData),
        headers: new Headers({'Content-Type': 'application/json'})
      }).then((response)=>{
      if(!response.ok){
        const result = response.json()
        Globalcontext?.setError(JSON.stringify(result));
      }else{
        return response.json()
      }
      }).then(result=>{
        if(result){
          Globalcontext?.setcurrentBook(result);
        }
      })
    close()
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
              <form  ref={formRef}>
                <fieldset>
              <ModalContent>{props.children}</ModalContent>
              <Modaloperator>
                <button className="modal-operator-close" onClick={close}>Cancel</button>
                <button className="modal-operator-confirm" onClick={confirm}>Confirm</button>
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