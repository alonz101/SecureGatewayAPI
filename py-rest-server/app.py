from fastapi import FastAPI, HTTPException
from mangum import Mangum
import boto3

app = FastAPI()

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('products-table')


@app.post("/products/")
async def create_product(name: str, description: str):
    response = table.put_item(
        Item={
            'name': name,
            'description': description
        }
    )
    if response['ResponseMetadata']['HTTPStatusCode'] == 200:
        return {"status": "success", "data": {"name": name, "description": description}}
    else:
        raise HTTPException(status_code=500, detail="Failed to insert item")


@app.get("/products/")
async def list_products():
    response = table.scan()
    return response['Items']


@app.get("/")
def read_root():
    return {"Hello": "World"}


handler = Mangum(app)
