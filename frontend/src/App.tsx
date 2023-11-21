import { useRef, useState } from 'react'

import './App.css'
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {Book} from "./model/book"
import book from "./model/book"

import './components/EditBookModal'
import './components/EditBookModal.css'
import EditBookModal from './components/EditBookModal';

import Modal from './components/Modal'
import Bookdetail from './components/Bookdetail';


function BorrowStatus(param: {data: Book}){
  console.log(param);
  if(param.data.borrowStatus){
    return "Borrowed"
  }else{
    return "Available"
  }
}

function App() {
  const gridRef = useRef()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [rowData, setrowData] = useState(book.testbooks);


  function ActionRenderer(param:  {data: Book}) {
    let borrowString="Borrowed"
    if(param.data.borrowStatus){
      borrowString="Return"
    }else{
      borrowString="Borrow"
    }
    return (
        <p className="my-renderer">
            <Modal title="Edit book" buttonTxt='Edit'>
              <Bookdetail name={param.data.name} author={param.data.author} price={param.data.price} status={param.data.borrowStatus}></Bookdetail></Modal>
            <button>Del</button>
            <button onClick={()=>{param.data.borrowStatus=!param.data.borrowStatus}}>{borrowString}</button>
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
        margin: "-50px 0 0 0"}
    }
  ]);

  return (
    <>

      <h1>library management</h1>
      <div>
      <Modal title="Add new book" buttonTxt='new book'>
        <>here is the book to added
        </>
      </Modal>
      </div>
      <div style={{ height: 400, width: 800 }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs}  rowHeight={50}></AgGridReact>
      </div>

    </>
  )
}

export default App
