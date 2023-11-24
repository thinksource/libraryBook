import React, { createContext, useContext, useState, ReactNode } from 'react';
import {Book} from "../model/book";
interface MyContextProps {
  error: string;
  setError: (newValue: string) => void;
  currentBook: Partial<Book>;
  setcurrentBook:(newBook: Partial<Book>)=>void;
}

const globalContext = createContext<MyContextProps | undefined>(undefined);

interface MyProviderProps {

  children: ReactNode;
  bookprovider: Partial<Book>

}


export const GlobalProvider: React.FC<MyProviderProps> = (props: MyProviderProps) => {
  const { children, bookprovider}=props 
  const [error, setError] = useState('');
  const [currentBook, setcurrentBook]= useState(bookprovider)
  

  const updatecurrentBook = (book: Partial<Book>) => {

    setcurrentBook({...currentBook, ...book})
    console.log(currentBook)
  };
  const context_value = {error, setError, currentBook, setcurrentBook: updatecurrentBook} 
  return (
    <globalContext.Provider value={context_value}>
      {children}
    </globalContext.Provider>
  );
};

export const useglobalContext = (): MyContextProps => {
  const context : MyContextProps | undefined = useContext(globalContext);
  if (!context) {
    const error_message='useMyContext must be used within a MyProvider'
    if (context !== undefined) {
        (context as MyContextProps).setError("error message");
      }
    throw new Error(error_message);
  }
  return context;
};