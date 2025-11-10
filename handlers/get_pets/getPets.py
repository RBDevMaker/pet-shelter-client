import boto3
import os
import json

def lambda_handler(event, context):
    # Retrieve the table name and region from environment variables
    table_name = 'PetsTable'
    region_name = os.environ['AWS_REGION'] 

    # Initialize a DynamoDB client
    dynamodb = boto3.resource('dynamodb', region_name=region_name)
    table = dynamodb.Table(table_name)
    response = table.scan()
    pets = response['Items']

    # Prepare a successful response containing the pets
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Origin': '*',  # Allow requests from any origin
            'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS'
        },
        'body': json.dumps({
            'pets': pets
        })
    }