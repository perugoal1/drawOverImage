const aws = require("aws-sdk");
const {
    graphql,
    GraphQLSchema
  } = require('graphql');
var server = require("apollo-server-lambda");

  
const query = require('./queries.js');  
const mutation = require('./mutations.js');  


  const schema = new GraphQLSchema({
    query,
    mutation
  })
  
  
// module.exports.lambda_handler = (event, context, callback) =>{ 
//     return graphql(schema, event.queryStringParameters.query)
//       .then(function(result){
//           console.log(result)
//           return result
//       })
//       .catch(function(err){
//           console.log(err)
//           return err
//       });
  
// }

exports.graphqlHandler = server.graphqlLambda({ schema: schema });
exports.graphiqlHandler = server.graphiqlLambda({
    endpointURL: '/Prod/graphql'
});
