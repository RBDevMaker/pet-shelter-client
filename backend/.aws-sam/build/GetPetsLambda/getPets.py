import boto3
import os
import json

# CORS headers
HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS"
}

def lambda_handler(event, context):
    # Handle preflight OPTIONS request
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": HEADERS}

    table_name = os.environ['PETS_TABLE']
    region_name = os.environ['AWS_REGION']

    dynamodb = boto3.resource('dynamodb', region_name=region_name)
    table = dynamodb.Table(table_name)

    try:
        response = table.scan()
        pets = response['Items']

        return {
            "statusCode": 200,
            "headers": HEADERS,
            "body": json.dumps({"pets": pets})
        }

    except Exception as e:
        print(e)
        return {
            "statusCode": 500,
            "headers": HEADERS,
            "body": json.dumps({"error": str(e)})
        }
