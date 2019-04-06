const aws = require("aws-sdk")


exports.lambda_handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify(process.env.AWS_REGION),
    };
    return response;
};
