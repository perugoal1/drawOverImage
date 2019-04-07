const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
  } = require('graphql')
  
const getGreeting = firstName => `Hello, ${firstName}.`

const RootQueryType = new GraphQLObjectType({
      name: 'RootQueryType', 
      fields: {
        greeting: {
          args: { firstName: { name: 'firstName', type: new GraphQLNonNull(GraphQLString) } },
          type: GraphQLString,
          resolve: (parent, args) => getGreeting(args.firstName)
        }
      }
    })


module.exports = RootQueryType;