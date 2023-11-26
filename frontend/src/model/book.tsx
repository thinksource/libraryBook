interface IDObjet{
    id: number,
}

interface Book  extends IDObjet{
    name: string,
    author: string,
    price: number,
    borrowStatus: boolean
}

let testbooks: Book[]=[
    {id: 1, name: "Toyota", author: "Celica", price: 35, borrowStatus: true},
    {id: 2,  name: "Ford", author: "Mondeo", price: 32, borrowStatus: false},
    {id: 4, name: "Porsche", author: "Boxter", price: 72, borrowStatus: false}
  ]
let emptybook={id: 0, name:"", author:"", price:0, borrowStatus: false}
export default {testbooks, emptybook}
export type { Book, IDObjet}
