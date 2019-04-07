const aws = require("aws-sdk")
const {
    graphql,
    GraphQLSchema
  } = require('graphql')
  
const query = require('./queries.js');  
const mutation = require('./mutations.js');  


  const schema = new GraphQLSchema({
    query
  })
  
  
module.exports.lambda_handler = (event, context, callback) => graphql(schema, event.queryStringParameters.query)
    .then(
    result => callback(null, {statusCode: 200, body: JSON.stringify(result)}),
    err => callback(err)
)