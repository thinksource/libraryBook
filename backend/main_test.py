from fastapi.testclient import TestClient
from main import app, create_db, create_books

import pytest
pytestmark = pytest.mark.asyncio

@pytest.fixture(autouse=True)
async def setup_before_test():
    await create_db()
    await create_books()
    print("========auto work finished====")
    client = TestClient(app)
    return client




book_list =[
  {
    "id": 1,
    "name": "Book1",
    "author": "Sherwin",
    "price": 5.4,
    "borrowStatus": False
  },
  {
    "id": 2,
    "name": "Test Book",
    "author": "My Author",
    "price": 7.3,
    "borrowStatus": True
  },
  {
    "id": 3,
    "name": "Do government",
    "author": "Test my Author",
    "price": 1.4,
    "borrowStatus": True
  }
]

async def test_list(setup_before_test):
    client = await setup_before_test
    list_resp = client.get("/books/")
    assert list_resp.status_code == 200
    list_json = list_resp.json()
    assert list_json() == book_list