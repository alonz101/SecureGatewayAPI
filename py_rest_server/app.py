from fastapi import FastAPI
from mangum import Mangum
from routes import products
from routes import chat
import os

# Check if we're in a development environment
if os.environ.get("ENV") == "development":
    import debugpy
    debugpy.listen(5678)
    print("Waiting for debugger to attach...")
    debugpy.wait_for_client()
    print("connected")

# Initialize FastAPI app
app = FastAPI()

# Include routes from products
app.include_router(products.router)
app.include_router(chat.router)

handler = Mangum(app)
