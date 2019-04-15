const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList
} = require('graphql');

const aws= require("aws-sdk");
const ImagesType = require("./types/types").Images;

let s3 = new aws.S3({
apiVersion: '2006-03-01',
params: {Bucket: 'draw-over-image-uploads'}
});

let docClient = new aws.DynamoDB.DocumentClient();


const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType', 
    fields: {
      getImageData: {
        args: { 
          id : { type: GraphQLID }
        },
        type: ImagesType,
        resolve: (parent, {id}) => {
           return getImageData(id)
           
        }
      },
      getAllData: {
        args: { 
          id : { type: GraphQLID }
        },
        type: new GraphQLList(ImagesType),
        resolve: (parent, {id}) => {
           return getAllData(id)
           
        }
      }
    }
  });
  
  
const getImageData = ( id ) => {
return new Promise(function(resolve, reject){ 
  var params = {
      AttributesToGet: [
        "id",
        "name",
        "width",
        "height",
        "url"
      ],
      TableName : "Draw-Image",
      Key : { 
        'id' : parseInt(id)
      }
    }
    
    
    
    docClient.get(params, function(err, data) {
          if (err) console.log(err);
          else  resolve(data.Item);
    });
 });
 
}

const getAllData  = () => {
return new Promise(function(resolve, reject){ 
    
    docClient.scan({TableName : "Draw-Image"}, function(err, data) {
          if (err) console.log(err);
          else  resolve(data.Items);
    });
});

};


module.exports = RootQueryType;