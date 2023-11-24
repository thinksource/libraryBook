import React, { useState, useContext, CSSProperties, ReactNode, useEffect, ChangeEvent, useRef} from 'react';
import styled from 'styled-components';
import { useglobalContext } from './GlobalContext';
import {Book} from "../model/book"
const Cell= styled.div`
    width: 50%;
    position: relative;
`
const CellInput=styled.div`
width: 50%;
position: relative;
left: 50%;
`
function Bookdetail(){
    const {error, setError, currentBook, setcurrentBook} = useglobalContext();
    const [name, setName] = useState(currentBook.name?currentBook.name:"");
    const [author, setAuthor] = useState(currentBook.author?currentBook.author:"");
    const [price, setPrice] = useState(currentBook.price?currentBook.price:0);


    useEffect(()=>{
        console.log("=====effect======");
        console.log(currentBook)
        if(currentBook.borrowStatus){
            document.getElementById("borrow")?.setAttribute('checked', 'checked');
        }else{
            document.getElementById("avaliable")?.setAttribute('checked', 'checked');
        }

    }, []);

    // function changeContext(e: ChangeEvent<HTMLElement>){
    //     console.log(e.currentTarget.localName);
    // }
    function changeTarget(e:ChangeEvent<HTMLInputElement>, setfun: Function){
        
        console.log(e);
        const key = e.target.name;
        setfun(e.target.value);
        console.log({[key]: e.target.value})
        const update_value={...currentBook, ...{[key]: e.target.value}}
        console.log(update_value)
        setcurrentBook(update_value)
        console.log(currentBook)
    }

    function chageStatus(status: boolean){
        setcurrentBook({...currentBook, borrowStatus: status})
    }

    return (
            <React.Fragment>
            <Cell>Name:</Cell>
            <CellInput><input onChange={(e)=>changeTarget(e, setName)} type="text" name="name" value={name}/></CellInput>
            <Cell>Author:</Cell>
            <CellInput><input onChange={(e)=>changeTarget(e, setAuthor)} type="text" name="author" value={author}/></CellInput>
            <Cell>price:</Cell>
            <CellInput><input onChange={(e)=>changeTarget(e, setPrice)} type="number" name="price"  step='0.01' placeholder='0.00' value={price}/></CellInput>
            <Cell>Status:</Cell>
            <CellInput>
            <div style={{display: "inline-flex"}}>  
            <input type="radio"  onChange={()=>chageStatus(false)} id="avaliable" name="borrowStatus"/><label>Available</label>
            <input type="radio" onChange={()=>chageStatus(true)} id="borrow" name="borrowStatus" /><label>Borrowed</label>
            </div>
            </CellInput>
            </React.Fragment>
    )
}

export default Bookdetail;