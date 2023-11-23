import { useEffect, useRef, useState, createContext, useContext } from 'react'
import './App.css'
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {Book} from "./model/book"
import book from "./model/book"
import styled from "styled-components";
import {Global, site,  GlobalContextType} from "./environment";
// import './components/EditBookModal'

import Modal from './components/Modal'
import Bookdetail from './components/Bookdetail';




const Top = styled.div`
  background-color: #f1f1f1;
  padding: 30px;
  text-align: center;
  color: Red;
  visibility: hidden;
`
function BorrowStatus(param: {data: Book}){
  if(param.data.borrowStatus){
    return "Borrowed"
  }else{
    return "Available"
  }
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [rowData, setrowData] = useState([]);
  let [error, setError] = useState("");
  let [currentBook, setcurrentBook]= useState<Partial<Book>>({})
  // const contextValue: GlobalContextType= {
  //   error,
  //   currentBook,
  //   setError,
  //   setcurrentBook,
  // };
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

  async function fetchData(){
    fetch(site+'books/').then(result=>result.json())
    .then(rowData=>setrowData(rowData)
    )
  }

  async function changestatus(data: Book, status: boolean){
    let result = await update_book(data.id, {"borrowStatus": !status}).then(()=>fetchData());
    ;
    
  }




  function ActionRenderer(param:  {data: Book}) {
    let borrowString="Borrowed"
    if(param.data.borrowStatus){
      borrowString="Return"
    }else{
      borrowString="Borrow"
    }
    return (
        <p className="my-renderer">
            <Global.Provider value={{error, currentBook: param.data, setError, setcurrentBook}}>
            <Modal title="Edit book" buttonTxt='Edit' url={site+"books/"} method="put" book_id={param.data.id}>
              <Bookdetail setcurrentBook={setcurrentBook} setError={setError}></Bookdetail>
            </Modal>
            </Global.Provider>
            <button>Del</button>
            <button onClick={()=>{
              changestatus(param.data, param.data.borrowStatus);
              param.data.borrowStatus=!param.data.borrowStatus}}>{borrowString}</button>
        </p>
        
    );
  }

  const [columnDefs, setcolumnDefs] = useState([
    { field: "name", sortable: true},
    { field: "author",},
    { field: "price",},
    {field: "borrowStatus", headerName: "Status", cellRenderer: BorrowStatus},
    {
      headerName: 'Action',
      cellRenderer: ActionRenderer,
      cellStyle: {top: "50%",
        margin: "-50px -30px 0 0"}
    }
  ]);

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <>
      
      {error.length>0 && 
      (<Top>{error}</Top>)}
      <h1>library management</h1>
      <div>
      <Global.Provider value={{error, currentBook, setError, setcurrentBook}}>
      <Modal title="Add new book" buttonTxt='new book' url={site+"books/"} method="post" book_id={0}>
        <>here is the book to added
        </>
      </Modal>
      </Global.Provider>
      </div>
      <div style={{ height: 400, width: 1050 }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs}  rowHeight={50}></AgGridReact>
      </div>
      
    </>
  )
}

export default App
