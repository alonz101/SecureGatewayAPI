from fastapi import APIRouter
from services.product_service import list_products

router = APIRouter()


@router.get("/products")
def get_products():
    return list_products()
