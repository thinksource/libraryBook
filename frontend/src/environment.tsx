import { createContext, useState } from "react";
import {Book} from "./model/book";


const site='http://127.0.0.1:8000/'
export type GlobalContextType = {
    error: string;
    currentBook: Partial<Book>;
    setError: (error: string)=>void;
    setcurrentBook: (book: Partial<Book>)=>void;
  };
const Global = createContext<GlobalContextType|undefined>(undefined);
export {Global, site}
