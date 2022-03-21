const { gql } = require('apollo-server');

const typeDefs = gql `
	type User {
		_id: String
		firstName: String
		lastName: String
		initials: String
		email: String
		password: String
		gameCenterBalance: Float
<<<<<<< HEAD
		friendsList: [String]!
		friendRequests: [String]!
=======
		highscores: [String]
>>>>>>> e4d5e8b7ee85da97712426532b68edd65e3f7e07
	}
	extend type Query {
		getCurrentUser: User
	}
	extend type Mutation {
		login(email: String!, password: String!): User
		register(email: String!, password: String!, firstName: String!, lastName: String!): User
		update(email: String!, password: String!, firstName: String!, lastName: String!, _id: String!): Boolean!
		logout: Boolean!
		friendRequest(email: String!, user: String!): Boolean!
		updateHighscore(game: String!, score: Int!, user: String!): Boolean!
	}
`;

module.exports = { typeDefs: typeDefs }