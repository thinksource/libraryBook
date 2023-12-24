from typing import  List, Optional

from sqlmodel import Field, SQLModel

class Book(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    author: str
    price: float
    borrowStatus: bool

async def create_books():
    book_1 = Book(id=1, name="Book1", author="Sherwin", price=5.40, borrowStatus=False)
    book_2 = Book(id=2, name="Test Book", author="My Author", price=7.30, borrowStatus=True)
    book_3 = Book(id=3, name="Do government", author="Test my Author", price=1.40, borrowStatus=True)


