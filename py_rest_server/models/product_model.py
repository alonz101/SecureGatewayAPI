from typing import Optional
from pydantic import BaseModel


class Product(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    quantity: Optional[int] = None
    price: float
    size: str
    image: str
    type: int
