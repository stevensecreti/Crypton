const {gql} = require('apollo-server');
const userDef = require('./user-def').typeDefs;
const gameDef = require('./game-def').typeDefs;
const wallDef = require('./wallet-def').typeDefs;

const rootDef = gql`
	type Query {
		_empty: String
	}

	type Mutation {
		_empty: String
	}
`;

module.exports = {
	typeDefs: [rootDef, userDef, gameDef, wallDef] 
}; 