import { useState, ReactNode, useContext, useRef} from 'react'
import './Modal.css'
import { Portal } from './Portal'
import styled from "styled-components";
import { site} from "../environment"
import { GlobalProvider} from './GlobalContext';
import { Book } from '../model/book';
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




function Modal(props: {children: ReactNode, title: string, buttonTxt: string, url: string, method: string, book: Partial<Book>}) {
  const [visible, setVisible] = useState(false);
  // const setError=props.setError
  const formRef = useRef(null);
  console.log(props.book)
  // if(!props.book){
  //   setcurrentBook({})
  // }else{
  //   setcurrentBook(props.book)
  // }
  function close(){
    setVisible(false);
  }

  async function update_book(url: string, data: any){
    fetch(url, {method:props.method, body: JSON.stringify(data),
      headers: new Headers({'Content-Type': 'application/json'})
    }).then((response)=>{
    if(!response.ok){
      const result = response.json()
    }else{
      return response.json()
    }
    }).then(result=>{
      if(result){
        console.log("=======finish updata=======")
        location.reload()
      }
    })
  }
  async function create_book(url: string, data: any){
    fetch(site+`books/`, { method: "POST", body: JSON.stringify(data),  headers: new Headers({
      'Content-Type': 'application/json'
    })})
    .then(result=>{
      if(result.status==200){
        location.reload();
        return true;
      }else{
        let feed= result.json();
        location.reload();
        return false;
      }
    })
  }
  async function confirm(){

    const form = document.getElementById("myform") as HTMLFormElement;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());
    if(props.book.id && props.book.id>0){

      update_book(props.url+props.book.id+"/", data);
    }else{
      create_book(props.url, data);
    }
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
              <GlobalProvider bookprovider={props.book}>
                <form  ref={formRef} id="myform">
                  <fieldset>
                <ModalContent>{props.children}</ModalContent>
                <Modaloperator>
                  <button className="modal-operator-close" onClick={close}>Cancel</button>
                  <button className="modal-operator-confirm" onClick={confirm}>Confirm</button>
                </Modaloperator>
                </fieldset>
              </form>
            </GlobalProvider>
              </ModalDialog> 
            </ModalContainer>
          </Portal>
      )}
    </>
  );
}

export default Modal