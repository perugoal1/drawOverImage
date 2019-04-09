const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
  } = require('graphql');


const ImagesType = require("./types").Images;

var s3 = new aws.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: 'draw-over-image-uploads'}
});

var docClient = new aws.DynamoDB.DocumentClient();
    

  
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ( {
      uploadImageData: {
        type: ImagesType,
        args: {
            name : { type: GraphQLString } ,
            overlay : { type: GraphQLString } ,
            width : { type: GraphQLString } ,
            height : { type: GraphQLString } ,
            image : { type: GraphQLString } 
        },
        resolve(parentValue, { name , overlay , width, height, image }, req) {
          return upLoadData(id, answers, req, room );
        }
      }
    })
});



const upLoadData = ( name , overlay , width, height, image  ) => {
    return new Promise(function(resolve, reject){ 
            const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
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
                
                let params = {
                    id : new Date().valueOf(),
                    name,
                    overlay,
                    width,
                    height,
                    url : data.Location
                }


                docClient.put(params, function(err, data) {
                    console.log(data);
                        if (err) console.log(err);
                        else  resolve(data);
                    });
                });
    });
    
}

module.exports = mutation;