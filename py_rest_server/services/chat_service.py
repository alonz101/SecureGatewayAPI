from database.dynamodb_client import get_dynamodb_resource
from boto3.dynamodb.conditions import Key

def list_messages():
    dynamodb = get_dynamodb_resource().Table('chat-table')
    response = dynamodb.scan()
    return response['Items']