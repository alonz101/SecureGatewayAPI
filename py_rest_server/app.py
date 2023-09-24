from fastapi import FastAPI
from mangum import Mangum
from routes import products

# Initialize FastAPI app
app = FastAPI()

# Include routes from products
app.include_router(products.router)

handler = Mangum(app)