from pydantic import BaseModel


class Product(BaseModel):
    id: str
    name: str
    description: str
    quantity: int
    price: float
    size: str
    image: str
    type: int
