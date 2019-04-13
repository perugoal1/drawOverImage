'use strict';

const app = require('./LambdaCode/app');
const aws = require("aws-sdk");

// let's set the port on which the server will run
app.set( 'port', 4000 );

// start the server
app.listen(
	app.get('port'),
	() => {
		const port = app.get('port');
		console.log('GraphQL Server Running at http://127.0.0.1:' + port );
	}
);

