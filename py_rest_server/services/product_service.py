from database.dynamodb_client import get_dynamodb_resource
from boto3.dynamodb.conditions import Key

def list_products():
    dynamodb = get_dynamodb_resource().Table('products-table')
    response = dynamodb.scan()
    return response['Items']

def get_products_by_type(product_type: int):
    dynamodb = get_dynamodb_resource()
    table = dynamodb.Table('products-table')

    # Querying DynamoDB for items with a specific type
    response = table.query(
        IndexName='TypeIndex',
        KeyConditionExpression=Key('type').eq(product_type)
    )
    return response['Items']

