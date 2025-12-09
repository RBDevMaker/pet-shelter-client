import boto3
import re

def format_phone_number(phone):
    """Format phone number to (123)456-7890"""
    # Remove all non-digit characters
    cleaned = re.sub(r'\D', '', phone)
    
    # Format as (123)456-7890
    if len(cleaned) == 10:
        return f"({cleaned[:3]}){cleaned[3:6]}-{cleaned[6:]}"
    else:
        return phone  # Return original if not 10 digits

def update_phone_numbers(table_name, region_name):
    # Create a DynamoDB resource
    dynamodb = boto3.resource('dynamodb', region_name=region_name)
    table = dynamodb.Table(table_name)
    
    # Scan the table to get all items
    response = table.scan()
    items = response['Items']
    
    # Update each item
    for item in items:
        old_phone = item.get('phone', '')
        new_phone = format_phone_number(old_phone)
        
        if old_phone != new_phone:
            print(f"Updating {item['id']}: {old_phone} -> {new_phone}")
            table.update_item(
                Key={'id': item['id']},
                UpdateExpression='SET phone = :phone',
                ExpressionAttributeValues={':phone': new_phone}
            )
        else:
            print(f"Skipping {item['id']}: already formatted")
    
    print("Complete!")

if __name__ == '__main__':
    update_phone_numbers("AdoptionsTable", "us-east-1")
