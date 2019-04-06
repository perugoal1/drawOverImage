import boto3 from boto3;

ec2 = boto3.client('ec2');
exports.lambda_handler = (event, context)=>{
    response = ec2.describe_availability_zones()
    return {"statusCode": 200, "body": (response)};
}
