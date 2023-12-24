from sqlmodel import Field, Session, SQLModel, create_engine
from fastapi import FastAPI, HTTPException
from model import Book

async def create_books(engine):
    book_1 = Book(id=1, name="Book1", author="Sherwin", price=5.40, borrowStatus=False)
    book_2 = Book(id=2, name="Test Book", author="My Author", price=7.30, borrowStatus=True)
    book_3 = Book(id=3, name="Do government", author="Test my Author", price=1.40, borrowStatus=True)

    with Session(engine) as session:
        session.add(book_1)
        session.add(book_2)
        session.add(book_3)

        session.commit()

async def create_db(engine):
    SQLModel.metadata.create_all(engine )


start_list = [create_db, create_books]
class MyApp(FastAPI):
    def __init__(self, on_startup):
        self.engine = create_engine("sqlite://", echo=True)
        self.app = FastAPI(on_startup)

