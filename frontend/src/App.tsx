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
      borrowString="Borrowed"
    }else{
      borrowString="Available"
    }
    return (
        <p className="my-renderer">
            <button onClick={()=>{setIsModalOpen(true)}}>Edit</button>
            <button>Del</button>
            <button>{borrowString}</button>
        </p>
    );
  }

  const [columnDefs, setcolumnDefs] = useState([
    { field: "name"},
    { field: "author"},
    { field: "price"},
    {field: "borrowStatus", headerName: "Status", cellRenderer: BorrowStatus},
    {
      headerName: 'Action',
      cellRenderer: ActionRenderer,
    }
  ]);

  return (
    <>

      <h1>Vite + React</h1>
      <div>
      <button onClick={()=>{setIsModalOpen(true)}}> Add new Book</button>
      </div>
      <div style={{ height: 400, width: 600 }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
      </div>
      <EditBookModal book={book.emptybook}/>
    </>
  )
}

export default App
