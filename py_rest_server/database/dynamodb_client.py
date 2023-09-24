import boto3
from config import AWS_REGION


def get_dynamodb_resource():
    return boto3.resource('dynamodb', region_name=AWS_REGION)
