const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean
} = graphql ;


const Images = new GraphQLObjectType({
  name: 'Images',
  fields: () => ( {
      id: { type: GraphQLID },
      name: { type:  GraphQLString },
      width :{ type:  GraphQLString },
      height :{ type:  GraphQLString },
      url : { type:  GraphQLString }
   }) 
});



module.exports = {Images};







