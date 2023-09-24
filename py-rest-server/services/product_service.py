from database.dynamodb_client import get_dynamodb_resource


def list_products():
    table = get_dynamodb_resource().Table('products-table')
    response = table.scan()
    return response['Items']
