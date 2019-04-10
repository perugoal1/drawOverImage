const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
  } = require('graphql');

const aws= require("aws-sdk");
const ImagesType = require("./types/types").Images;

let s3 = new aws.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: 'draw-over-image-uploads'}
});

let docClient = new aws.DynamoDB.DocumentClient();
    

  
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ( {
      uploadImageData: {
        type:ImagesType,
        args: {
            name : { type: GraphQLString } ,
            overlay : { type: GraphQLString } ,
            width : { type: GraphQLString } ,
            height : { type: GraphQLString } ,
            image : { type: GraphQLString } 
        },
        resolve(parentValue, { name , overlay , width, height, image }, req) {
          return upLoadData(name , overlay , width, height, image);
        }
      }
    })
});



const upLoadData = ( name , overlay , width, height, image  ) => {
    return new Promise(function(resolve, reject){ 
            const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
            const type = image.split(';')[0].split('/')[1]
            
                s3.upload({
                Key: `${name}.${type}`,
                Body: base64Data,
                ACL: 'public-read',
                ContentEncoding: 'base64',
                ContentType: `image/${type}` 
                }, function(err, data) {
                if (err) {
                    return console.log('There was an error uploading your photo: ', err.message);
                }
                console.log(data);
                
                let params = {
                    TableName: "Draw-Image",
                        Item: {
                            id : new Date().valueOf(),
                            name,
                            overlay,
                            width,
                            height,
                            url : data.Location
                        }
                }


                docClient.put(params, function(err, data) {
                    console.log(data.Item);
                        if (err) console.log(err);
                        else  resolve(data.Item);
                    });
                });
    });
    
}

module.exports = mutation;