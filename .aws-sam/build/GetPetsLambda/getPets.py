import boto3
import json

def lambda_handler(event, context):
    body = json.dumps({
        'message': 'Successfully got pets',
        'pets':[]
    })

    # Prepare a successful response containing the pets

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS'
        },
        'body': body
    }