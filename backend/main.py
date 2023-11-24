from typing import Union, List, Optional

from fastapi import FastAPI, HTTPException
from sqlmodel import Field, Session, SQLModel, create_engine, select
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder


origins = [
    "http://localhost:8000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:8000"
]

# db = sqlite3.connect("file::memory:?cache=shared", uri=True)

engine = create_engine("sqlite://", echo=True)
class Book(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    author: str
    price: float
    borrowStatus: bool

def create_books():
    book_1 = Book(id=1, name="Book1", author="Sherwin", price=5.40, borrowStatus=False)
    book_2 = Book(id=2, name="Test Book", author="My Author", price=7.30, borrowStatus=True)
    book_3 = Book(id=3, name="Do government", author="Test my Author", price=1.40, borrowStatus=True)

    with Session(engine) as session:
        session.add(book_1)
        session.add(book_2)
        session.add(book_3)

        session.commit()

def create_db():
    SQLModel.metadata.create_all(engine)




class BookUpdate(SQLModel):
    name: Optional[str] = None
    author: Optional[str] = None
    price: Optional[float] = None
    borrowStatus: Optional[bool] = None



app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    create_db()
    create_books()

@app.on_event("shutdown")
def shutdown_event():
    pass

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.get("/books/")
async def read_books()->List[Book]:
    with Session(engine) as session:
        books = session.exec(select(Book)).all()
        return books
    
@app.get("/books/{id}")
async def get_book(id: int):
    with Session(engine) as session:
        book = session.get(Book, id)
        if not book:
            raise HTTPException(status_code=404, detail="Book not found")
        return book
    
@app.post("/books/", response_model=Book)
async def create_book(book: Book):
    with Session(engine) as session:
        db_book = Book.from_orm(book)
        session.add(db_book)
        session.commit()
        session.refresh(db_book)
        return db_book

@app.put("/books/{id}", response_model=Book)
async def update_book(id: int, book: BookUpdate):
    print(book)
    print("===========")
    
    with Session(engine) as session:
        db_book = session.get(Book, id)
        if not db_book:
            raise HTTPException(status_code=404, detail="Book not found")
        book_data = jsonable_encoder(book, exclude_none=True)
        print(book)
        print("===========")
        print(book_data)
        for key, value in book_data.items():
            setattr(db_book, key, value)
        session.add(db_book)
        session.commit()
        session.refresh(db_book)
        return db_book

@app.delete("/books/{id}")
async def delete_book(id: int):
    with Session(engine) as session:
        db_book = session.get(Book, id)
        if not db_book:
            raise HTTPException(status_code=404, detail="Book not found")
        session.delete(db_book)
        session.commit()
        return {"action": True}