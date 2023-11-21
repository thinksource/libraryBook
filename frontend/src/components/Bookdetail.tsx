import React, { useState, MouseEventHandler, CSSProperties, ReactNode, useEffect} from 'react';
import styled from 'styled-components';
const Cell= styled.div`
    width: 50%;
    position: relative;
`
const CellInput=styled.div`
width: 50%;
position: relative;
left: 50%;
`
function Bookdetail(props: {name: string, author: string, price: number, status: boolean}){
    useEffect(()=>{
        if(props.status){
            document.getElementById("borrow")?.setAttribute('checked', 'checked');
        }else{
            document.getElementById("avaliable")?.setAttribute('checked', 'checked');
        }
    }, [])

    return (
            <React.Fragment>
            <Cell>Name:</Cell>
            <CellInput><input type="text" id="name" value={props.name}/></CellInput>
            <Cell>Author:</Cell>
            <CellInput><input type="text" id="author" value={props.author}/></CellInput>
            <Cell>price:</Cell>
            <CellInput><input type="number" id="price" value={props.price} step='0.01' placeholder='0.00'/></CellInput>
            <Cell>Status:</Cell>
            <CellInput>
            <div style={{display: "inline-flex"}}>  
            <input type="radio" id="avaliable" name="status" value="false" /><label>Available</label>
            <input type="radio" id="borrow" name="status" value="false" /><label>Borrowed</label>
            </div>
            </CellInput>
            </React.Fragment>
    )
}

export default Bookdetail;