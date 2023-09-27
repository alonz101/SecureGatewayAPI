import uuid
from database.dynamodb_client import get_dynamodb_resource
from boto3.dynamodb.conditions import Key
from datetime import datetime
from models.message_model import message
import boto3


def list_messages():
    dynamodb = get_dynamodb_resource().Table('chat-table')
    response = dynamodb.scan()
    return response['Items']


def create_message(msg: message) -> dict:
    dynamodb = get_dynamodb_resource().Table('chat-table')
    response = dynamodb.put_item(Item=msg.to_dict())
    return response
