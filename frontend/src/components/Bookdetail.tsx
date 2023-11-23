import React, { useState, useContext, CSSProperties, ReactNode, useEffect, ChangeEvent} from 'react';
import styled from 'styled-components';
import { Global, GlobalContextType } from '../environment';
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
function Bookdetail(props:{setError: (error: string)=>void, setcurrentBook: (book: Partial<Book>)=>void;}){
    const context=useContext(Global);
    const [inputValue, setInputValue] = useState('ttttt');
    let currentBook:Partial<Book>=context?context.currentBook:{}
    let error = context?.error
    let setError = context?.setError
    let setcurrentBook=props.setcurrentBook
    // console.log(props)
    // console.log(currentbook)

    // useLayoutEffect(()=>{
    //     console.log("==layouteffect")
    //     currentbook=props
    // },[]);

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
    function changeTarget(e:ChangeEvent<HTMLInputElement>){
        console.log(e);
        const key = e.target.name;
        console.log({[key]: e.target.value})
        console.log({...currentBook, ...{[key]: e.target.value}})
        setcurrentBook({...currentBook, ...{[key]: e.target.value}})
        console.log(currentBook)
    }

    function chageStatus(status: boolean){
        setcurrentBook({...currentBook, borrowStatus: status})
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        // Get the value from the input event
        const newValue: string = event.target.value;
    
        // Update the state with the new value
        setInputValue(newValue);
    
        // Output the changed string (you can replace this with any logic you need)
        console.log('Changed String:', newValue);
      };
    return (
            <React.Fragment>
            <Cell>Name:</Cell>
            <CellInput><input onChange={changeTarget} type="text" name="name" defaultValue={currentBook.name} /></CellInput>
            <Cell>Author:</Cell>
            <CellInput><input onChange={changeTarget}type="text" name="author" defaultValue={currentBook.author} /></CellInput>
            <Cell>price:</Cell>
            <CellInput><input onChange={changeTarget} type="number" name="price" defaultValue={currentBook.price} step='0.01' placeholder='0.00'/></CellInput>
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