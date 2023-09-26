from fastapi import FastAPI
from mangum import Mangum
from routes import products
from routes import chat
from fastapi.middleware.cors import CORSMiddleware
import os

# Check if we're in a development environment
# if os.environ.get("ENV") == "development":
#     import debugpy
#     debugpy.listen(5678)
#     print("Waiting for debugger to attach...")
#     debugpy.wait_for_client()
#     print("connected")

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
origins = [
    "http://localhost:3000",
    "http://localhost:4000",
    # add other origins if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include routes from products
app.include_router(products.router)
app.include_router(chat.router)

handler = Mangum(app)
