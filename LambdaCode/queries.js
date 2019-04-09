const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
  } = require('graphql');
  
const aws= require("aws-sdk");
const ImagesType = require("./types").Images;

var s3 = new aws.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: 'draw-over-image-uploads'}
});
  
const upLoadData = ( filename) => {
  

const base64Data = new Buffer(''.replace(/^data:image\/\w+;base64,/, ""), 'base64');
const type = base64.split(';')[0].split('/')[1]

    s3.upload({
      Key: `${filename}.${type}`,
      Body: base64Data,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: `image/${type}` 
    }, function(err, data) {
      if (err) {
        return console.log('There was an error uploading your photo: ', err.message);
      }
      console.log(data);
    });
    return `Hello, ${firstName}.`
  
}

const RootQueryType = new GraphQLObjectType({
      name: 'RootQueryType', 
      fields: {
        greeting: {
          args: { 
            name : { type: GraphQLString } ,
            overlay : { type: GraphQLString } ,
            width : { type: GraphQLString } ,
            height : { type: GraphQLString } ,
            image : { type: GraphQLString } ,
          },
          type: ImagesType,
          resolve: (parent, args) => {
              upLoadData(args)
          }
        }
      }
    })


module.exports = RootQueryType;