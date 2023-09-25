from typing import List
from fastapi import APIRouter, HTTPException
from models.product_model import Product
from services.product_service import get_products_by_type, list_products

router = APIRouter()


@router.get("/products")
async def get_products():
    return list_products()


@router.get("/products/type/{product_type}", response_model=List[Product])
async def read_products_by_type(product_type: int):
    items = get_products_by_type(product_type)
    if items:
        return [Product(**item) for item in items]
    raise HTTPException(
        status_code=404, detail="Products not found for given type")
