import boto3
import os
import json

# Connect to the DynamoDB table
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['ADOPTIONS_TABLE'])

def lambda_handler(event, context):
    try:
        # Get the adoption ID from the path parameters
        id = event.get('pathParameters', {}).get('id', '')
        
        # Parse the request body
        body = json.loads(event.get('body', '{}'))
        pet_id = body.get('pet_id')
        status = body.get('status', 'approved')
        
        # Get the current adoption item
        get_response = table.get_item(Key={'id': id})
        
        if 'Item' not in get_response:
            return {
                'statusCode': 404,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': True
                },
                'body': json.dumps({'error': 'Application not found'})
            }
        
        item = get_response['Item']
        
        # If pet_id is provided, update status for that specific pet
        if pet_id:
            pets = item.get('pets', [])
            for pet in pets:
                if str(pet.get('id')) == str(pet_id):
                    pet['status'] = status
            
            # Update the pets array
            response = table.update_item(
                Key={'id': id},
                UpdateExpression='SET pets = :pets',
                ExpressionAttributeValues={':pets': pets},
                ReturnValues='ALL_NEW'
            )
        else:
            # Update overall application status
            response = table.update_item(
                Key={'id': id},
                UpdateExpression='SET #status = :status',
                ExpressionAttributeNames={'#status': 'status'},
                ExpressionAttributeValues={':status': status},
                ReturnValues='ALL_NEW'
            )
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': True,
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token'
            },
            'body': json.dumps(response['Attributes'])
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': True
            },
            'body': json.dumps({'error': str(e)})
        }
