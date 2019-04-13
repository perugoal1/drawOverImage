'use strict';

const express = require('express');
const body_parser = require('body-parser');
const GraphQL = require('graphql');
const { GraphQLSchema } = GraphQL;
const expressGraphQL = require('express-graphql');

const query = require('./queries.js');  
const mutation = require('./mutations.js');  

const schema = new GraphQLSchema({
  query,
  mutation
})


const app = express();

app.use( body_parser.json({ limit: '50mb' }) );

app.use(
	'/',
	expressGraphQL( () => {
		return {
			graphiql: true,
			schema: GraphQLSchema,
		}
	})
);

module.exports = app;


